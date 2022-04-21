const TIMEOUT = 500;
const BOOL_THRESHOLD = 0.5;

// Да или нет?
export const getRandomBool = () => Math.random() > BOOL_THRESHOLD;

// Временная имитация API
export const getData = () => new Promise((resolve) => {
  setTimeout(() => resolve(getRandomBool() ? 'success' : 'error'), TIMEOUT);
});

// Связывает js-компоненты с DOM-элементами
export const setupBlocks = ([selector, BlockClass]) => {
  document.querySelectorAll(selector).forEach((element) => new BlockClass(element));
};

export const isEscapeKeyPressed = (evt) => evt.key === 'Escape';
