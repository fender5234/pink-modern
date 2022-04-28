export default class PageHeader {
  constructor(pageHeaderElement) {
    this._pageHeaderElement = pageHeaderElement;
    this._togglerElement = pageHeaderElement.querySelector('.page-header__toggler');
    this._navElement = pageHeaderElement.querySelector('.page-header__nav');

    this._setListeners();

    this._pageHeaderElement.classList.add('page-header--js');
  }

  _setListeners() {
    this._clickHandler = this._clickHandler.bind(this);

    this._togglerElement.addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    if (!this._pageHeaderElement.classList.contains('page-header--opened')) {
      this._pageHeaderElement.classList.add('page-header--opened');
      this._pageHeaderElement.classList.remove('page-header--closed');
    } else {
      this._pageHeaderElement.classList.remove('page-header--opened');
      this._pageHeaderElement.classList.add('page-header--closed');
    }

    const expanded = this._togglerElement.getAttribute('aria-expanded');
    this._togglerElement.setAttribute('aria-expanded', expanded !== 'true');
  }
}
