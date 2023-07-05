import type { LayerProps, HeatmapLayer } from 'react-map-gl';

const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'location-measurement-counts',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      3,
      '#51bbd6',
      5,
      '#f1f075',
      10,
      '#f28cb1',
    ],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
};

const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'location-measurement-counts',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 10,
  },
};

const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'location-measurement-counts',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#a7c0af',
    'circle-radius': 10,
  },
};

export const interpolationLayer: LayerProps = {
  id: 'interpolation-layer',
  type: 'fill',
  paint: {
    'fill-color': ['interpolate', ['linear'], ['get', 'solRad'], 0, 0, 6, 1],
    'fill-opacity': ['interpolate', ['linear'], ['get', 'solRad']],
  },
};

export const sources = {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  interpolationLayer,
};
