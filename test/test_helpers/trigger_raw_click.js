export default (givenNode) => givenNode.dispatchEvent(
  new MouseEvent('click', { view: window, bubbles: true, cancelable: true })
);
