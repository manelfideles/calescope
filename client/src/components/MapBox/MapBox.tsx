import { useRef, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Source, Layer } from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import type { GeoJSONSource } from 'react-map-gl';
import { mapboxConfig } from '../../utils/mapbox-config';
import { sources } from '../../utils/mapbox-layers';
import { Badge, useToast } from '@chakra-ui/react';
import { useRPC } from '../../hooks/useRPC';
import { useSelectedLocations } from '../../hooks/useSelectedLocations';

export const MapBox = () => {
  const toast = useToast();
  const { MAPBOX_TOKEN, centerPoint, defaultZoom } = mapboxConfig;
  const { clusterLayer, clusterCountLayer, unclusteredPointLayer } = sources;
  const mapRef = useRef<MapRef>(null);
  const initialViewState = {
    latitude: centerPoint[0],
    longitude: centerPoint[1],
    zoom: defaultZoom,
  };
  const {
    data: measurementCountPerLocation,
    error,
    isLoading,
  } = useRPC({
    rpcName: 'get_measurement_counts',
    params: {},
  });
  const { addLocation } = useSelectedLocations();

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
      if (feature) addLocation(feature?.properties!.id);
    }
  };

  const mapStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    zIndex: -1,
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
  }, [isLoading]);

  const mapComponent = (
    <Map
      initialViewState={initialViewState}
      reuseMaps
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
    </Map>
  );

  return (
    <>
      <div style={mapStyle}>{mapComponent}</div>
      <Badge
        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        fontSize='md'
      >
        {'<'} Portugal {'>'}
      </Badge>
    </>
  );
};
