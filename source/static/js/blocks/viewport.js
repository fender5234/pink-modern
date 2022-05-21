import { isEscapeKeyPressed } from '../common/util.js';

const FOCUSABLES = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'textarea:not(:disabled)',
  'select:not(:disabled)',
  '[tabindex]:not([tabindex^="-"])'
].join(', ');

if (/^#[a-z]/.test(window.location.hash)) {
  const openedViewport = document.querySelector(window.location.hash);
  if (openedViewport) {
    document.addEventListener('DOMContentLoaded', () => {
      openedViewport.dispatchEvent(new CustomEvent('open'));
    });
  }
}

export default class Viewport {
  constructor(viewportElement) {
    this._viewportElement = viewportElement;
    this._id = viewportElement.id;
    this._openerElements = document.querySelectorAll(`[href="#${this._id}"]`);
    this._closerElements = viewportElement.querySelectorAll('[href="#"]');
    this._allFocusableElements = this._viewportElement.querySelectorAll(FOCUSABLES);

    this._setListeners();
  }

  _setListeners() {
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._closeKeydownHandler = this._closeKeydownHandler.bind(this);
    this._openHandler = this._openHandler.bind(this);
    this._focusHandler = this._focusHandler.bind(this);

    this._viewportElement.addEventListener('open', this._openHandler);
    this._openerElements.forEach((element) => {
      element.addEventListener('click', this._openHandler);
    });
  }

  _openHandler() {
    document.addEventListener('keydown', this._closeKeydownHandler);
    document.querySelectorAll(FOCUSABLES).forEach((element) => {
      element.addEventListener('focus', this._focusHandler);
    });
    this._closerElements.forEach((element) => {
      element.addEventListener('click', this._closeClickHandler);
    });
  }

  _closeClickHandler() {
    this._close();
  }

  _closeKeydownHandler(evt) {
    if (isEscapeKeyPressed(evt)) {
      evt.preventDefault();

      window.location.href = '#';
      this._close();
    }
  }

  _focusHandler() {
    const viewport = document.activeElement.closest('.viewport');
    if (viewport !== this._viewportElement) {
      this._allFocusableElements[0].focus();
    }
  }

  _close() {
    document.removeEventListener('keydown', this._closeKeydownHandler);
    document.querySelectorAll(FOCUSABLES).forEach((element) => {
      element.removeEventListener('focus', this._focusHandler);
    });
    this._closerElements.forEach((element) => {
      element.removeEventListener('click', this._closeClickHandler);
    });
  }
}
