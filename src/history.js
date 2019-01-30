(function ($) {
    /**
     * Activates or deactivates the use of CSS history. If null, gets if the system's state.
     * @function external:"jQuery.fn".useCssHistorySystem
     * @param {(boolean|null)} [use=null]
     * @returns {(jQuery|boolean)}
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

    /**
     * @todo the method
     */
    $.fn.canPushIntoCssHistory = function () {

    }

    /**
     * Gets CSS history or pushes a new item in the history.
     * @function external:"jQuery.fn".cssHistory
     * @param {(Object|null)} [css=null]
     * @returns {Array.<Object>}
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
     * @returns {Object.<string, (Object|null)>}
     */
    $.fn.getCssHistory = function (id) {
        return this.cssHistory()[id];
    };

    /**
     * Gets current entry in CSS history.
     * @function external:"jQuery.fn".getCurrentCss
     * @returns {Object.<string, (Object|null)>}
     */
    $.fn.getCurrentCss = function () {
        return this.getCssHistory(this.data('__cssCurrentHistoryId'));
    };

    /**
     * Gets last entry in CSS history.
     * @function external:"jQuery.fn".getLastCss
     * @returns {Object.<string, (Object|null)>}
     */
    $.fn.getLastCss = function () {
        return this.getCssHistory(this.cssHistory().length - 1);
    };

    /**
     * Gets previous entry in CSS history.
     * @function external:"jQuery.fn".getPreviousCss
     * @returns {(Object.<string, (Object|null)>|null)}
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
     * @returns {(Object.<string, (Object|null)>|null)}
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
     * @param {(string|Array.<string>|null)} [properties=null]
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
     * @param {(string|Array.<string>|null)} [properties=null]
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
     * @param {(string|Array.<string>|null)} [properties=null]
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
     * @param {(string|Array.<string>|null)} [properties=null]
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
