(function ($) {
    /**
     * Gets all, or one CSS state, or pushes a new item in the state list.
     * @function external:"jQuery.fn".cssState
     * @param {(string|null)} [id=null]
     * @param {(Object.<string, string>|null)} [css=null]
     * @returns {Object.<string, Object>}
     */
    /**
     * Gets all, or one CSS state, or pushes a new item in the state list.
     * @function external:"jQuery".cssState
     * @param {HTMLElement} elem
     * @param {(string|null)} [id=null]
     * @param {(Object.<string, string>|null)} [css=null]
     * @returns {Object.<string, Object>}
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
    /**
     * Creates a CSS state from current element style.
     * @function external:"jQuery".cssStateFromCurrent
     * @param {HTMLElement} elem
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
    /**
     * Creates the CSS state by default from current element style.
     * @function external:"jQuery".defaultCssStateFromCurrent
     * @param {HTMLElement} elem
     * @returns {jQuery}
     */
    $.fn.defaultCssStateFromCurrent = function () {
        return this.cssStateFromCurrent('default');
    }

    /**
     * Creates the CSS state by default.
     * @function external:"jQuery.fn".defaultCssState
     * @param {(Object.<string, string>|null)} [css=null]
     * @returns {jQuery}
     */
    /**
     * Creates the CSS state by default.
     * @function external:"jQuery".defaultCssState
     * @param {HTMLElement} elem
     * @param {(Object.<string, string>|null)} [css=null]
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
    /**
     * Uses the default CSS state.
     * @function external:"jQuery".useDefaultCssState
     * @param {HTMLElement} elem
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
    /**
     * Uses a CSS state.
     * @function external:"jQuery".useCssFromState
     * @param {HTMLElement} elem
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
     * @param {(string|null)} [id=null]
     * @returns {jQuery}
     */
    /**
     * Creates an event listener which will be associated to a CSS state.
     * @function external:"jQuery".cssStateOn
     * @param {HTMLElement} elem
     * @param {string} eventType
     * @param {(string|null)} [id=null]
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
     * @param {string} [id=hover]
     * @returns {jQuery}
     */
    /**
     * Associates the mouseenter event listener to the CSS state of specified ID, then the mouseleave one to the default CSS state.
     * @function external:"jQuery".cssStateOnHover
     * @param {HTMLElement} elem
     * @param {string} [id=hover]
     * @returns {jQuery}
     */
    $.fn.cssStateOnHover = function (id = 'hover') {
        this.on('mouseenter', function () {
            $(this).useCssFromState(id);
        }).on('mouseleave', function () {
            $(this).useDefaultCssState();
        });

        return this;
    };

    /**
     * Loops through all CSS states. For each one, creates and associates an event listener.
     * @function external:"jQuery.fn".autoCssStateOn
     * @param {Array.<string>} [excludedStates=[]]
     * @returns {jQuery}
     */
    /**
     * Loops through all CSS states. For each one, creates and associates an event listener.
     * @function external:"jQuery".autoCssStateOn
     * @param {HTMLElement} elem
     * @param {Array.<string>} [excludedStates=[]]
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
