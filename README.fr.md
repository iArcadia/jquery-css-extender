# jQuery CSS Extender

_[English](https://github.com/iArcadia/jquery-css-extender/blob/dev/README.md) | **Français**_

---

jQuery CSS Extender est un plugin jQuery qui ajoute plusieurs méthodes relatives à la manipulation du CSS. Son objectif principal était de lire des chaînes de caractères CSS pures en utilisant la méthode `.css()`.
Une fois fait, j'ai eu d'autres idées que j'ai décidé d'implémenter.

## Installation

Tout d'abord, téléchargez les fichiers à partir de GitHub.

Ensuite, pour obtenir des erreurs compréhensibles en développement, incluez les fichiers sources dans votre fichier HTML.

```html
<script src="your/path/to/jquery.js"></script>
<script src="your/path/to/jquery-css-extender.js"></script>
```

Ou si vous êtes en production, utilisez ceux minifiés :

```html
<script src="your/path/to/jquery.min.js"></script>
<script src="your/path/to/jquery-css-extender.min.js"></script>
```

## Usage simple

Comme je l'ai dit, le but premier de ce plugin était l'ajout de règles CSS aux éléments du DOM grâce à du CSS pur.

```javascript
// Ecrivez directement du CSS...
$('.elements').css('color: #f00; background-color: #aaa; border: 1px solid #000;');

// Mmh, peut-être mieux en plusieurs lignes ?
$('.elements').css(
    'color: #f00;' +
    'background-color: #aaa;' +
    'border: 1px solid #000;'
);

// Mais ça l'est encore plus avec des backticks !
$('.elements').css(`
    color: #f00;
    background-color: #aaa;
    border: 1px solid #000;
`);
```