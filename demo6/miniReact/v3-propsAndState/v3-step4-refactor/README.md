#Changelog

* Extract `appendChild` and `appendProp` from `handleHtmlElement`
* Add `shouldAddEventListener` to `react-utils.js`

To keep it simple I kept most of the methods in one file `react.js`.
It would make sense to start separating methods for different files now
e.g:

* `react-html-element.js`
* `react-class.js`
* `react-stateless-component.js`