# jQuery CSS Extender

_**English** | [Français](https://github.com/iArcadia/jquery-css-extender/blob/dev/README.fr.md)_

---

jQuery CSS Extender is a jQuery plugin which adds many CSS-relative methods. Its first goal was to read CSS-formated strings using the `.css()` method. Once done, I have had other ideas that I decided to implement.

## Installation

First download the repository from here.

Then, in order to have readable errors in development, include the source files in your HTML file :

```html
<script src="your/path/to/jquery.js"></script>
<script src="your/path/to/jquery-css-extender.js"></script>
```

Or if your are in production, use the minify ones :

```html
<script src="your/path/to/jquery.min.js"></script>
<script src="your/path/to/jquery-css-extender.min.js"></script>
```

## Basic usage

### Raw CSS

As I said, the first meaning of this plugin was to add CSS rules to DOM elements with raw CSS.

```javascript
// Write CSS directly...
$('.elements').css('color: #f00; background-color: #aaa; border: 1px solid #000;');

// Mmh, maybe better with multilines?
$('.elements').css(
    'color: #f00;' +
    'background-color: #aaa;' +
    'border: 1px solid #000;'
);

// But it's even better with backticks!
$('.elements').css(`
    color: #f00;
    background-color: #aaa;
    border: 1px solid #000;
`);
```

### Copy CSS bewteen jQuery object

You have two buttons, you styled the first and want your second to have the exact same color, background-color, border and border-radius? No problem.

```javascript
let cssRulesToCopy = ['color', 'background-color', 'border', 'border-radius'];

// Copy some CSS rules to another one.
$('#buttonA').copyCss($('#buttonB'), cssRulesToCopy);
// Or copy from.
$('#buttonB').copyCssFrom($('#buttonA', cssRulesToCopy));
```

You can also take style from an element. **The element which give its rules will lose them.**

```javascript
let cssRulesToTake = ['color', 'background-color', 'border', 'border-radius'];

// Take some CSS rules to another one.
$('#buttonB').takeCss($('#buttonA'), cssRulesToTake);
// Or give to.
$('#buttonA').giveCssTo($('#buttonB', cssRulesToTake));
```

### Reset CSS to default

If you want to reset some or all CSS rules of an element.

```javascript
// Reset all rules to initial values.
$('#element').resetCss();
// Reset some rules.
$('#element').resetCss(['color', 'background-color']);
```

### CSS history

Each time that the `.css()` method is used, all changes are saved in a jQuery data item.

```javascript
// To get the history of changes.
$('#element').cssHistory();
```

It will give you a JS object with what CSS rules just changed, all rules which have changed, a complete list of rules, and how these rules changed.

```javascript
[
    {...},
    {
        allChangedRules: {...},
        allRules: {...},
        changedRulesFromLast: {...},
        copiedFromObject: {...},
        fromReset: null,
        takenFromHistory: null,
        takenFromObject: null
    }
]
```

This system is activated by default, but you can deactivate it.

```javascript
$('#element').useCssHistorySystem(false);
```

## API

TODO

## Next features

- Development | Before v1.0.0 release
   - CSS states
- GitHub
   - Finish README.md
   - Finish README.fr.md
   - Issue template
