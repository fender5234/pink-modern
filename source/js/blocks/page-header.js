export default class PageHeader {
  constructor(pageHeaderElement) {
    this._pageHeaderElement = pageHeaderElement;
    this._togglerElement = pageHeaderElement.querySelector('.page-header__toggler');
    this._navElement = pageHeaderElement.querySelector('.page-header__nav');

    const [openTextElement, closeTextElement] = this._togglerElement.querySelectorAll('span');
    this._openTextElement = openTextElement;
    this._closeTextElement = closeTextElement;

    this._setListeners();
  }

  _setListeners() {
    this._clickHandler = this._clickHandler.bind(this);

    this._togglerElement.addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._pageHeaderElement.classList.toggle('page-header--opened');
    this._openTextElement.hidden = !this._openTextElement.hidden;
    this._closeTextElement.hidden = !this._closeTextElement.hidden;
  }
}
