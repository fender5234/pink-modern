import { getData } from '../common/util.js';

export default class Form {
  constructor(formElement) {
    this._formElement = formElement;
    this._submitElement = formElement.querySelector('[type="submit"]');

    this._setListeners();
  }

  _setListeners() {
    this._submitHandler = this._submitHandler.bind(this);

    this._submitElement.addEventListener('click', this._submitHandler);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._submitElement.disabled = true;

    getData().then((res) => {
      const viewportSelector = `#${res}`;
      window.location.href = viewportSelector;
      document.querySelector(viewportSelector).dispatchEvent(new CustomEvent('open'));
      this._submitElement.disabled = false;
    });
  }
}
