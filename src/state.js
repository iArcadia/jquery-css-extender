(function ($) {
    /**
     * Gets all, or one CSS state, or pushes a new item in the state list.
     * @param {string|null}
     * @param {object|null} css
     * @returns {object}
     */
    // PAUSE
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
