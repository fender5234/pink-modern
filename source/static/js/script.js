import Add from './blocks/add.js';
import Form from './blocks/form.js';
import Map from './blocks/map.js';
import PageHeader from './blocks/page-header.js';
import Slider from './blocks/slider.js';
import Viewport from './blocks/viewport.js';
import { setupBlocks } from './common/util.js';

const titleElement = document.querySelector('title');

const createApp = () => {
  [
    ['.add', Add],
    ['.form', Form],
    ['.map', Map],
    ['.page-header', PageHeader],
    ['.slider', Slider],
    ['.viewport[id]', Viewport]
  ].forEach(setupBlocks);

  document.querySelectorAll('[data-route]').forEach((routerLinkELement) => {
    routerLinkELement.addEventListener('click', (evt) => {
      const { href } = evt.currentTarget;

      if (!href.endsWith('.html')) {
        return;
      }

      evt.preventDefault();
      if (href.endsWith(location.pathname)) {
        return;
      }

      fetch(href)
        .then((res) => {
          if (!res.ok) {
            location = href;
          }

          return res.text();
        })
        .then((html) => {
          const [, template] = html.match(/<body>(.*)<\/body>/s);
          const [, title] = html.match(/<title>(.*)<\/title>/s);
          history.pushState(template, title, href);
          document.body.innerHTML = template;
          titleElement.innerHTML = title;
          createApp();
        })
        .catch(() => {
          location = href;
        });
    });
  });
};

createApp();
