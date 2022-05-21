// PixelPerfect
const Breakpoint = {
  MOBILE: 320,
  TABLET: 660,
  DESKTOP: 980
};
let selector = '.viewport--page';

if (window.page === 'success') {
  selector = '#success';
} else if (window.page === 'error') {
  selector = '#error';
}

window.pinegladePP = {
  breakpoints: Object.values(Breakpoint),
  selector
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
