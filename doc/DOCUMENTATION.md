## External

<dl>
<dt><a href="#external_jQuery">jQuery</a></dt>
<dd><p>The jQuery namespace.</p>
</dd>
<dt><a href="#external_jQuery.fn">jQuery.fn</a></dt>
<dd><p>The jQuery plugin namespace.</p>
</dd>
</dl>

<a name="external_jQuery"></a>

## jQuery
The jQuery namespace.

**Kind**: global external  

* [jQuery](#external_jQuery)
    * [.cssExtender](#external_jQuery.cssExtender) : <code>Object.&lt;string, (string\|Object)&gt;</code>
        * [.name](#external_jQuery.cssExtender.name) : <code>string</code>
        * [.version](#external_jQuery.cssExtender.version) : <code>string</code>
        * [.github](#external_jQuery.cssExtender.github) : <code>string</code>
        * [.fn](#external_jQuery.cssExtender.fn) : <code>Object.&lt;string, function()&gt;</code>
            * [.mergeAllChangedRulesFromLast($self)](#external_jQuery.cssExtender.fn.mergeAllChangedRulesFromLast) ⇒ <code>Object.&lt;string, string&gt;</code>
            * [.typeOf(property, checkType, type)](#external_jQuery.cssExtender.fn.typeOf) ⇒ <code>boolean</code> \| <code>null</code>
            * [.generateError(property, origin, position, correctTypes, [errorType])](#external_jQuery.cssExtender.fn.generateError)
            * [.handlePropertiesOptionalArgument(properties, origin, positionInArgs)](#external_jQuery.cssExtender.fn.handlePropertiesOptionalArgument) ⇒ <code>Array.&lt;string&gt;</code>
            * [.getAllPluginMethods()](#external_jQuery.cssExtender.fn.getAllPluginMethods) ⇒ <code>Array.&lt;string&gt;</code>
    * [.rawCss(elem, css)](#external_jQuery.rawCss) ⇒ <code>jQuery</code>
    * [.rawCssBlock(elem, css)](#external_jQuery.rawCssBlock) ⇒ <code>jQuery</code>
    * [.getComputedCss(elem, [properties], [excludingLoop])](#external_jQuery.getComputedCss) ⇒ <code>Object.&lt;string, string&gt;</code>
    * [.getDifferencesFromDefaultCss(elem, [properties])](#external_jQuery.getDifferencesFromDefaultCss) ⇒ <code>Object.&lt;string, string&gt;</code>
    * [.copyCss(elem, $obj, [properties], [excludingLoop])](#external_jQuery.copyCss) ⇒ <code>jQuery</code>
    * [.copyCssTo(elem, $obj, [properties], [excludingLoop])](#external_jQuery.copyCssTo) ⇒ <code>jQuery</code>
    * [.takeCss(elem, $obj, [properties], [excludingLoop])](#external_jQuery.takeCss) ⇒ <code>jQuery</code>
    * [.giveCssTo(elem, $obj, [properties], [excludingLoop])](#external_jQuery.giveCssTo) ⇒ <code>jQuery</code>
    * [.resetCss(elem, [properties])](#external_jQuery.resetCss) ⇒ <code>jQuery</code>
    * [.useCssHistorySystem(elem, [use])](#external_jQuery.useCssHistorySystem) ⇒ <code>jQuery</code> \| <code>boolean</code>
    * [.forgetCssHistorySystemOnce(elem)](#external_jQuery.forgetCssHistorySystemOnce) ⇒ <code>jQuery</code>
    * [.cssHistory(elem, [css])](#external_jQuery.cssHistory) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getCssHistory(elem, id)](#external_jQuery.getCssHistory) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
    * [.getCurrentCss(elem)](#external_jQuery.getCurrentCss) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
    * [.getLastCss(elem)](#external_jQuery.getLastCss) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
    * [.getPreviousCss(elem)](#external_jQuery.getPreviousCss) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code> \| <code>null</code>
    * [.getNextCss(elem)](#external_jQuery.getNextCss) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code> \| <code>null</code>
    * [.useCssFromHistory(elem, id, [properties])](#external_jQuery.useCssFromHistory) ⇒ <code>jQuery</code>
    * [.usePreviousCss(elem, [properties])](#external_jQuery.usePreviousCss) ⇒ <code>jQuery</code>
    * [.useNextCss(elem, [properties])](#external_jQuery.useNextCss) ⇒ <code>jQuery</code>
    * [.useLastCss(elem, [properties])](#external_jQuery.useLastCss) ⇒ <code>jQuery</code>
    * [.emptyCssHistory(elem)](#external_jQuery.emptyCssHistory) ⇒ <code>jQuery</code>
    * [.cssState(elem, [id], [css])](#external_jQuery.cssState) ⇒ <code>Object.&lt;string, Object&gt;</code>
    * [.cssStateFromCurrent(elem, id)](#external_jQuery.cssStateFromCurrent) ⇒ <code>jQuery</code>
    * [.defaultCssStateFromCurrent(elem)](#external_jQuery.defaultCssStateFromCurrent) ⇒ <code>jQuery</code>
    * [.defaultCssState(elem, [css])](#external_jQuery.defaultCssState) ⇒ <code>jQuery</code>
    * [.useDefaultCssState(elem)](#external_jQuery.useDefaultCssState) ⇒ <code>jQuery</code>
    * [.useCssFromState(elem, id)](#external_jQuery.useCssFromState) ⇒ <code>jQuery</code>
    * [.cssStateOn(elem, eventType, [id])](#external_jQuery.cssStateOn) ⇒ <code>jQuery</code>
    * [.cssStateOnHover(elem, [id])](#external_jQuery.cssStateOnHover) ⇒ <code>jQuery</code>
    * [.autoCssStateOn(elem, [excludedStates])](#external_jQuery.autoCssStateOn) ⇒ <code>jQuery</code>

<a name="external_jQuery.cssExtender"></a>

### jQuery.cssExtender : <code>Object.&lt;string, (string\|Object)&gt;</code>
The jQuery CSS Extender plugin namespace.

**Kind**: static property of [<code>jQuery</code>](#external_jQuery)  

* [.cssExtender](#external_jQuery.cssExtender) : <code>Object.&lt;string, (string\|Object)&gt;</code>
    * [.name](#external_jQuery.cssExtender.name) : <code>string</code>
    * [.version](#external_jQuery.cssExtender.version) : <code>string</code>
    * [.github](#external_jQuery.cssExtender.github) : <code>string</code>
    * [.fn](#external_jQuery.cssExtender.fn) : <code>Object.&lt;string, function()&gt;</code>
        * [.mergeAllChangedRulesFromLast($self)](#external_jQuery.cssExtender.fn.mergeAllChangedRulesFromLast) ⇒ <code>Object.&lt;string, string&gt;</code>
        * [.typeOf(property, checkType, type)](#external_jQuery.cssExtender.fn.typeOf) ⇒ <code>boolean</code> \| <code>null</code>
        * [.generateError(property, origin, position, correctTypes, [errorType])](#external_jQuery.cssExtender.fn.generateError)
        * [.handlePropertiesOptionalArgument(properties, origin, positionInArgs)](#external_jQuery.cssExtender.fn.handlePropertiesOptionalArgument) ⇒ <code>Array.&lt;string&gt;</code>
        * [.getAllPluginMethods()](#external_jQuery.cssExtender.fn.getAllPluginMethods) ⇒ <code>Array.&lt;string&gt;</code>

<a name="external_jQuery.cssExtender.name"></a>

#### cssExtender.name : <code>string</code>
Name of the plugin.

**Kind**: static property of [<code>cssExtender</code>](#external_jQuery.cssExtender)  
<a name="external_jQuery.cssExtender.version"></a>

#### cssExtender.version : <code>string</code>
Current version of the plugin.

**Kind**: static property of [<code>cssExtender</code>](#external_jQuery.cssExtender)  
<a name="external_jQuery.cssExtender.github"></a>

#### cssExtender.github : <code>string</code>
GitHub repository URL of the plugin.

**Kind**: static property of [<code>cssExtender</code>](#external_jQuery.cssExtender)  
<a name="external_jQuery.cssExtender.fn"></a>

#### cssExtender.fn : <code>Object.&lt;string, function()&gt;</code>
The jQuery CSS Extender internal methods namespace.

**Kind**: static property of [<code>cssExtender</code>](#external_jQuery.cssExtender)  

* [.fn](#external_jQuery.cssExtender.fn) : <code>Object.&lt;string, function()&gt;</code>
    * [.mergeAllChangedRulesFromLast($self)](#external_jQuery.cssExtender.fn.mergeAllChangedRulesFromLast) ⇒ <code>Object.&lt;string, string&gt;</code>
    * [.typeOf(property, checkType, type)](#external_jQuery.cssExtender.fn.typeOf) ⇒ <code>boolean</code> \| <code>null</code>
    * [.generateError(property, origin, position, correctTypes, [errorType])](#external_jQuery.cssExtender.fn.generateError)
    * [.handlePropertiesOptionalArgument(properties, origin, positionInArgs)](#external_jQuery.cssExtender.fn.handlePropertiesOptionalArgument) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getAllPluginMethods()](#external_jQuery.cssExtender.fn.getAllPluginMethods) ⇒ <code>Array.&lt;string&gt;</code>

<a name="external_jQuery.cssExtender.fn.mergeAllChangedRulesFromLast"></a>

##### fn.mergeAllChangedRulesFromLast($self) ⇒ <code>Object.&lt;string, string&gt;</code>
Loops through all CSS history of an jQuery object in order to merge all changed rules from an history into one.

**Kind**: static method of [<code>fn</code>](#external_jQuery.cssExtender.fn)  

| Param | Type |
| --- | --- |
| $self | <code>jQuery</code> | 

<a name="external_jQuery.cssExtender.fn.typeOf"></a>

##### fn.typeOf(property, checkType, type) ⇒ <code>boolean</code> \| <code>null</code>
Executes a callback if the property has the correct type.

**Kind**: static method of [<code>fn</code>](#external_jQuery.cssExtender.fn)  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>\*</code> |  |
| checkType | <code>string</code> | Possible values: = | == | === | is | != | !== | is not |
| type | <code>\*</code> |  |

<a name="external_jQuery.cssExtender.fn.generateError"></a>

##### fn.generateError(property, origin, position, correctTypes, [errorType])
Throws a custom error.

**Kind**: static method of [<code>fn</code>](#external_jQuery.cssExtender.fn)  

| Param | Type | Default |
| --- | --- | --- |
| property | <code>\*</code> |  | 
| origin | <code>string</code> |  | 
| position | <code>number</code> |  | 
| correctTypes | <code>Array.&lt;string&gt;</code> |  | 
| [errorType] | <code>string</code> | <code>&quot;Error&quot;</code> | 

<a name="external_jQuery.cssExtender.fn.handlePropertiesOptionalArgument"></a>

##### fn.handlePropertiesOptionalArgument(properties, origin, positionInArgs) ⇒ <code>Array.&lt;string&gt;</code>
Checks the optional argument "properties" used in many methods.

**Kind**: static method of [<code>fn</code>](#external_jQuery.cssExtender.fn)  

| Param | Type |
| --- | --- |
| properties | <code>string</code> \| <code>array</code> \| <code>null</code> | 
| origin | <code>string</code> | 
| positionInArgs | <code>number</code> \| <code>string</code> | 

<a name="external_jQuery.cssExtender.fn.getAllPluginMethods"></a>

##### fn.getAllPluginMethods() ⇒ <code>Array.&lt;string&gt;</code>
Returns all methods of the plugin.

**Kind**: static method of [<code>fn</code>](#external_jQuery.cssExtender.fn)  
<a name="external_jQuery.rawCss"></a>

### jQuery.rawCss(elem, css) ⇒ <code>jQuery</code>
Adds CSS rules from a CSS-formated string.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 
| css | <code>string</code> | 

<a name="external_jQuery.rawCssBlock"></a>

### jQuery.rawCssBlock(elem, css) ⇒ <code>jQuery</code>
Handles CSS rules found into blocks and adds them to elements found with selectors.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 
| css | <code>string</code> | 

<a name="external_jQuery.getComputedCss"></a>

### jQuery.getComputedCss(elem, [properties], [excludingLoop]) ⇒ <code>Object.&lt;string, string&gt;</code>
Gets computed CSS rules.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.getDifferencesFromDefaultCss"></a>

### jQuery.getDifferencesFromDefaultCss(elem, [properties]) ⇒ <code>Object.&lt;string, string&gt;</code>
Gets all CSS rules that are differents from the original ones.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.copyCss"></a>

### jQuery.copyCss(elem, $obj, [properties], [excludingLoop]) ⇒ <code>jQuery</code>
Copies CSS rules of a jQuery object.If the original element have no history (because its style comes from a CSS file, <style> tags)or the history system has ben disabled, the element which wants to copy will take ALL computed rules of the target one.Else, it will take all changed rules since the beginning.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| $obj | <code>jQuery</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.copyCssTo"></a>

### jQuery.copyCssTo(elem, $obj, [properties], [excludingLoop]) ⇒ <code>jQuery</code>
Copies its own CSS rules to a jQuery object.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| $obj | <code>jQuery</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.takeCss"></a>

### jQuery.takeCss(elem, $obj, [properties], [excludingLoop]) ⇒ <code>jQuery</code>
Copies CSS rules then resets rules of a jQuery object.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| $obj | <code>jQuery</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.giveCssTo"></a>

### jQuery.giveCssTo(elem, $obj, [properties], [excludingLoop]) ⇒ <code>jQuery</code>
Copies its own CSS rules to a jQuery object then resets its rules.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| $obj | <code>jQuery</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.resetCss"></a>

### jQuery.resetCss(elem, [properties]) ⇒ <code>jQuery</code>
Sets CSS rules to browser default ones.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.useCssHistorySystem"></a>

### jQuery.useCssHistorySystem(elem, [use]) ⇒ <code>jQuery</code> \| <code>boolean</code>
Activates or deactivates the use of CSS history. If null, gets if the system's state.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [use] | <code>boolean</code> \| <code>null</code> | <code></code> | 

<a name="external_jQuery.forgetCssHistorySystemOnce"></a>

### jQuery.forgetCssHistorySystemOnce(elem) ⇒ <code>jQuery</code>
Deactives the use of CSS history for the next execution of .css() only.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 

<a name="external_jQuery.cssHistory"></a>

### jQuery.cssHistory(elem, [css]) ⇒ <code>Array.&lt;Object&gt;</code>
Gets CSS history or pushes a new item in the history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [css] | <code>Object</code> \| <code>null</code> | <code></code> | 

<a name="external_jQuery.getCssHistory"></a>

### jQuery.getCssHistory(elem, id) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
Gets an entry in CSS history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 
| id | <code>number</code> | 

<a name="external_jQuery.getCurrentCss"></a>

### jQuery.getCurrentCss(elem) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
Gets current entry in CSS history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 

<a name="external_jQuery.getLastCss"></a>

### jQuery.getLastCss(elem) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
Gets last entry in CSS history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 

<a name="external_jQuery.getPreviousCss"></a>

### jQuery.getPreviousCss(elem) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code> \| <code>null</code>
Gets previous entry in CSS history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 

<a name="external_jQuery.getNextCss"></a>

### jQuery.getNextCss(elem) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code> \| <code>null</code>
Gets next entry in CSS history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 

<a name="external_jQuery.useCssFromHistory"></a>

### jQuery.useCssFromHistory(elem, id, [properties]) ⇒ <code>jQuery</code>
Uses a previous CSS taken from the history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| id | <code>number</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.usePreviousCss"></a>

### jQuery.usePreviousCss(elem, [properties]) ⇒ <code>jQuery</code>
Uses the previous used CSS rules.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.useNextCss"></a>

### jQuery.useNextCss(elem, [properties]) ⇒ <code>jQuery</code>
Uses the next used CSS rules.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.useLastCss"></a>

### jQuery.useLastCss(elem, [properties]) ⇒ <code>jQuery</code>
Uses the last used CSS rules from history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.emptyCssHistory"></a>

### jQuery.emptyCssHistory(elem) ⇒ <code>jQuery</code>
Empties the CSS history.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 

<a name="external_jQuery.cssState"></a>

### jQuery.cssState(elem, [id], [css]) ⇒ <code>Object.&lt;string, Object&gt;</code>
Gets all, or one CSS state, or pushes a new item in the state list.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [id] | <code>string</code> \| <code>null</code> | <code>null</code> | 
| [css] | <code>Object.&lt;string, string&gt;</code> \| <code>null</code> | <code></code> | 

<a name="external_jQuery.cssStateFromCurrent"></a>

### jQuery.cssStateFromCurrent(elem, id) ⇒ <code>jQuery</code>
Creates a CSS state from current element style.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 
| id | <code>string</code> | 

<a name="external_jQuery.defaultCssStateFromCurrent"></a>

### jQuery.defaultCssStateFromCurrent(elem) ⇒ <code>jQuery</code>
Creates the CSS state by default from current element style.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 

<a name="external_jQuery.defaultCssState"></a>

### jQuery.defaultCssState(elem, [css]) ⇒ <code>jQuery</code>
Creates the CSS state by default.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [css] | <code>Object.&lt;string, string&gt;</code> \| <code>null</code> | <code></code> | 

<a name="external_jQuery.useDefaultCssState"></a>

### jQuery.useDefaultCssState(elem) ⇒ <code>jQuery</code>
Uses the default CSS state.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 

<a name="external_jQuery.useCssFromState"></a>

### jQuery.useCssFromState(elem, id) ⇒ <code>jQuery</code>
Uses a CSS state.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type |
| --- | --- |
| elem | <code>HTMLElement</code> | 
| id | <code>string</code> | 

<a name="external_jQuery.cssStateOn"></a>

### jQuery.cssStateOn(elem, eventType, [id]) ⇒ <code>jQuery</code>
Creates an event listener which will be associated to a CSS state.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| eventType | <code>string</code> |  | 
| [id] | <code>string</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.cssStateOnHover"></a>

### jQuery.cssStateOnHover(elem, [id]) ⇒ <code>jQuery</code>
Associates the mouseenter event listener to the CSS state of specified ID, then the mouseleave one to the default CSS state.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [id] | <code>string</code> | <code>&quot;hover&quot;</code> | 

<a name="external_jQuery.autoCssStateOn"></a>

### jQuery.autoCssStateOn(elem, [excludedStates]) ⇒ <code>jQuery</code>
Loops through all CSS states. For each one, creates and associates an event listener.

**Kind**: static method of [<code>jQuery</code>](#external_jQuery)  

| Param | Type | Default |
| --- | --- | --- |
| elem | <code>HTMLElement</code> |  | 
| [excludedStates] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | 

<a name="external_jQuery.fn"></a>

## jQuery.fn
The jQuery plugin namespace.

**Kind**: global external  
**See**: [The jQuery Plugin Guide](http://docs.jquery.com/Plugins/Authoring)  

* [jQuery.fn](#external_jQuery.fn)
    * [.css()](#external_jQuery.fn.css) ⇒ <code>jQuery</code>
    * [.rawCss(css)](#external_jQuery.fn.rawCss) ⇒ <code>jQuery</code>
    * [.rawCssBlock(css)](#external_jQuery.fn.rawCssBlock) ⇒ <code>jQuery</code>
    * [.getComputedCss([properties], [excludingLoop])](#external_jQuery.fn.getComputedCss) ⇒ <code>Object.&lt;string, string&gt;</code>
    * [.getDifferencesFromDefaultCss([properties])](#external_jQuery.fn.getDifferencesFromDefaultCss) ⇒ <code>Object.&lt;string, string&gt;</code>
    * [.copyCss($obj, [properties], [excludingLoop])](#external_jQuery.fn.copyCss) ⇒ <code>jQuery</code>
    * [.copyCssTo($obj, [properties], [excludingLoop])](#external_jQuery.fn.copyCssTo) ⇒ <code>jQuery</code>
    * [.takeCss($obj, [properties], [excludingLoop])](#external_jQuery.fn.takeCss) ⇒ <code>jQuery</code>
    * [.giveCssTo($obj, [properties], [excludingLoop])](#external_jQuery.fn.giveCssTo) ⇒ <code>jQuery</code>
    * [.resetCss([properties])](#external_jQuery.fn.resetCss) ⇒ <code>jQuery</code>
    * [.useCssHistorySystem([use])](#external_jQuery.fn.useCssHistorySystem) ⇒ <code>jQuery</code> \| <code>boolean</code>
    * [.forgetCssHistorySystemOnce()](#external_jQuery.fn.forgetCssHistorySystemOnce) ⇒ <code>jQuery</code>
    * [.cssHistory([css])](#external_jQuery.fn.cssHistory) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getCssHistory(id)](#external_jQuery.fn.getCssHistory) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
    * [.getCurrentCss()](#external_jQuery.fn.getCurrentCss) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
    * [.getLastCss()](#external_jQuery.fn.getLastCss) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
    * [.getPreviousCss()](#external_jQuery.fn.getPreviousCss) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code> \| <code>null</code>
    * [.getNextCss()](#external_jQuery.fn.getNextCss) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code> \| <code>null</code>
    * [.useCssFromHistory(id, [properties])](#external_jQuery.fn.useCssFromHistory) ⇒ <code>jQuery</code>
    * [.usePreviousCss([properties])](#external_jQuery.fn.usePreviousCss) ⇒ <code>jQuery</code>
    * [.useNextCss([properties])](#external_jQuery.fn.useNextCss) ⇒ <code>jQuery</code>
    * [.useLastCss([properties])](#external_jQuery.fn.useLastCss) ⇒ <code>jQuery</code>
    * [.emptyCssHistory()](#external_jQuery.fn.emptyCssHistory) ⇒ <code>jQuery</code>
    * [.cssState([id], [css])](#external_jQuery.fn.cssState) ⇒ <code>Object.&lt;string, Object&gt;</code>
    * [.cssStateFromCurrent(id)](#external_jQuery.fn.cssStateFromCurrent) ⇒ <code>jQuery</code>
    * [.defaultCssStateFromCurrent()](#external_jQuery.fn.defaultCssStateFromCurrent) ⇒ <code>jQuery</code>
    * [.defaultCssState([css])](#external_jQuery.fn.defaultCssState) ⇒ <code>jQuery</code>
    * [.useDefaultCssState()](#external_jQuery.fn.useDefaultCssState) ⇒ <code>jQuery</code>
    * [.useCssFromState(id)](#external_jQuery.fn.useCssFromState) ⇒ <code>jQuery</code>
    * [.cssStateOn(eventType, [id])](#external_jQuery.fn.cssStateOn) ⇒ <code>jQuery</code>
    * [.cssStateOnHover([id])](#external_jQuery.fn.cssStateOnHover) ⇒ <code>jQuery</code>
    * [.autoCssStateOn([excludedStates])](#external_jQuery.fn.autoCssStateOn) ⇒ <code>jQuery</code>

<a name="external_jQuery.fn.css"></a>

### jQuery.fn.css() ⇒ <code>jQuery</code>
Overrides the original .css() method.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
**See**: [http://api.jquery.com/css/](http://api.jquery.com/css/)  
<a name="external_jQuery.fn.rawCss"></a>

### jQuery.fn.rawCss(css) ⇒ <code>jQuery</code>
Adds CSS rules from a CSS-formated string.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type |
| --- | --- |
| css | <code>string</code> | 

<a name="external_jQuery.fn.rawCssBlock"></a>

### jQuery.fn.rawCssBlock(css) ⇒ <code>jQuery</code>
Handles CSS rules found into blocks and adds them to elements found with selectors.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type |
| --- | --- |
| css | <code>string</code> | 

<a name="external_jQuery.fn.getComputedCss"></a>

### jQuery.fn.getComputedCss([properties], [excludingLoop]) ⇒ <code>Object.&lt;string, string&gt;</code>
Gets computed CSS rules.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.fn.getDifferencesFromDefaultCss"></a>

### jQuery.fn.getDifferencesFromDefaultCss([properties]) ⇒ <code>Object.&lt;string, string&gt;</code>
Gets all CSS rules that are differents from the original ones.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
**Todo**

- [ ] excludingLoop


| Param | Type | Default |
| --- | --- | --- |
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.fn.copyCss"></a>

### jQuery.fn.copyCss($obj, [properties], [excludingLoop]) ⇒ <code>jQuery</code>
Copies CSS rules of a jQuery object.If the original element have no history (because its style comes from a CSS file, <style> tags)or the history system has ben disabled, the element which wants to copy will take ALL computed rules of the target one.Else, it will take all changed rules since the beginning.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| $obj | <code>jQuery</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.fn.copyCssTo"></a>

### jQuery.fn.copyCssTo($obj, [properties], [excludingLoop]) ⇒ <code>jQuery</code>
Copies its own CSS rules to a jQuery object.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| $obj | <code>jQuery</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.fn.takeCss"></a>

### jQuery.fn.takeCss($obj, [properties], [excludingLoop]) ⇒ <code>jQuery</code>
Copies CSS rules then resets rules of a jQuery object.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| $obj | <code>jQuery</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.fn.giveCssTo"></a>

### jQuery.fn.giveCssTo($obj, [properties], [excludingLoop]) ⇒ <code>jQuery</code>
Copies its own CSS rules to a jQuery object then resets its rules.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| $obj | <code>jQuery</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 
| [excludingLoop] | <code>boolean</code> | <code>false</code> | 

<a name="external_jQuery.fn.resetCss"></a>

### jQuery.fn.resetCss([properties]) ⇒ <code>jQuery</code>
Sets CSS rules to browser default ones.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.fn.useCssHistorySystem"></a>

### jQuery.fn.useCssHistorySystem([use]) ⇒ <code>jQuery</code> \| <code>boolean</code>
Activates or deactivates the use of CSS history. If null, gets if the system's state.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [use] | <code>boolean</code> \| <code>null</code> | <code></code> | 

<a name="external_jQuery.fn.forgetCssHistorySystemOnce"></a>

### jQuery.fn.forgetCssHistorySystemOnce() ⇒ <code>jQuery</code>
Deactives the use of CSS history for the next execution of .css() only.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
<a name="external_jQuery.fn.cssHistory"></a>

### jQuery.fn.cssHistory([css]) ⇒ <code>Array.&lt;Object&gt;</code>
Gets CSS history or pushes a new item in the history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [css] | <code>Object</code> \| <code>null</code> | <code></code> | 

<a name="external_jQuery.fn.getCssHistory"></a>

### jQuery.fn.getCssHistory(id) ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
Gets an entry in CSS history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type |
| --- | --- |
| id | <code>number</code> | 

<a name="external_jQuery.fn.getCurrentCss"></a>

### jQuery.fn.getCurrentCss() ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
Gets current entry in CSS history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
<a name="external_jQuery.fn.getLastCss"></a>

### jQuery.fn.getLastCss() ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code>
Gets last entry in CSS history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
<a name="external_jQuery.fn.getPreviousCss"></a>

### jQuery.fn.getPreviousCss() ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code> \| <code>null</code>
Gets previous entry in CSS history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
<a name="external_jQuery.fn.getNextCss"></a>

### jQuery.fn.getNextCss() ⇒ <code>Object.&lt;string, (Object\|null)&gt;</code> \| <code>null</code>
Gets next entry in CSS history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
<a name="external_jQuery.fn.useCssFromHistory"></a>

### jQuery.fn.useCssFromHistory(id, [properties]) ⇒ <code>jQuery</code>
Uses a previous CSS taken from the history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| id | <code>number</code> |  | 
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.fn.usePreviousCss"></a>

### jQuery.fn.usePreviousCss([properties]) ⇒ <code>jQuery</code>
Uses the previous used CSS rules.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.fn.useNextCss"></a>

### jQuery.fn.useNextCss([properties]) ⇒ <code>jQuery</code>
Uses the next used CSS rules.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.fn.useLastCss"></a>

### jQuery.fn.useLastCss([properties]) ⇒ <code>jQuery</code>
Uses the last used CSS rules from history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [properties] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.fn.emptyCssHistory"></a>

### jQuery.fn.emptyCssHistory() ⇒ <code>jQuery</code>
Empties the CSS history.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
<a name="external_jQuery.fn.cssState"></a>

### jQuery.fn.cssState([id], [css]) ⇒ <code>Object.&lt;string, Object&gt;</code>
Gets all, or one CSS state, or pushes a new item in the state list.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [id] | <code>string</code> \| <code>null</code> | <code>null</code> | 
| [css] | <code>Object.&lt;string, string&gt;</code> \| <code>null</code> | <code></code> | 

<a name="external_jQuery.fn.cssStateFromCurrent"></a>

### jQuery.fn.cssStateFromCurrent(id) ⇒ <code>jQuery</code>
Creates a CSS state from current element style.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="external_jQuery.fn.defaultCssStateFromCurrent"></a>

### jQuery.fn.defaultCssStateFromCurrent() ⇒ <code>jQuery</code>
Creates the CSS state by default from current element style.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
<a name="external_jQuery.fn.defaultCssState"></a>

### jQuery.fn.defaultCssState([css]) ⇒ <code>jQuery</code>
Creates the CSS state by default.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [css] | <code>Object.&lt;string, string&gt;</code> \| <code>null</code> | <code></code> | 

<a name="external_jQuery.fn.useDefaultCssState"></a>

### jQuery.fn.useDefaultCssState() ⇒ <code>jQuery</code>
Uses the default CSS state.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  
<a name="external_jQuery.fn.useCssFromState"></a>

### jQuery.fn.useCssFromState(id) ⇒ <code>jQuery</code>
Uses a CSS state.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="external_jQuery.fn.cssStateOn"></a>

### jQuery.fn.cssStateOn(eventType, [id]) ⇒ <code>jQuery</code>
Creates an event listener which will be associated to a CSS state.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| eventType | <code>string</code> |  | 
| [id] | <code>string</code> \| <code>null</code> | <code>null</code> | 

<a name="external_jQuery.fn.cssStateOnHover"></a>

### jQuery.fn.cssStateOnHover([id]) ⇒ <code>jQuery</code>
Associates the mouseenter event listener to the CSS state of specified ID, then the mouseleave one to the default CSS state.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [id] | <code>string</code> | <code>&quot;hover&quot;</code> | 

<a name="external_jQuery.fn.autoCssStateOn"></a>

### jQuery.fn.autoCssStateOn([excludedStates]) ⇒ <code>jQuery</code>
Loops through all CSS states. For each one, creates and associates an event listener.

**Kind**: static method of [<code>jQuery.fn</code>](#external_jQuery.fn)  

| Param | Type | Default |
| --- | --- | --- |
| [excludedStates] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | 

