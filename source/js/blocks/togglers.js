const ACTIVE_TOGGLER_CLASSNAME = 'togglers__control--active';

export default class Togglers {
  constructor(togglerWrapperElement) {
    this._togglerWrapperElement = togglerWrapperElement;
    this._togglerElements = togglerWrapperElement.querySelectorAll('.togglers__control');

    this._setListeners();
  }

  get length() {
    return this._togglerElements.length;
  }

  init() {
    const activeElement = this._togglerWrapperElement.querySelector('[data-active]');
    if (activeElement) {
      activeElement.click();
    }
  }

  _getIndex(controlElement) {
    return parseInt(controlElement.dataset.index, 10);
  }

  _setListeners() {
    this._clickHandler = this._clickHandler.bind(this);

    this._togglerWrapperElement.addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    const currentToggleElement = evt.target;

    if (currentToggleElement.tagName.toLowerCase() !== 'button') {
      return;
    }

    this._togglerElements.forEach((element) => {
      if (element === currentToggleElement) {
        element.classList.add(ACTIVE_TOGGLER_CLASSNAME);
        this._emit(this._getIndex(element));
      } else {
        element.classList.remove(ACTIVE_TOGGLER_CLASSNAME);
      }
    });
  }

  _emit(detail) {
    this._togglerWrapperElement.dispatchEvent(new CustomEvent('toggle', { detail }));
  }
}
