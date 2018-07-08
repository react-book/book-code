(() => {
  function div(children) {
    const aDiv = document.createElement('div');
    aDiv.innerHTML = children.join(' ');
    return aDiv;
  }

  function createElement(el, props, ...children) {
    return div(children);
  }

  window.React = {
    createElement
  };

  //For convenient we will write ReactDOM here as well
  window.ReactDOM = {
    render: (el, domEl) => {
      domEl.appendChild(el);
    }
  };
})();