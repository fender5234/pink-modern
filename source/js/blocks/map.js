const SIZE = 36;
const ANCHOR = 18;
const CENTER_LAT = 59.9366;
const MARKER_LAT = 59.93628;
const LNG = 30.321095;
const ZOOM = 16;
const CDN = 'https://unpkg.com/leaflet@1.7.1/dist';
const CSS_CODE = `<link rel="stylesheet" href="${CDN}/leaflet.css">`;
const LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LAYER_COPY = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

let isLoaded = false;

export default class Map {
  constructor(element) {
    this._mapElement = element;

    this._load()
      .then((flag) => {
        isLoaded = flag;
        if (!isLoaded) {
          return;
        }

        this._map = L.map(element).setView({
          lat: CENTER_LAT,
          lng: LNG
        }, ZOOM);

        L.tileLayer(LAYER_URL, { attribution: LAYER_COPY }).addTo(this._map);
        L.marker({
          lat: MARKER_LAT,
          lng: LNG
        }, {
          icon: L.icon({
            iconUrl: 'img/icon-map-marker.svg',
            iconRetinaUrl: 'img/icon-map-marker.svg',
            shadowUrl: 'img/icon-map-marker.svg',
            iconSize: [SIZE, SIZE],
            iconAnchor: [ANCHOR, ANCHOR]
          })
        }).addTo(this._map);
      });
  }

  _load() {
    return new Promise((resolve) => {
      if (isLoaded) {
        resolve(true);
      }

      const jsElement = document.createElement('script');
      jsElement.src = `${CDN}/leaflet.js`;
      jsElement.addEventListener('load', () => {
        document.head.insertAdjacentHTML('beforeend', CSS_CODE);
        resolve(true);
      });
      jsElement.addEventListener('error', () => resolve(false));

      document.body.append(jsElement);
    });
  }
}
