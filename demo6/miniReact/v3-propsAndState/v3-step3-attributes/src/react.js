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
    children.forEach(child => {
      if (typeof(child) === 'object') {
        anElement.appendChild(child);
      } else {
        anElement.innerHTML += child;
      }
    });
    Object.keys(props).forEach(propName => {
      if (/^on.*$/.test(propName)) {
        anElement.addEventListener(propName.substring(2).toLowerCase(), props[propName]);
      } else {
        anElement.setAttribute(propName, props[propName]);
      }
    });
    return anElement;
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