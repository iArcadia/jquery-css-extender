(function ($) {
    let fnCss = $.fn.css;
    $.fn.css = function () {
        if (!arguments.length || arguments[0] === null) {
            return this.getComputedCss();//
        }

        let execOriginalCases = [
            (arguments.length > 1),
            (typeof arguments[0] === 'object'),
            (typeof arguments[0] === 'string' && arguments[0].indexOf(':') === -1)
        ];

        let pushIntoHistoryCases = [
            (typeof arguments[0] === 'string' && typeof arguments[1] === 'string'),
            (typeof arguments[0] === 'object')
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

                if (canPushIntoHistory) {
                    this.cssHistory(toPushIntoHistory);
                }

                return this;
            }
        }

        return this.rawCss(arguments[0]);
    }

    /**
     * Adds CSS rules from a CSS-formated string.
     * @param {string} css
     * @returns {jQuery}
     */
    $.fn.rawCss = function (css) {
        if (typeof css !== 'string') {
            throw new TypeError(`The first argument of jQuery.fn.rawCss must be a string. ${typeof css} given.`);
        }

        let isCssBlock = /\{.*\}/s.test(css);

        if (isCssBlock) {
            return this.rawCssBlock(css);
        }

        let cssObj = {};
        let lines = css.trim().split(';');

        for (let i = 0; i < lines.length; i++) {
            line = lines[i].trim();

            if (line) {
                let matches = /([a-z-]+)\s*:\s*(.+)/.exec(line);
                cssObj[matches[1]] = matches[2];
            }
        }

        return this.css(cssObj);
    }

    /**
     * Handles CSS rules found into blocks and adds them to elements found with selectors.
     * @param {string} css
     * @returns {jQuery}
     */
    $.fn.rawCssBlock = function (css) {
        let blocks = css.trim().split('}');

        for (let i in blocks) {
            block = blocks[i];

            if (block) {
                let selectorAllowedEscapedChars = `[]wd-`.split('').map(function (char) {
                    return `\\${char}`;
                });
                let selectorAllowedChars = `#.<>:()+*,~|$^="' `.split('').concat(selectorAllowedEscapedChars).join('');
                let matches = new RegExp(`([${selectorAllowedChars}]+)\{(.*)`, 's').exec(block);
                let selector = matches[1];
                let lines = matches[2];
                let isForSelf = (selector.indexOf(':this') === 0);

                if (isForSelf) {
                    this.css(lines.replace(/:this/, ''));
                } else {
                    this.find(selector).css(lines);
                }
            }
        }

        return this;
    }

    /**
     * Gets computed CSS rules.
     * @param {string|array|null} properties
     * @returns {object}
     */
    $.fn.getComputedCss = function (properties = null) {
        if (typeof properties === 'string') {
            properties = [properties];
        }

        if (properties !== null && !Array.isArray(properties)) {
            throw new TypeError(`The first argument of jQuery.fn.getComputedCss must be a string, an array or null. ${typeof properties} given.`);
        }

        let cssList = window.getComputedStyle(this[0], null);
        let result = {};

        for (let i = 0; i < cssList.length; i++) {
            let property = cssList[i];

            if (properties !== null) {
                if (properties.includes(property)) {
                    result[property] = cssList.getPropertyValue(property);
                }
            } else {
                result[property] = cssList.getPropertyValue(property);
            }
        }

        return result;
    }

    /**
     * Gets all CSS rules that are differents from the original ones.
     * @returns {object}
     */
    $.fn.getDifferencesFromDefaultCss = function () {
        let currentCss = this.getComputedCss();
        let $temp = this.clone().useCssHistorySystem(false).appendTo('body');
        let defaultCss = $temp.resetCss().getComputedCss();
        let alteredRules = {};

        if (currentCss === defaultCss) {
            $temp.remove();
            return alteredRules;
        }

        for (let property in currentCss) {
            if (currentCss[property] !== defaultCss[property]) {
                alteredRules[property] = currentCss[property];
            }
        }

        $temp.remove();
        return alteredRules;
    }

    /**
     * Copies CSS rules of a jQuery object.
     * @param {jQuery} $obj
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.copyCss = function ($obj, properties = null) {
        if (!($obj instanceof jQuery)) {
            throw new TypeError(`The first argument of jQuery.fn.copyCss must be a jQuery object. ${typeof $obj} given.`);
        }

        this.data('__cssCopiedFromObject', $obj);
        this.css($obj.getComputedCss(properties));

        return this;
    }

    /**
     * Copies its own CSS rules to a jQuery object.
     * @param {jQuery} $obj
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.copyCssTo = function ($obj, properties = null) {
        $obj.copyCss(this, properties);

        return this;
    }

    /**
     * Copies CSS rules then resets rules of a jQuery object.
     * @param {jQuery} $obj
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.takeCss = function ($obj, properties = null) {
        if (!($obj instanceof jQuery)) {
            throw new TypeError(`The first argument of jQuery.fn.takeCss must be a jQuery object. ${typeof $obj} given.`);
        }

        this.data('__cssTakenFromObject', $obj);
        this.css($obj.getComputedCss(properties));
        $obj.resetCss(properties);

        return this;
    }

    /**
     * Copies its own CSS rules to a jQuery object then resets its rules.
     * @param {jQuery} $obj
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.giveCssTo = function ($obj, properties = null) {
        $obj.takeCss(this, properties);

        return this;
    }

    /**
     * Sets CSS rules to browser default ones.
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.resetCss = function (properties = null) {
        let css = this.getComputedCss(properties);

        this.data('__cssFromReset', true);

        for (let property in css) {
            css[property] = '';
        }

        this.css(css);

        return this;
    }

    /**
     * Sets CSS rules to browser default ones whitout pushing into history.
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.resetCssWithoutHistory = function (properties = null) {
        return this.useCssHistorySystem(false).resetCss(properties).useCssHistorySystem(true);
    }

    /**
     * Activates or deactivates the use of CSS history.
     * @param {boolean} use
     * @returns {jQuery}
     */
    $.fn.useCssHistorySystem = function (use) {
        if (typeof use === 'string') {
            use = (use === 'true');
        }

        if (typeof use === 'number') {
            use = (use > 0);
        }

        if (typeof use !== 'boolean') {
            throw new TypeError(`The first argument of jQuery.fn.useCssHistory must be a boolean. ${typeof use} given.`);
        }

        this.data('__cssUseHistorySystem', use);

        return this;
    }

    /**
     * Gets CSS history or pushes a new item in the history.
     * @param {object|null} css
     * @returns {array}
     */
    $.fn.cssHistory = function (css = null) {
        if (css !== null && typeof css !== 'object') {
            throw new TypeError(`The first argument of jQuery.fn.cssHistory must be an object. ${typeof css} given.`);
        }

        if (typeof this.data('__cssHistory') === 'undefined') {
            this.data('__cssHistory', []);
        }

        if (typeof this.data('__cssUseHistorySystem') === 'undefined') {
            this.data('__cssUseHistorySystem', true);
        }

        if (!arguments.length || css === null) {
            return this.data('__cssHistory');
        } else {
            if (this.data('__cssUseHistorySystem') === false) {
                return this;
            }

            let history = this.data('__cssHistory');

            history.push({
                changedRulesFromLast: css,
                allChangedRuled: this.getDifferencesFromDefaultCss(),
                allRules: this.getComputedCss(),
                takenFromObject: this.data('__cssTakenFromObject') || null,
                copiedFromObject: this.data('__cssCopiedFromObject') || null,
                takenFromHistory: this.data('__cssCopiedFromHistory') || null,
                fromReset: this.data('__cssFromReset') || null
            });

            this.removeData([
                '__cssTakenFromObject',
                '__cssCopiedFromObject',
                '__cssCopiedFromHistory',
                '__cssFromReset'
            ]);

            return this.data('__cssHistory', history);
        }
    }

    /**
     * Uses a previous CSS taken from the history.
     * @param {number} id
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.useCssFromHistory = function (id, properties = null) {
        if (typeof properties === 'string') {
            properties = [properties];
        }

        if (properties !== null && !Array.isArray(properties)) {
            throw new TypeError(`The second argument of jQuery.fn.useCssFromHistory must be a string, an array or null. ${typeof properties} given.`);
        }

        let css = this.cssHistory()[id].changedRulesFromLast;

        if (properties !== null) {
            for (let property in css) {
                if (!properties.includes(property)) {
                    delete css[property];
                }
            }
        }

        this.data('__cssCurrentHistoryId', id);
        this.data('__cssCopiedFromHistory', this.cssHistory()[id]);

        return this.resetCssWithoutHistory().css(css);
    }

    /**
     * Uses the previous used CSS rules.
     * @param {string|array|null} properties
     * @returns {jQuery}
     */
    $.fn.usePreviousCss = function (properties = null) {
        let id = this.data('__cssCurrentHistoryId') || (this.cssHistory().length - 1);

        this.data('__cssCurrentHistoryId', id--);
        return this.useCssFromHistory(id, properties);
    }

    /**
     * Empties the CSS history.
     * @returns {jQuery}
     */
    $.fn.emptyCssHistory = function () {
        return this.data('__cssHistory');
    }

    /**
     * Gets all, or one CSS state, or pushes a new item in the state list.
     * @param {string|null}
     * @param {object|null} css
     * @returns {object}
     */
    $.fn.cssState = function (id = null, css = null) {
        if (id !== null) {
            if (typeof id === 'number') {
                id = String(id);
            }

            if (typeof id !== 'string') {
                throw new TypeError(`The first argument of jQuery.fn.cssState must be an string. ${typeof id} given.`);
            }
        }

        if (css !== null && typeof css !== 'object') {
            throw new TypeError(`The second argument of jQuery.fn.cssState must be an object. ${typeof css} given.`);
        }

        if (typeof this.data('__cssState') === 'undefined') {
            this.data('__cssState', {});
        }

        if (!arguments.length) {
            return this.data('__cssState');
        } else if (arguments.length === 1) {
            for (let id in this.data('__cssState')) {
                if (typeof this.data('__cssState')[id] === 'object') {
                    return this.data('__cssState')[id]
                }
            }
        } else {
            let state = this.data('__cssState');

            state[id] = css;

            return this.data('__cssState', state);
        }
    }
}(jQuery));
