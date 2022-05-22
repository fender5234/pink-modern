// PixelPerfect
const Breakpoint = {
  MOBILE: 320,
  TABLET: 660,
  DESKTOP: 980
};

window.pinegladePP = {
  breakpoints: Object.values(Breakpoint),
  selector: '.viewport--page'
};

// Делаем редактируемым контент по нажатию E
document.querySelectorAll('h1, h2, h3, p, b, a, button, label, legend').forEach((element) => {
  element.spellcheck = false;
});

document.addEventListener('keydown', (evt) => {
  if (evt.key.toLowerCase() === 'e') {
    document.body.contentEditable = document.body.contentEditable !== 'true';
  }
});
