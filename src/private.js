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