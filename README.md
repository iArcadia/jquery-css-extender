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