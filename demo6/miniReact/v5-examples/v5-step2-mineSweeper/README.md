#Changelog:

* Add support for inline style
* Handled various edge cases (undefined child and props)
* In the original game they wrote a prop names onStartNewGame. I needed to change it
so it won't think it's a real dom event. This is the link to React's [events constants](https://github.com/facebook/react/blob/a9d0deb8e13e9f0b1ee7d2f28a6eec0e7ad2e41d/src/renderers/shared/shared/event/BrowserEventConstants.js#L23)
