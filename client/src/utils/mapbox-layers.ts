import type { LayerProps } from 'react-map-gl';

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
    'circle-color': '#a1a1a1',
    'circle-radius': 10,
  },
};

const selectedLocationLayer: LayerProps = {
  id: 'selected-location',
  type: 'circle',
  source: 'location-measurement-counts',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': 'green',
    'circle-stroke-width': 10,
    'circle-stroke-color': '#c6f6d5',
    'circle-radius': 10,
  },
};

const locationLabels: LayerProps = {
  id: 'location-labels',
  type: 'symbol',
  source: 'location-measurement-counts',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'text-field': '{name}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 10,
    'text-offset': [0, -2.5],
  },
};

export const sources = {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  locationLabels,
  selectedLocationLayer,
};
