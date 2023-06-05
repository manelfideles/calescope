import { useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Source, Layer } from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import type { GeoJSONSource } from 'react-map-gl';
import { mapboxConfig } from '../../utils/mapbox-config';
import { sources } from '../../utils/mapbox-sources';

export const MapBox = () => {
  const { MAPBOX_TOKEN, centerPoint, defaultZoom } = mapboxConfig;
  const { clusterLayer, clusterCountLayer, unclusteredPointLayer } = sources;
  const initialViewState = {
    latitude: centerPoint[0],
    longitude: centerPoint[1],
    zoom: defaultZoom,
  };

  const mapRef = useRef<MapRef>(null);

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    const clusterId = feature?.properties!.cluster_id;

    const mapboxSource = mapRef?.current!.getSource(
      'earthquakes'
    ) as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !mapRef) return;
      mapRef.current!.easeTo({
        center: [-9.13333, 38.7267],
        zoom,
        duration: 500,
      });
    });
  };

  const mapStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    zIndex: -1,
  };

  return (
    <div style={mapStyle}>
      <Map
        initialViewState={initialViewState}
        mapStyle='mapbox://styles/mapbox/light-v9'
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id!]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id='earthquakes'
          type='geojson'
          data='https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </div>
  );
};
