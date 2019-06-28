/**
 * Generate a reduce function for use on array-like objects
 * (i.e. Element.classList).
 */
const reduce = Array.prototype.reduce.call.bind(Array.prototype.reduce);

/**
 * Collect all elements from a specified descendant to a specified ancestor
 * (inclusive).
 * @param {HTMLElement} node Descendent element
 * @param {HTMLElement} root Top-level ancestor element
 * @return {Array}
 */
export function getAncestorNodes(node, root, inclusive) {
  const ancestors = [];
  const stop = inclusive ? root.parentNode : root;
  let current = node;
  while (current !== stop) {
    ancestors.push(current);
    current = current.parentNode;
  }
  return ancestors;
}

/**
 * A reducer to convert a classList to a CSS selector.
 * @see formatNodeSelector below
 * @param {String} classNames
 * @param {String} className
 * @return {String}
 */
function reduceClassNames(classNames, className) {
  return `${classNames}.${className}`;
}

/**
 * Create a CSS selector for a specified node, consisting of its name (excluding
 * div elements) and its CSS classnames.
 * @example
 * <h1 class="heading big"/> => h1.heading.big
 * @example
 * <div class="wrapper"/> => .wrapper
 * @example
 * <span class="lorem-ipsum message"/> => span.lorem-ipsum.message
 * @example
 * <div/> =>
 * @param {HTMLElement} node
 * @return {String}
 */
export function formatNodeSelector(node) {
  const nodeName = node.nodeName !== 'DIV' ? node.nodeName.toLowerCase() : '';
  const classes = reduce(node.classList, reduceClassNames, '');
  return nodeName + classes;
}

/**
 * Generate a string of CSS selectors which describes the path from an
 * ancestor element to a specified descendant.
 * @example
 * <div class="root"><div class="hero"><div><h1 class="heading big">
 * .root .hero h1.heading.big
 * @param {HTMLElement} node Descendent element
 * @param {HTMLElement} root Top-level ancestor element
 * @return String
 */
export function generateNodePath(node, root) {
  return getAncestorNodes(node, root, true)
    .reverse()
    .map(formatNodeSelector)
    .filter(selector => selector)
    .join(' ');
}

/**
 * Calculate the offset left and top positions of an element relative to
 * the document.
 * @param {HTMLElement} node
 * @return {Object}
 */
export function getOffset(node) {
  let left = 0;
  let top = 0;
  let currentNode = node;

  while (currentNode) {
    left += currentNode.offsetLeft;
    top += currentNode.offsetTop;
    currentNode = currentNode.offsetParent;
  }

  const width = node.offsetWidth;
  const height = node.offsetHeight;

  // Since coordinates are 0-based, the inverse coordinates of left and top
  // (i.e. right and bottom) need to be offset by one.
  let right = left + width - 1;
  let bottom = top + height - 1;

  // This is the weird part. Due to subpixel rendering of elements whose
  // coordinates and/or dimensions are not integers, some elements receive
  // events triggered outside their calculated bounds. Therefore, we must
  // detect subpixel rendering and normalize the right and bottom offsets.
  // To detect, check if right and bottom values of the bounding rectangle
  // are float values. To normalize, increment the respective offset(s) to
  // properly tare the coordinates of events that are triggered outside
  // the previously calculated offset.
  const { right: r, bottom: b } = node.getBoundingClientRect();

  if (r !== parseInt(r, 10)) {
    right++;
  }

  if (b !== parseInt(b, 10)) {
    bottom++;
  }

  return {
    left,
    top,
    right,
    bottom,
    width,
    height,
  };
}

/**
 * Get the computed value for a specified CSS property.
 * @param {HTMLElement} node
 * @param {String} property
 * @return {String}
 */
export function getComputedStyle(node, property) {
  const document = node && node.ownerDocument;
  if (!document) {
    return;
  }

  const window = document.defaultView;
  const style = window.getComputedStyle(node, null);

  return style.getPropertyValue(property);
}
