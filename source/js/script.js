import Add from './blocks/add.js';
import Form from './blocks/form.js';
import Map from './blocks/map.js';
import PageHeader from './blocks/page-header.js';
import Slider from './blocks/slider.js';
import Viewport from './blocks/viewport.js';
import { setupBlocks } from './common/util.js';

[
  ['.add', Add],
  ['.form', Form],
  ['.map', Map],
  ['.page-header', PageHeader],
  ['.slider', Slider],
  ['.viewport[id]', Viewport]
].forEach(setupBlocks);
