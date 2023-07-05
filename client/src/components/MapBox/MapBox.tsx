import { useRef, useEffect, useCallback, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Source, Layer } from 'react-map-gl';
import type { MapRef, GeoJSONSource } from 'react-map-gl';
import { mapboxConfig } from '../../utils/mapbox-config';
import { sources } from '../../utils/mapbox-layers';
import { useToast } from '@chakra-ui/react';
import { useRPC } from '../../hooks/useRPC';
import { useSelectedLocations } from '../../hooks/useSelectedLocations';
import { interpolationData } from '../../utils/mockData';
import { MapboxInterpolateHeatmapLayer } from 'mapbox-gl-interpolate-heatmap';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { DrawControl } from './DrawControl';

const mapStyle: React.CSSProperties = {
  position: 'absolute',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  zIndex: -1,
};

type SelectedFeature = {
  geometry: { coordinates: number[][]; type: string };
  id: string;
  properties: {};
  type: string;
};

export const MapBox = () => {
  const toast = useToast();
  const [features, setFeatures] = useState<Record<string, SelectedFeature>>({});
  const [isPolygonButtonVisible, setIsPolygonButtonVisible] = useState(true);
  const { MAPBOX_TOKEN, centerPoint, defaultZoom } = mapboxConfig;
  const {
    clusterLayer,
    clusterCountLayer,
    unclusteredPointLayer,
    interpolationLayer,
  } = sources;
  const mapRef = useRef<MapRef>(null);
  const initialViewState = {
    latitude: centerPoint[0],
    longitude: centerPoint[1],
    zoom: defaultZoom,
  };
  const { locations, addLocation } = useSelectedLocations();
  const {
    data: measurementCountPerLocation,
    error,
    isLoading,
  } = useRPC({
    rpcName: 'get_measurement_counts',
    convertToJson: true,
    params: {},
  });

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    const clusterId = feature?.properties!.cluster_id;

    // clicked feature is a cluster
    if (clusterId) {
      const mapboxSource = mapRef?.current!.getSource(
        'location-measurement-counts'
      ) as GeoJSONSource;

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || !mapRef) return;
        mapRef.current!.easeTo({
          // @ts-ignore ts(2339)
          center: feature?.geometry!.coordinates,
          zoom,
          duration: 500,
        });
      });
    }
    // clicked feature is a specific measurement
    else {
      if (feature)
        addLocation(feature?.properties!.name, feature?.properties!.id);
    }
  };

  useEffect(() => {
    const loadingToastId = 'loading-toast';
    if (error)
      toast({
        status: 'error',
        title: `Something went wrong: ${error.message}`,
      });
    if (isLoading && !toast.isActive(loadingToastId))
      toast({
        id: loadingToastId,
        status: 'loading',
        title: 'Loading measurement data',
      });
    else toast.close(loadingToastId);
  }, [isLoading, locations]);

  useEffect(() => {
    console.log(features);
    if (JSON.stringify(features) !== '{}') {
      const aoi = Object.values(features)[0]?.geometry!.coordinates[0].map(
        (coords: any) => ({ lon: coords[0], lat: coords[1] })
      );
      const layer = new MapboxInterpolateHeatmapLayer({
        data: interpolationData,
        id: 'interpolation-layer',
        framebufferFactor: 0.1,
        opacity:
          JSON.stringify(features) === '{}' // || !isInterpolationLayerVisible
            ? 0
            : 0.25,
        aoi,
      });
      mapRef.current?.getMap().addLayer(layer);
      setIsPolygonButtonVisible(false);
    } else if (mapRef.current?.getLayer('interpolation-layer')) {
      mapRef.current?.getMap().removeLayer('interpolation-layer');
      setIsPolygonButtonVisible(true);
    }
  }, [
    JSON.stringify(features),
    mapRef?.current?.getLayer('interpolation-layer'),
  ]);

  const onUpdate = useCallback((ev: any) => {
    setFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };
      for (const f of ev.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  return (
    <div style={mapStyle}>
      <Map
        initialViewState={initialViewState}
        reuseMaps
        renderWorldCopies={false}
        minZoom={2}
        mapStyle='mapbox://styles/mapbox/light-v9'
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id!, unclusteredPointLayer.id!]}
        onClick={onClick}
        ref={mapRef}
        id='map'
      >
        <Source
          id='location-measurement-counts'
          type='geojson'
          data={measurementCountPerLocation}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        <DrawControl
          position='bottom-left'
          displayControlsDefault={false}
          controls={{
            polygon: isPolygonButtonVisible,
            trash: true,
          }}
          // defaultMode='static'
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={() => setFeatures({})}
        />
      </Map>
    </div>
  );
};
