(function ($) {
    /** @var {object} Returns plugin information. */
    $.cssExtender = {
        name: 'jQuery CSS Extender',
        version: '1.0.0',
        github: 'https://github.com/iArcadia/jquery-css-extender',
        fn: {}
    };

    /**
     * Loops through all CSS history of an jQuery object in order to merge all changed rules from an history into one.
     * @param {jQuery} $self
     * @returns {object}
     */
    $.cssExtender.fn.mergeAllChangedRulesFromLast = function ($self) {
        let histories = $self.cssHistory();
        let allChangedRules = {};

        for (let i in histories) {
            let history = histories[i];
            $.extend(allChangedRules, history.changedRulesFromLast);
        }

        return allChangedRules;
    }

    /**
     * Executes a callback if the property has the correct type.
     * @param {*} property
     * @param {string} checkType - Possible values: =, ==, ===, is, !=, !==, is not
     * @param {string|object} type
     * @returns {*}
     */
    $.cssExtender.fn.typeOf = function (property, checkType, type) {
        let check = null;

        switch (type) {
            case 'string':
            case 'undefined':
            case 'object':
            case 'boolean':
                check = (typeof property === type);
                break;

            case 'jQuery':
            case jQuery:
                check = (property instanceof type);
                break;

            case 'array':
                check = (Array.isArray(property));
                break;

            case 'integer':
                check = (Number.isInteger(property));
                break;

            case 'null':
            case null:
                check = (property === null);
                break;
        }

        switch (checkType) {
            default:
            case '=':
            case '==':
            case '===':
            case 'is':
                return check;

            case '!=':
            case '!==':
            case 'is not':
                return !check;
        }
    }

    /**
     * Throws a custom error.
     * @param {*} property
     * @param {string} origin
     * @param {number} position
     * @param {array} correctTypes
     * @param {string} errorType
     */
    $.cssExtender.fn.generateError = function (property, origin, position, correctTypes, errorType = 'Error') {
        let propIsNotNull = $.cssExtender.fn.typeOf(property, '!==', null);
        let posIsInt = $.cssExtender.fn.typeOf(position, '===', 'integer');
        let typesIsArray = $.cssExtender.fn.typeOf(correctTypes, '===', 'array');

        if (propIsNotNull && posIsInt && typesIsArray) {
            switch (position) {
                case 1:
                    position = 'first';
                    break;
                case 2:
                    position = 'second';
                    break;
                case 3:
                    position = 'third';
                    break;
            }

            let correctTypesString = '';

            for (let i in correctTypes) {
                switch (correctTypes[i]) {
                    case 'string':
                        correctTypesString += 'a string';
                        break;

                    case 'object':
                        correctTypesString += 'an object';
                        break;

                    case 'array':
                        correctTypesString += 'an array';
                        break;

                    case 'integer':
                        correctTypesString += 'an integer';
                        break;

                    case 'jQuery':
                        correctTypesString += 'a jQuery instance';
                        break;

                    case 'null':
                        correctTypesString += 'null';
                        break;
                }

                if (i < (correctTypes.length - 2)) {
                    correctTypesString += ', ';
                } else if (i < (correctTypes.length - 1)) {
                    correctTypesString += ' or ';
                }
            }

            throw new window[errorType](`The ${position} argument of jQuery.fn.${origin} must be ${correctTypesString}. ${typeof property} given.`)
        }
    }

    /**
     * Checks the optional argument "properties" used in many methods.
     * @param {string|array|null} properties
     * @param {string} origin
     * @param {number|string} positionInArgs
     * @returns {array}
     */
    $.cssExtender.fn.handlePropertiesOptionalArgument = function (properties, origin, positionInArgs) {
        if (typeof properties === 'string') {
            return [properties];
        }

        if (properties !== null && !Array.isArray(properties)) {
            if (Number.isInteger(positionInArgs)) {
                switch (positionInArgs) {
                    case 1:
                        positionInArgs = 'first';
                        break;

                    case 2:
                        positionInArgs = 'second';
                        break;

                    case 3:
                        positionInArgs = 'third';
                        break;
                }

                throw new TypeError(`The ${positionInArgs} argument of jQuery.fn.${origin} must be a string, an array or null. ${typeof properties} given.`);
            }
        }

        return properties;
    }

    /**
     * Returns all methods of the plugin.
     * @returns {array}
     */
    $.cssExtender.fn.getAllPluginMethods = function () {
        return [
            'rawCss',
            'rawCssBlock',

            'getComputedCss',
            'getDifferencesFromDefaultCss',
            'getAllCssRulesFromShorthand',

            'copyCss',
            'copyCssTo',
            'takeCss',
            'giveCssTo',
            'resetCss',

            'useCssHistorySystem',
            'forgetCssHistorySystemOnce',
            'cssHistory',
            'getCssHistory',
            'getLastCssHistory',
            'getPreviousCssHistory',
            'getNextCssHistory',
            'useCssFromHistory',
            'usePreviousCss',
            'useNextCss',
            'emptyCssHistory',

            'cssState'
        ];
    }
}(jQuery));
(function ($) {
    let allPluginMethods = $.cssExtender.fn.getAllPluginMethods();
    for (let i in allPluginMethods) {
        $[allPluginMethods[i]] = function (elem, ...args) {
            return $(elem)[allPluginMethods[i]](...args);
        };
    }

    /**
     * Overrides the original .css() method.
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
     * @param {string|array|null} properties
     * @param {bool} excludingLoop
     * @returns {object}
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
     * @param {string|array|null} properties
     * @returns {object}
     */
    // TODO excludingLoop
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
     * @param {string|array|null} properties
     * @param {boolean} excludingLoop
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
     * @param {string|array|null} properties
     * @param {boolean} excludingLoop
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
     * @param {string|array|null} properties
     * @param {boolean} excludingLoop
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
     * @param {string|array|null} properties
     * @param {boolean} excludingLoop
     * @returns {jQuery}
     */
    $.fn.giveCssTo = function ($obj, properties = null, excludingLoop = false) {
        $obj.takeCss(this, properties, excludingLoop);

        return this;
    };

    /**
     * Sets CSS rules to browser default ones.
     * @function external:"jQuery.fn".resetCss
     * @param {string|array|null} properties
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

(function ($) {
    /**
     * Activates or deactivates the use of CSS history. If null, gets if the system's state.
     * @function external:"jQuery.fn".useCssHistorySystem
     * @param {boolean|null} use
     * @returns {jQuery|boolean}
     */
    $.fn.useCssHistorySystem = function (use = null) {
        if ($.cssExtender.fn.typeOf(use, 'is', null)) {
            return this.data('__cssUseHistorySystem');
        }

        if ($.cssExtender.fn.typeOf(use, 'is', 'string')) {
            use = (use === 'true');
        }

        if ($.cssExtender.fn.typeOf(use, 'is', 'integer')) {
            use = (use > 0);
        }

        if ($.cssExtender.fn.typeOf(use, 'is not', 'boolean')) {
            $.cssExtender.fn.generateError(use, 'useCssHistory', 1, ['boolean'], 'TypeError');
        }

        this.data('__cssUseHistorySystem', use);

        if (!use) {
            this.emptyCssHistory();
        }

        return this;
    };

    /**
     * Deactives the use of CSS history for the next execution of .css() only.
     * @function external:"jQuery.fn".forgetCssHistorySystemOnce
     * @returns {jQuery}
     */
    $.fn.forgetCssHistorySystemOnce = function () {
        this.data('__cssForgetHistorySystemOnce', true);

        return this;
    };

    $.fn.canPushIntoCssHistory = function () {

    }

    /**
     * Gets CSS history or pushes a new item in the history.
     * @function external:"jQuery.fn".cssHistory
     * @param {object|null} css
     * @returns {array}
     */
    $.fn.cssHistory = function (css = null) {
        if ($.cssExtender.fn.typeOf(css, 'is not', null)
            && $.cssExtender.fn.typeOf(css, 'is not', 'object')) {
            throw new TypeError(`The first argument of jQuery.fn.cssHistory must be an object. ${typeof css} given.`);
        }

        if ($.cssExtender.fn.typeOf(this.data('__cssHistory'), 'is', 'undefined')) {
            this.data('__cssHistory', []);
        }

        if ($.cssExtender.fn.typeOf(this.data('__cssUseHistorySystem'), 'is', 'undefined')) {
            this.data('__cssUseHistorySystem', true);
        }

        if (!arguments.length || $.cssExtender.fn.typeOf(css, 'is', null)) {
            return this.data('__cssHistory');
        } else {
            if (this.data('__cssUseHistorySystem') === false) {
                return this;
            }

            let history = this.data('__cssHistory');

            history.push({
                changedRulesFromLast: css,
                allChangedRules: $.extend($.cssExtender.fn.mergeAllChangedRulesFromLast(this), css),

                changedComputedRules: this.getDifferencesFromDefaultCss(),
                allComputedRules: this.getComputedCss(),

                takenFromObject: this.data('__cssTakenFromObject') || null,
                copiedFromObject: this.data('__cssCopiedFromObject') || null,
                fromReset: this.data('__cssFromReset') || null
            });

            this.removeData([
                '__cssTakenFromObject',
                '__cssCopiedFromObject',
                '__cssCopiedFromHistory',
                '__cssFromReset'
            ]);

            if ($.cssExtender.fn.typeOf(this.data('__cssCurrentHistoryId'), 'is', 'undefined')) {
                this.data('__cssCurrentHistoryId', 0);
            } else {
                this.data('__cssCurrentHistoryId', this.data('__cssHistory').length);
            }

            return this.data('__cssHistory', history);
        }
    };

    /**
     * Gets an entry in CSS history.
     * @function external:"jQuery.fn".getCssHistory
     * @param {number} id
     * @returns {object}
     */
    $.fn.getCssHistory = function (id) {
        return this.cssHistory()[id];
    };

    /**
     * Gets current entry in CSS history.
     * @function external:"jQuery.fn".getCurrentCss
     * @returns {object}
     */
    $.fn.getCurrentCss = function () {
        return this.getCssHistory(this.data('__cssCurrentHistoryId'));
    };

    /**
     * Gets last entry in CSS history.
     * @function external:"jQuery.fn".getLastCss
     * @returns {object}
     */
    $.fn.getLastCss = function () {
        return this.getCssHistory(this.cssHistory().length - 1);
    };

    /**
     * Gets previous entry in CSS history.
     * @function external:"jQuery.fn".getPreviousCss
     * @returns {object}
     */
    $.fn.getPreviousCss = function () {
        let id = this.data('__cssCurrentHistoryId') || (this.cssHistory().length - 1);

        if (id === 0) {
            return null;
        }

        return this.getCssHistory(id - 1);
    };

    /**
     * Gets next entry in CSS history.
     * @function external:"jQuery.fn".getNextCss
     * @returns {object}
     */
    $.fn.getNextCss = function () {
        let id = this.data('__cssCurrentHistoryId') || (this.cssHistory().length - 1);

        if (id === (this.cssHistory().length - 1)) {
            return null;
        }

        return this.getCssHistory(id + 1);
    };

    /**
     * Uses a previous CSS taken from the history.
     * @function external:"jQuery.fn".useCssFromHistory
     * @param {number} id
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.useCssFromHistory = function (id, properties = null) {
        properties = $.cssExtender.fn.handlePropertiesOptionalArgument(properties, 2, 'useCssFromHistory');

        let css = this.getCssHistory(id).allChangedRules;

        if (properties !== null) {
            for (let property in css) {
                if (!properties.includes(property)) {
                    delete css[property];
                }
            }
        }

        this.data('__cssCurrentHistoryId', id);

        return this.useCssHistorySystem(false).resetCss().css(css).useCssHistorySystem(true);
    };

    /**
     * Uses the previous used CSS rules.
     * @function external:"jQuery.fn".usePreviousCss
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.usePreviousCss = function (properties = null) {
        let id = this.data('__cssCurrentHistoryId') || (this.cssHistory().length - 1);

        if (id === 0) {
            return this;
        }

        id--;
        return this.useCssFromHistory(id, properties);
    };

    /**
     * Uses the next used CSS rules.
     * @function external:"jQuery.fn".useNextCss
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.useNextCss = function (properties = null) {
        let id = this.data('__cssCurrentHistoryId') || (this.cssHistory().length - 1);

        if (id === (this.cssHistory().length - 1)) {
            return this;
        }

        id++;
        return this.useCssFromHistory(id, properties);
    };

    /**
     * Uses the last used CSS rules from history.
     * @function external:"jQuery.fn".useLastCss
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.useLastCss = function (properties = null) {
        return this.useCssFromHistory((this.cssHistory().length - 1), properties);
    };

    /**
     * Empties the CSS history.
     * @function external:"jQuery.fn".emptyCssHistory
     * @returns {jQuery}
     */
    $.fn.emptyCssHistory = function () {
        return this.data('__cssHistory');
    };
}(jQuery));

