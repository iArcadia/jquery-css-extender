_**English** | [Français](README.fr.md)_

# jQuery CSS Extender

_[Bugs](https://github.com/iArcadia/jquery-css-extender/labels/bug) | [Feature suggestions](https://github.com/iArcadia/jquery-css-extender/labels/feature%20suggestion)_

---

- [Installation](#installation)
- [Basic usage](#basic-usage)
   - [Raw CSS](#raw-css)
   - [Copy CSS between jQuery object](#copy-css-between-jquery-object)
   - [Reset CSS to default](#reset-css-to-default)
   - [CSS history](#css-history)
   - [CSS states](#css-states)
- [API](#api)
- [To do before v1.0.0 release](#to-do-before-v100-release)

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

You can also style children elements directly with CSS blocks thanks to the special selector `:this` which references to current element selected with jQuery.

```javascript
// #element will have a flex display.
// Direct <button> children of #element will have a red font color.
$('#element').css(`
    :this {
        display: flex;
    }
    
    > button {
        color: red;
    }
`);
```

Note that all selectors written before `:this` will **not be taken into account**.  
Note also that `> button` and `:this > button` are the same things.

### Copy CSS between jQuery object

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

// Take some CSS rules from another one.
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

It will give you a JS object with information about CSS rules.

```javascript
[
    {...},
    {
        // List of all changed rules got from "changedRulesFromLast" of all the history.
        allChangedRules: {...},
        
        // List of rules that changed since the last history.
        changedRulesFromLast: {...},
        
        // List of all rules.
        allComputedRules: {...},
        
        // List of all changed computed rules.
        changedComputedRules: {...},
        
        // Reference to the object from which the rules was copied.
        copiedFromObject: {...}|null,
        
        // If this history was created from a reset.
        fromReset: {...}|null,
        
        // Reference to the object from which the rules was taken.
        takenFromObject: {...}|null,
    }
]
```

This system is activated by default, but you can deactivate it.

```javascript
// For deactivating the system.
$('#element').useCssHistorySystem(false);
// For activating the system.
$('#element').useCssHistorySystem(true);
// For deactivating the system for the next CSS changes ONLY.
$('#element').forgetCssHistorySystemOnce();
```

Or if you just want to check the system activity...

```javascript
// Returns true or false.
$('#element').useCssHistorySystem();
```

### CSS states

The CSS state system is designed to work mainly with event listeners.  
This system looks like the history one, but there are many differences:

- Each entry can have a string ID.
- You decide when to push a new entry.

Easy usage, as the history system:

```javascript
// Saves a state named "myState".
$('#element').cssState('myState', {'color': 'red'});
// Uses the newly saved state "myState".
$('#element').useCssFromState('myState');
// Or if you want to use the current style to create a new state.
$('#element').css('...').cssStateFromCurrent('secondState');
```

The first particularity is the usage of a default state, because this one has its own associated methods, and so is easily usable.

```javascript
// Saves a default state from the current style...
$('#element').css('...').defaultCssStateFromCurrent();
// Or directly from an object.
$('#element').defaultCssState({...});
// Want to use the default?
$('#element').useDefaultCssState();
```

The second particularity is, as said, the relation with event listeners.

```javascript
// Uses "myState" when the element is clicked.
$('#element').cssStateOn('click', 'myState');
// ...equals to
$('#element').on('click', function() {
    $(this).useCssFromState('myState');
});

// And when I say that point is a particularity, the line below will search for a state named "click".
$('#element').cssStateOn('click');
```

But there is a special method for the "hover" event:

```javascript
// This one will make the element uses "myState" when hovered by the mouse, but will use back the default state when the mouse will leave!
$('#element').cssStateOnHover('myState');
// And if you have a "hover" state...
$('#element').cssStateOnHover();
```

One last point, there is a method for attributing an event listener on **each already existing state**, excluding the default one of course.  
The method will execute `.cssStateOnHover` for the state "hover", else it will execute `.cssStateOn('...')`.

```javascript
// Creates many event listeners: hover and click.
$('#element')
    .cssState('default', {...})
    .cssState('hover', {...})
    .cssState('click', {...})
    .autoCssStateOn();
```

## API

TODO

## To do before v1.0.0 release

- Development
   - [x] CSS states
   - [ ] Finish examples
- GitHub
   - [ ] Finish README.md
   - [ ] Finish README.fr.md
   - [x] Issue template
