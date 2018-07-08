function isStateLessComponent(element) {
  return !isClass(element) && typeof element === 'function'
}

function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}

function shouldAddEventListener(property) {
  return /^on.*$/.test(property);
}
