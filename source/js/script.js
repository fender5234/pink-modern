import Slider from './blocks/slider.js';
import PageHeader from './blocks/page-header.js';
import Add from './blocks/add.js';

const setupBlocks = (selector, Block) => {
  document.querySelectorAll(selector).forEach((element) => new Block(element));
};

setupBlocks('.slider', Slider);
setupBlocks('.page-header', PageHeader);
setupBlocks('.add', Add);
