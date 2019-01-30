(function ($) {
    let allPluginMethods = $.cssExtender.fn.getAllPluginMethods();
    for (let i in allPluginMethods) {
        $[allPluginMethods[i]] = function (elem, ...args) {
            return $(elem)[allPluginMethods[i]](...args);
        };
    }

    /**
     * Overrides the original .css() method.
     * @see {@link http://api.jquery.com/css/}
     * @function external:"jQuery.fn".css
     * @returns {@link jQuery}
     */
    let fnCss = $.fn.css;
    $.fn.css = function () {
        if (!arguments.length || $.cssExtender.fn.typeOf(arguments[0], 'is', null)) {
            return this.getComputedCss();
        }

        let execOriginalCases = [
            (arguments.length > 1),
            ($.cssExtender.fn.typeOf(arguments[0], 'is', 'object')),
            ($.cssExtender.fn.typeOf(arguments[0], 'is', 'string') && arguments[0].indexOf(':') === -1)
        ];

        let pushIntoHistoryCases = [
            ($.cssExtender.fn.typeOf(arguments[0], 'is', 'string') && $.cssExtender.fn.typeOf(arguments[1], 'is', 'string')),
            ($.cssExtender.fn.typeOf(arguments[0], 'is', 'object'))
        ];

        let canPushIntoHistory = false;
        let toPushIntoHistory = {};

        for (let i in pushIntoHistoryCases) {
            if (pushIntoHistoryCases[i]) {
                switch (parseInt(i)) {
                    case 0:
                        toPushIntoHistory[arguments[0]] = arguments[1];
                        break;

                    case 1:
                        toPushIntoHistory = arguments[0];
                        break;
                }

                canPushIntoHistory = true;
                break;
            }
        }

        for (let i in execOriginalCases) {
            if (execOriginalCases[i]) {
                fnCss.apply(this, arguments);

                if (canPushIntoHistory && this.data('__cssForgetHistorySystemOnce') !== true) {
                    this.cssHistory(toPushIntoHistory);
                }

                this.data('__cssForgetHistorySystemOnce', false);

                return this;
            }
        }

        return this.rawCss(arguments[0]);
    };

    /**
     * Adds CSS rules from a CSS-formated string.
     * @function external:"jQuery.fn".rawCss
     * @param {string} css
     * @returns {jQuery}
     */
    $.fn.rawCss = function (css) {
        if ($.cssExtender.fn.typeOf(css, 'is not', 'string')) {
            $.cssExtender.fn.generateError(css, 'rawCss', 1, ['string'], 'TypeError');
        }

        let isCssBlock = /\{.*\}/s.test(css);

        if (isCssBlock) {
            return this.rawCssBlock(css);
        }

        let cssObj = {};
        let lines = css.trim().split(';');

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            if (line) {
                let matches = /([a-z-]+)\s*:\s*(.+)/.exec(line);
                cssObj[matches[1]] = matches[2];
            }
        }

        return this.css(cssObj);
    };

    /**
     * Handles CSS rules found into blocks and adds them to elements found with selectors.
     * @function external:"jQuery.fn".rawCssBlock
     * @param {string} css
     * @returns {jQuery}
     */
    $.fn.rawCssBlock = function (css) {
        let blocks = css.trim().split('}');

        for (let i in blocks) {
            let block = blocks[i];

            if (block) {
                let selectorAllowedEscapedChars = `[]wd-`.split('').map(function (char) {
                    return `\\${char}`;
                });
                let selectorAllowedChars = `#.<>:()+*,~|$^="' `.split('').concat(selectorAllowedEscapedChars).join('');
                let matches = new RegExp(`([${selectorAllowedChars}]+)\{(.*)`, 's').exec(block);
                let selector = matches[1];
                let lines = matches[2];
                let isForSelf = (selector.indexOf(':this') >= 0);

                if (isForSelf) {
                    this.css(lines.replace(/.*:this/, ''));
                } else {
                    this.find(selector).css(lines);
                }
            }
        }

        return this;
    };

    /**
     * Gets computed CSS rules.
     * @function external:"jQuery.fn".getComputedCss
     * @param {(string|Array.<string>|null)} [properties=null]
     * @param {boolean} [excludingLoop=false]
     * @returns {Object.<string, string>}
     */
    $.fn.getComputedCss = function (properties = null, excludingLoop = false) {
        properties = $.cssExtender.fn.handlePropertiesOptionalArgument(properties, 1, 'getComputedCss');

        let cssList = window.getComputedStyle(this[0], null);
        let result = {};

        for (let i = 0; i < cssList.length; i++) {
            let property = cssList[i];

            if (properties !== null) {
                if ((!excludingLoop && properties.includes(property))
                    || (excludingLoop && !properties.includes(property))) {
                    result[property] = cssList.getPropertyValue(property);
                }
            } else {
                result[property] = cssList.getPropertyValue(property);
            }
        }

        return result;
    };

    /**
     * Gets all CSS rules that are differents from the original ones.
     * @function external:"jQuery.fn".getDifferencesFromDefaultCss
     * @param {(string|Array.<string>|null)} [properties=null]
     * @returns {Object.<string, string>}
     *
     * @todo excludingLoop
     */
    $.fn.getDifferencesFromDefaultCss = function (properties = null) {
        properties = $.cssExtender.fn.handlePropertiesOptionalArgument(properties, 1, 'getDifferencesFromDefaultCss');

        let currentCss = this.getComputedCss();
        let $temp = this.clone().useCssHistorySystem(false).appendTo('body');
        let defaultCss = $temp.resetCss().getComputedCss();
        let alteredRules = {};

        if (currentCss === defaultCss) {
            $temp.remove();
            return alteredRules;
        }

        for (let property in currentCss) {
            if (properties !== null) {
                if (properties.includes(property)) {
                    if (currentCss[property] !== defaultCss[property]) {
                        alteredRules[property] = currentCss[property];
                    }
                }
            } else {
                if (currentCss[property] !== defaultCss[property]) {
                    alteredRules[property] = currentCss[property];
                }
            }
        }

        $temp.remove();
        return alteredRules;
    };

    $.fn.getAllCssRulesFromShorthand = function (shorthand) {
        switch (shorthand) {
            case 'animation':
                return ['animation-name', 'animation-duration', 'animation-timing-function', 'animation-delay', 'animation-iteration-count', 'animation-direction', 'animation-fill-mode', 'animation-play-state'];

            case 'background':
                return ['background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size', 'background-attachmen'];

            case 'border':
                return ['border-width', 'border-style', 'border-color'];

            case 'border-bottom':
                return ['border-bottom-width', 'border-bottom-style', 'border-bottom-color'];

            case 'border-right':
                return ['border-right-width', 'border-right-style', 'border-right-color'];

            case 'border-left':
                return ['border-left-width', 'border-left-style', 'border-left-color'];

            case 'border-top':
                return ['border-top-width', 'border-top-style', 'border-top-color'];

            case 'border-radius':
                return ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'];

            case 'border-style':
                return ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'];

            case 'border-width':
                return ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'];

            case 'border-color':
                return ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'];

            case 'column-rule':
                return ['column-rule-width', 'column-rule-style', 'column-rule-color'];

            case 'columns':
                return ['column-width', 'column-count'];

            case 'flex':
                return ['flex-shrink', 'flex-grow', 'flex-basis'];

            case 'flex-flow':
                return ['flew-direction', 'flex-wrap'];

            case 'font':
                return ['font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', 'font-family'];

            case 'grid':
                return ['grid-template-rows', 'grid-template-columns', 'grid-template-areas', 'grid-auto-rows', 'grid-auto-columns', 'grid-auto-flow'];

            case 'grid-area':
                return ['grid-row-start', 'grid-column-start', 'grid-row-end', 'grid-column-end'];

            case 'grid-column':
                return ['grid-column-start', 'grid-column-end'];

            case 'grid-row':
                return ['grid-row-start', 'grid-row-end'];

            case 'grid-template':
                return ['grid-template-rows', 'grid-template-columns', 'grid-template-areas'];

            case 'list-style':
                return ['list-style-type', 'list-style-image', 'list-style-position'];

            case 'margin':
                return ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'];

            case 'padding':
                return ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'];

            case 'offset':
                return ['offset-path', 'offset-position', 'offset-distance', 'offset-rotate', 'offset-anchor'];

            case 'overflow':
                return ['overflow-x', 'overflow-y'];

            case 'place-content':
                return ['align-content', 'justify-content'];

            case 'place-items':
                return ['align-items', 'justify-items'];

            case 'place-self':
                return ['align-self', 'justify-self'];

            case 'text-decoration':
                return ['text-decoration-line', 'text-decoration-color', 'text-decoration-style'];
        }

        return shorthand;
    };

    /**
     * If the original element have no history (because its style comes from a CSS file, <style> tags) or the history system has ben disabled, the element which wants to copy will take ALL computed rules of the target one. Else, it will take all changed rules since the beginning.
     *
     * @summary Copies CSS rules of a jQuery object.
     * @function external:"jQuery.fn".copyCss
     * @param {jQuery} $obj
     * @param {(string|Array.<string>|null)} [properties=null]
     * @param {boolean} [excludingLoop=false]
     * @returns {jQuery}
     */
    $.fn.copyCss = function ($obj, properties = null, excludingLoop = false) {
        if ($.cssExtender.fn.typeOf($obj, 'is not', jQuery)) {
            $.cssExtender.fn.generateError($obj, 'copyCss', 1, ['jQuery'], 'TypeError');
        }

        this.data('__cssCopiedFromObject', $obj);

        if ($.cssExtender.fn.typeOf($obj.getLastCss(), 'is not', 'undefined')) {
            let allChangedRules = $obj.getLastCss().allChangedRules;
            let finalChangedRules = {};

            if (properties !== null) {
                for (let property in allChangedRules) {
                    if ((!excludingLoop && properties.includes(property))
                        || (excludingLoop && !properties.includes(property))) {
                        finalChangedRules[property] = allChangedRules[property];
                    }
                }
            } else {
                finalChangedRules = allChangedRules;
            }

            this.css(finalChangedRules);
        }

        if ($.cssExtender.fn.typeOf($obj.getLastCss(), 'is', 'undefined') || !$obj.useCssHistorySystem()) {
            this.css($obj.getComputedCss(properties, excludingLoop));
        }

        return this;
    };

    /**
     * Copies its own CSS rules to a jQuery object.
     * @function external:"jQuery.fn".copyCssTo
     * @param {jQuery} $obj
     * @param {(string|Array.<string>|null)} [properties=null]
     * @param {boolean} [excludingLoop=false]
     * @returns {jQuery}
     */
    $.fn.copyCssTo = function ($obj, properties = null, excludingLoop = false) {
        $obj.copyCss(this, properties, excludingLoop);

        return this;
    };

    /**
     * Copies CSS rules then resets rules of a jQuery object.
     * @function external:"jQuery.fn".takeCss
     * @param {jQuery} $obj
     * @param {(string|Array.<string>|null)} [properties=null]
     * @param {boolean} [excludingLoop=false]
     * @returns {jQuery}
     */
    $.fn.takeCss = function ($obj, properties = null, excludingLoop = false) {
        if ($.cssExtender.fn.typeOf($obj, 'is not', jQuery)) {
            $.cssExtender.fn.generateError($obj, 'takeCss', 1, ['jQuery'], 'TypeError');
        }

        this.data('__cssTakenFromObject', $obj);

        if ($.cssExtender.fn.typeOf($obj.getLastCss(), 'is not', 'undefined')) {
            let allChangedRules = $obj.getLastCss().allChangedRules;
            let finalChangedRules = {};

            if (properties !== null) {
                for (let property in allChangedRules) {
                    if ((!excludingLoop && properties.includes(property))
                        || (excludingLoop && !properties.includes(property))) {
                        finalChangedRules[property] = allChangedRules[property];
                    }
                }
            } else {
                finalChangedRules = allChangedRules;
            }

            this.css(finalChangedRules);
        }

        if ($.cssExtender.fn.typeOf($obj, 'is', 'undefined') || !$obj.useCssHistorySystem()) {
            this.css($obj.getComputedCss(properties, excludingLoop));
        }

        $obj.resetCss(properties);

        return this;
    };

    /**
     * Copies its own CSS rules to a jQuery object then resets its rules.
     * @function external:"jQuery.fn".giveCssTo
     * @param {jQuery} $obj
     * @param {(string|Array.<string>|null)} [properties=null]
     * @param {boolean} [excludingLoop=false]
     * @returns {jQuery}
     */
    $.fn.giveCssTo = function ($obj, properties = null, excludingLoop = false) {
        $obj.takeCss(this, properties, excludingLoop);

        return this;
    };

    /**
     * Sets CSS rules to browser default ones.
     * @function external:"jQuery.fn".resetCss
     * @param {(string|Array.<string>|null)} [properties=null]
     * @returns {jQuery}
     */
    $.fn.resetCss = function (properties = null) {
        let css = this.getComputedCss(properties);

        this.data('__cssFromReset', !this.data('__cssForgetHistorySystemOnce'));

        for (let property in css) {
            css[property] = '';
        }

        this.css(css);

        return this;
    };
}(jQuery));
