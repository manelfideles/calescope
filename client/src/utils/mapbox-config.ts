const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZmlkZWxlcyIsImEiOiJjbDJoYzJoeGQwNjdvM25vN29tY2k5Y2tsIn0.JuCva4gmqFcpFPI7zQRQ1g';

const centerPoint: Array<number> = [39.7067, -8.3333];

const defaultZoom = 6;

const defaultBbox = [
  [-9.293829, 38.690318],
  [-9.004525, 38.79166],
];

export const mapboxConfig = {
  MAPBOX_TOKEN,
  centerPoint,
  defaultZoom,
  defaultBbox,
};
