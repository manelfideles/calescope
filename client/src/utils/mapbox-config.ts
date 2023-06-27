const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZmlkZWxlcyIsImEiOiJjbDJoYzJoeGQwNjdvM25vN29tY2k5Y2tsIn0.JuCva4gmqFcpFPI7zQRQ1g';

const centerPoint: Array<number> = [40.20564, -8.41955];

const defaultZoom = 9.8;

export const mapboxConfig = {
  MAPBOX_TOKEN,
  centerPoint,
  defaultZoom,
};
