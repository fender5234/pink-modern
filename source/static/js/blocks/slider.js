import Togglers from './togglers.js';

export default class Slider {
  constructor(sliderElement) {
    this._sliderElement = sliderElement.querySelector('.slider__list, .slider__table');
    this._togglerElement = sliderElement.querySelector('.slider__togglers');
    this._prevElement = sliderElement.querySelector('.slider__ring--prev');
    this._nextElement = sliderElement.querySelector('.slider__ring--next');
    this._togglerComponent = new Togglers(this._togglerElement);
    this._index = 1;
    this._translateCoeff = 100 / this._togglerComponent.length;

    this._setListeners();

    this._togglerComponent.init();
  }

  _setListeners() {
    this._toggleHandler = this._toggleHandler.bind(this);
    this._prevClickHandler = this._prevClickHandler.bind(this);
    this._nextClickHandler = this._nextClickHandler.bind(this);

    this._togglerElement.addEventListener('toggle', this._toggleHandler);

    if (this._prevElement) {
      this._prevElement.addEventListener('click', this._prevClickHandler);
    }
    if (this._nextElement) {
      this._nextElement.addEventListener('click', this._nextClickHandler);
    }
  }

  _toggleHandler({ detail }) {
    this._index = detail;
    this._slide();
  }

  _prevClickHandler() {
    if (this._index <= 1) {
      this._index = this._togglerComponent.length;
    } else {
      this._index--;
    }

    this._slide();
  }

  _nextClickHandler() {
    if (this._index >= this._togglerComponent.length) {
      this._index = 1;
    } else {
      this._index++;
    }

    this._slide();
  }

  _slide() {
    this._sliderElement.style.setProperty('--slide', `translateX(-${this._translateCoeff * (this._index - 1)}%)`);
  }
}
