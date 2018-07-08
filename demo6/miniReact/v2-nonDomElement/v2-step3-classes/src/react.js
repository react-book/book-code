(() => {
  function anElement(element, children) {
    if (isClass(element)) {
      const component = new element();
      return component.render();
    } else if (typeof(element) === 'function') {
      return element();
    } else {
      const anElement = document.createElement(element);
      children.forEach(child => {
        if (typeof(child) === 'object') {
          anElement.appendChild(child);
        } else {
          anElement.innerHTML += child;
        }
      });
      return anElement;
    }
  }

  function createElement(el, props, ...children) {
    return anElement(el, children);
  }

  function isClass(func) {
    return typeof func === 'function'
      && /^class\s/.test(Function.prototype.toString.call(func));
  }

  window.React = {
    createElement
  };
  window.ReactDOM = {
    render: (el, domEl) => {
      domEl.appendChild(el);
    }
  };
})();