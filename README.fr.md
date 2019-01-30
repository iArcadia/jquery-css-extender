**![Français](https://cdn1.iconfinder.com/data/icons/stripe-flag-set/23/FR.png) Langages** | **Liens**
----|----
[![English](https://cdn1.iconfinder.com/data/icons/stripe-flag-set/23/GB.png)](README.md) | _[Bugs](https://github.com/iArcadia/jquery-css-extender/labels/bug) \| [Suggestions de fonctionnalités](https://github.com/iArcadia/jquery-css-extender/labels/feature%20suggestion) | [Documentation](doc/DOCUMENTATION.md)_

# jQuery CSS Extender

![Dernier commit](https://img.shields.io/github/last-commit/iArcadia/jquery-css-extender.svg?style=flat)
![Version](https://img.shields.io/github/package-json/v/iArcadia/jquery-css-extender.svg?style=flat)
![Dernière version sortie](https://img.shields.io/github/package-json/v/iArcadia/jquery-css-extender/v1.0.x.svg?label=last%20released%20version&style=flat)
![License](https://img.shields.io/github/license/iArcadia/jquery-css-extender.svg?style=flat)

- [Installation](#installation)
- [Usage simple](#usage-simple)
   - [CSS pur](#css-pur)
   - [Copier le CSS entre objet jQuery](#copier-le-css-entre-objet-jquery)
   - [Réinitialiser le CSS](#reinitialiser-le-css)
   - [Historique CSS](#historique-css)
   - [Etats CSS](#etats-css)

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

### CSS pur

Comme cela a été dit, le but premier de ce plugin était l'ajout de règles CSS aux éléments du DOM grâce à du CSS pur.

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

Vous pouvez aussi styliser les éléments enfants directement avec des blocs CSS grâce au selecteur spécial `:this` qui référence l'élément actuellement selectionné avec jQuery.

```javascript
// #element va avoir un affichage flex.
// Les enfants directs <button> de #element vont avoir une couleur de police rouge.
$('#element').css(`
    :this {
        display: flex;
    }
    
    > button {
        color: red;
    }
`);
```

Notez que tous les autres selecteurs écrit avant `:this` ne vont **pas** être pris en compte.  
Notez aussi que `> button` et `:this > button` font la même chose.

### Copier le CSS entre objet jQuery

Vous avez deux boutons, vous avez changé l'apparence du premier et voulez que le second soit exactement identique ? Aucun problème.

```javascript
let cssRulesToCopy = ['color', 'background-color', 'border', 'border-radius'];

// Copie quelques règles CSS de l'un à l'autre.
$('#buttonA').copyCss($('#buttonB'), cssRulesToCopy);
// Ou l'autre peut prendre à l'un.
$('#buttonB').copyCssFrom($('#buttonA', cssRulesToCopy));
```

Vous pouvez aussi *prendre* le style d'un élément. **L'élément qui donne ses règles les perd.**

```javascript
let cssRulesToTake = ['color', 'background-color', 'border', 'border-radius'];

// Prend quelques règles CSS d'un autre.
$('#buttonB').takeCss($('#buttonA'), cssRulesToTake);
// Ou les donne.
$('#buttonA').giveCssTo($('#buttonB', cssRulesToTake));
```

### Réinitialiser le CSS

Si vous voulez réinitialiser certaines ou toutes les règles CSS d'un élément.

```javascript
// Réinitialise toutes les règles dans leurs valeurs initiales.
$('#element').resetCss();
// Réinitialise quelques règles seulement.
$('#element').resetCss(['color', 'background-color']);
```

### Historique CSS

A chaque fois que la méthode `.css()` est utilisée, tous les changements sont gardés en mémoire dans les données jQuery.

```javascript
// Pour obtenir l'historique des changements.
$('#element').cssHistory();
```

Cela va vous donner un objet JS avec des informations sur les règles CSS.

```javascript
[
    {...},
    {
        // Liste de toutes les règles altérées, obtenue depuis "changedRulesFromLast" de tout l'historique.
        allChangedRules: {...},
        
        // Liste de toutes lesrègles altérées depuis le dernier historique.
        changedRulesFromLast: {...},
        
        // Liste de toutes les règles.
        allComputedRules: {...},
        
        // Liste de toutes les règles altérées.
        changedComputedRules: {...},
        
        // Référence à l'objet à partir duquel les règles ont été copiées.
        copiedFromObject: {...}|null,
        
        // Si cet historique a été créé à partir d'une réinitialisation.
        fromReset: {...}|null,
        
        // Référence à l'objet à partir duquel les règles ont été prises.
        takenFromObject: {...}|null,
    }
]
```

Ce système est activé par défaut, mais vous pouvez le désactiver.

```javascript
// Pour le désactiver.
$('#element').useCssHistorySystem(false);
// Pour l'activer.
$('#element').useCssHistorySystem(true);
// Pour le désactiver SEULEMENT pour le prochain ensemble de changements qui va être fait au CSS.
$('#element').forgetCssHistorySystemOnce();
```

Ou si vous voulez simplement vérifier si le système est actif ou non ...

```javascript
// Retourne true ou false.
$('#element').useCssHistorySystem();
```

### Etats CSS

Le système d'états CSS a été conçu principalement pour travailler avec les écouteurs d'événements.  
Ce système ressemble à celui des historiques, mais il y a quelques différences :

- Chaque entrée peut avoir une chaîne de caractères en tant qu'ID.
- Vous décidez quand il faut créer une nouvelle entrée.

Utilisation facile, comme le système d'historique:

```javascript
// Sauvegarde un état appelé "myState".
$('#element').cssState('myState', {'color': 'red'});
// Utilise ce nouvel état "myState".
$('#element').useCssFromState('myState');
// Ou si vous voulez utiliser le style actuel pour créer un nouvel état.
$('#element').css('...').cssStateFromCurrent('secondState');
```

La première particularité est l'utilisation d'un état par défaut, car celui-ci possède ses propres méthodes, et est donc simple d'usage.

```javascript
// Sauvegarde un état par défaut à partir du style courant...
$('#element').css('...').defaultCssStateFromCurrent();
// Ou directement à partir d'un objet.
$('#element').defaultCssState({...});
// Vous voulez utiliser l'état par défaut ?
$('#element').useDefaultCssState();
```

La seconde particularité est, comme déjà cité, la relation avec les écouteurs d'événements.

```javascript
// Utilise l'état "myState" quand l'élément est cliqué.
$('#element').cssStateOn('click', 'myState');
// ...est égal à
$('#element').on('click', function() {
    $(this).useCssFromState('myState');
});

// Et quand je dis que ce point est une particularité, la ligne ci-dessous va chercher un état nommé "click".
$('#element').cssStateOn('click');
```

Cependant, il y a une méthode spéciale pour l'événement "hover" :

```javascript
// Celui-ci va faire en sorte que l'élément utilise "myState" au survol de la souris, mais va revenir à l'état par défaut lorsque la souris n'est plus dessus !
$('#element').cssStateOnHover('myState');
// Et si vous avez déjà un état "hover"...
$('#element').cssStateOnHover();
```

Un dernier point, il y a une méthode consistant a créer un écouteur d'événements pour **chaque état déjà existant**, mis à part celui par défaut bien entendu.  
Cette méthode va executer `.cssStateOnHover()` pour l'état "hover", sinon elle va utiliser `.cssStateOn('...')`.

```javascript
// Créé plusieurs écouteurs: hover et click.
$('#element')
    .cssState('default', {...})
    .cssState('hover', {...})
    .cssState('click', {...})
    .autoCssStateOn();
```