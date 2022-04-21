import Slider from './blocks/slider.js';
import PageHeader from './blocks/page-header.js';
import Add from './blocks/add.js';
import Form from './blocks/form.js';
import Viewport from './blocks/viewport.js';
import { setupBlocks } from './common/util.js';

[
  ['.slider', Slider],
  ['.page-header', PageHeader],
  ['.add', Add],
  ['.form', Form],
  ['.viewport[id]', Viewport]
].forEach(setupBlocks);
