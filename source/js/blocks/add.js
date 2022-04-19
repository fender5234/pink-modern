export default class Add {
  constructor(containerElement) {
    this._containerElement = containerElement;
    this._formElement = containerElement.querySelector('form');
    this._labelElement = this._formElement.querySelector('.add__file-chooser');
    this._fileELement = this._formElement.querySelector('[type="file"]');
    this._filtersELement = this._formElement.querySelector('.add__filters');
    this._filterTogglerElements = this._formElement.querySelectorAll('.add__filter-toggler');
    this._resetELement = this._formElement.querySelector('[type="reset"]');

    this._defaultBg = this._labelElement.style.backgroundImage;

    this._setListeners();
  }

  _setListeners() {
    this._clickHandler = this._clickHandler.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
    this._resetHandler = this._resetHandler.bind(this);

    this._fileELement.addEventListener('change', this._changeHandler);
    this._filtersELement.addEventListener('click', this._clickHandler);
    this._formElement.addEventListener('reset', this._resetHandler);
  }

  _changeHandler() {
    const [file] = this._fileELement.files;
    this._labelElement.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }

  _clickHandler(evt) {
    if (!evt.target.classList.contains('add__filter-toggler')) {
      return;
    }

    this._filterTogglerElements.forEach((togglerElement) => {
      const filterElement = togglerElement.closest('.add__filter');

      if (togglerElement === evt.target) {
        filterElement.classList.add('add__filter--active');
      } else {
        filterElement.classList.remove('add__filter--active');
      }
    });
  }

  _resetHandler() {
    this._labelElement.style.backgroundImage = this._defaultBg;
  }
}
