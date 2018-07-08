(() => {
  function anElement(element, props, children) {
    if (isClass(element)) {
      return handleClass(element, props);
    } else if (isStateLessComponent(element)) {
      return element(props);
    } else {
      return handleHtmlElement(element, props, children);
    }
  }

  function createElement(el, props, ...children) {
    return anElement(el, props, children);
  }

  function handleClass(clazz, props) {
    const component = new clazz(props);
    return component.render();
  }

  function handleHtmlElement(element, props, children) {
    const anElement = document.createElement(element);
    children.forEach(child => appendChild(anElement, child));
    _.forEach(props, (value, name) => appendProp(anElement, name, value));
    return anElement;
  }

  function appendChild(element, child) {
    if (typeof(child) === 'object') {
      element.appendChild(child);
    } else {
      element.innerHTML += child;
    }
  }

  function appendProp(element, propName, propVal) {
    if (shouldAddEventListener(propName)) {
      element.addEventListener(propName.substring(2).toLowerCase(), propVal);
    } else {
      element.setAttribute(propName, propVal);
    }
  }

  class Component {
    constructor(props) {
      this.props = props;
    }
  }

  window.React = {
    createElement,
    Component
  };
  window.ReactDOM = {
    render: (el, domEl) => {
      domEl.appendChild(el);
    }
  };
})();