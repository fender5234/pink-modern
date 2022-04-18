import Togglers from './togglers.js';

export default class Slider {
  constructor(sliderElement) {
    this._sliderElement = sliderElement.querySelector('.slider__list, .slider__table');
    this._togglerElement = sliderElement.querySelector('.slider__togglers');
    this._togglerComponent = new Togglers(this._togglerElement);
    this._index = 1;
    this._translateCoeff = 100 / this._togglerComponent.length;

    this._setListeners();

    this._togglerComponent.init();
  }

  _setListeners() {
    this._toggleHandler = this._toggleHandler.bind(this);

    this._togglerElement.addEventListener('toggle', this._toggleHandler);
  }

  _toggleHandler({ detail }) {
    this._index = detail;
    this._slide();
  }

  _slide() {
    this._sliderElement.style.transform = `translateX(-${this._translateCoeff * (this._index - 1)}%)`;
  }
}