(function ($) {
    /**
     * Gets all, or one CSS state, or pushes a new item in the state list.
     * @function external:"jQuery.fn".cssState
     * @param {string|null}
     * @param {object|null} css
     * @returns {object}
     */
    $.fn.cssState = function (id = null, css = null) {
        if ($.cssExtender.fn.typeOf(id, 'is not', null)) {
            if ($.cssExtender.fn.typeOf(id, 'is', 'integer')) {
                id = String(id);
            }

            if ($.cssExtender.fn.typeOf(id, 'is not', 'string')) {
                $.cssExtender.fn.generateError(id, 'cssState', 1, ['string'], 'TypeError');
            }
        }

        if ($.cssExtender.fn.typeOf(css, 'is not', null)
            && $.cssExtender.fn.typeOf(css, 'is not', 'object')) {
            $.cssExtender.fn.generateError(css, 'cssState', 2, ['object'], 'TypeError');
        }

        if ($.cssExtender.fn.typeOf(this.data('__cssState'), 'is', 'undefined')) {
            this.data('__cssState', {});
        }

        if (!arguments.length) {
            return this.data('__cssState');
        } else if (arguments.length === 1) {
            for (let sid in this.data('__cssState')) {
                if (sid === id
                    && $.cssExtender.fn.typeOf(this.data('__cssState')[sid], 'is', 'object')) {
                    return this.data('__cssState')[sid];
                }
            }
        } else {
            let state = this.data('__cssState');

            state[id] = css;

            return this.data('__cssState', state);
        }
    };

    /**
     * Creates a CSS state from current element style.
     * @function external:"jQuery.fn".cssStateFromCurrent
     * @param {string} id
     * @returns {jQuery}
     */
    $.fn.cssStateFromCurrent = function (id) {
        return this.cssState(id, this.getLastCss().allChangedRules);
    };

    /**
     * Creates the CSS state by default from current element style.
     * @function external:"jQuery.fn".defaultCssStateFromCurrent
     * @returns {jQuery}
     */
    $.fn.defaultCssStateFromCurrent = function () {
        return this.cssStateFromCurrent('default');
    }

    /**
     * Creates the CSS state by default.
     * @function external:"jQuery.fn".defaultCssState
     * @param {object|null} css
     * @returns {jQuery}
     */
    $.fn.defaultCssState = function (css = null) {
        if ($.cssExtender.fn.typeOf(css, 'is', null)) {
            return this.cssState('default');
        }

        return this.cssState('default', css).useDefaultCssState();
    };

    /**
     * Uses the default CSS state.
     * @function external:"jQuery.fn".useDefaultCssState
     * @returns {jQuery}
     */
    $.fn.useDefaultCssState = function () {
        return this.css(this.defaultCssState());
    };

    /**
     * Uses a CSS state.
     * @function external:"jQuery.fn".useCssFromState
     * @param {string} id
     * @returns {jQuery}
     */
    $.fn.useCssFromState = function (id) {
        return this.css(this.cssState(id));
    };

    /**
     * Creates an event listener which will be associated to a CSS state.
     * @function external:"jQuery.fn".cssStateOn
     * @param {string} eventType
     * @param {string} id
     * @returns {jQuery}
     */
    $.fn.cssStateOn = function (eventType, id = null) {
        if ($.cssExtender.fn.typeOf(id, 'is', null)) {
            id = eventType;
        }

        this.on(eventType, function () {
            $(this).useCssFromState(id);
        })

        return this;
    };

    /**
     * Associates the mouseenter event listener to the CSS state of specified ID, then the mouseleave one to the default CSS state.
     * @function external:"jQuery.fn".cssStateOnHover
     * @param {string} id - Default value: hover
     */
    $.fn.cssStateOnHover = function (id = 'hover') {
        this.on('mouseenter', function () {
            $(this).useCssFromState(id);
        }).on('mouseleave', function () {
            $(this).useDefaultCssState();
        });
    };

    /**
     * Loops through all CSS states. For each one, creates and associates an event listener.
     * @function external:"jQuery.fn".autoCssStateOn
     * @param {array} excludedStates - Default value: []
     * @returns {jQuery}
     */
    $.fn.autoCssStateOn = function (excludedStates = []) {
        let states = this.cssState();

        for (let id in states) {
            if (!excludedStates.includes(id)) {
                if (id === 'hover') {
                    this.cssStateOnHover();
                } else if (id !== 'default') {
                    this.cssStateOn(id);
                }
            }
        }

        return this;
    };
}(jQuery));


/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
 */