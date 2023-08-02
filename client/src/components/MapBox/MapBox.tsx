import {
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo,
  SetStateAction,
  Dispatch,
} from 'react';
import { Map, Source, Layer } from 'react-map-gl';
import type { MapRef, GeoJSONSource } from 'react-map-gl';
import { mapboxConfig } from '../../utils/mapbox-config';
import { sources } from '../../utils/mapbox-layers';
import { useToast } from '@chakra-ui/react';
import { useRPC } from '../../hooks/useRPC';
import { useSelectedLocations } from '../../hooks/useSelectedLocations';
import { MapboxInterpolateHeatmapLayer } from 'mapbox-gl-interpolate-heatmap';
import { DrawControl } from './DrawControl';
import { map } from 'lodash';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useSidebarFormValues } from '../../hooks/useSidebarFormValues';

const IDW_LAYER_ID = 'interpolation-layer';

const formatInsertedDate = (date: string) =>
  !date.length ? '' : date.replace('T', ' ').slice(0, 16) + ':00+00';

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

export const MapBox = ({
  selectedVariableId,
}: {
  selectedVariableId: number;
}) => {
  const toast = useToast();
  const [features, setFeatures] = useState<Record<string, SelectedFeature>>({});
  const { MAPBOX_TOKEN, centerPoint, defaultZoom } = mapboxConfig;
  const mapRef = useRef<MapRef>(null);
  const initialViewState = {
    latitude: centerPoint[0],
    longitude: centerPoint[1],
    zoom: defaultZoom,
  };
  const { altitude, time, ...dynamicVariables } = useSidebarFormValues();
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

  // TODO: Como é que lidamos com os valores em falta?
  // Podemos fazer p.e. os controlos do IDW só aparecerem quando é possível aplicá-lo (?)
  const { data: idwData } = useRPC({
    rpcName: 'get_filtered_values',
    convertToJson: false,
    params: {
      min_altitude: altitude.val,
      max_altitude: altitude.val + 1,
      min_timestamp: formatInsertedDate(time.val[0]),
      max_timestamp:
        time.mode === 'value'
          ? formatInsertedDate(time.val[0])
          : formatInsertedDate(time.val[1]),
      variable_ranges: Object.values(dynamicVariables)
        .filter((variable) => variable.id === selectedVariableId)
        .map((variable) => ({
          variable_id: variable.id,
          min_value: -500,
          max_value: 500,
        })),
      // use only the currently selected locations for the IDW calculation
      selected_location_ids: map(locations, 'locationId'),
    },
  });

  const toggleIdwLayerCreation = (layerId: string = IDW_LAYER_ID) => {
    if (JSON.stringify(features) !== '{}') {
      try {
        mapRef.current?.getMap().removeLayer(layerId);
      } catch (error) {
        console.error(error);
      }
      const aoi = Object.values(features)[0]?.geometry!.coordinates[0].map(
        (coords: any) => ({ lon: coords[0], lat: coords[1] })
      );
      const layer = new MapboxInterpolateHeatmapLayer({
        data: idwData?.map(({ x, lat, lon }: any) => ({ val: x, lat, lon })),
        id: layerId,
        framebufferFactor: 0.1,
        opacity: 0.4,
        aoi,
      });
      mapRef.current?.getMap().addLayer(layer);
    } else if (mapRef.current?.getLayer(layerId)) {
      mapRef.current?.getMap().removeLayer(layerId);
    }
  };

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
        addLocation(
          feature?.properties!.name,
          feature?.properties!.id,
          feature?.properties!.color
        );
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
    console.log(
      'idwData: ',
      idwData?.map(({ x, lat, lon }: any) => ({ val: x, lat, lon }))
    );
  }, [idwData]);

  useEffect(
    () => toggleIdwLayerCreation(),
    [JSON.stringify(features), idwData]
  );

  const onUpdate = useCallback(
    (ev: any) => {
      mapRef.current?.getMap().removeLayer('interpolation-layer');
      setFeatures((currFeatures) => {
        const newFeatures: any = { ...currFeatures };
        for (const f of ev.features) {
          newFeatures[f.id] = f;
        }
        return newFeatures;
      });
    },
    [idwData]
  );

  const selectedLocationsFilter = useMemo(
    () => [
      'in',
      ['get', 'id'],
      ['literal', locations.map(({ locationId }) => locationId)],
    ],
    [locations]
  );

  return (
    <div style={mapStyle}>
      <Map
        initialViewState={initialViewState}
        reuseMaps
        renderWorldCopies={false}
        minZoom={2}
        mapStyle='mapbox://styles/mapbox/light-v9'
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[
          sources.clusterLayer.id!,
          sources.unclusteredPointLayer.id!,
          sources.selectedLocationLayer.id!,
        ]}
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
          <Layer {...sources.clusterLayer} />
          <Layer {...sources.clusterCountLayer} />
          <Layer {...sources.unclusteredPointLayer} />
          <Layer {...sources.locationLabels} />
          <Layer
            {...sources.selectedLocationLayer}
            filter={selectedLocationsFilter}
          />
        </Source>
        {locations.length >= 2 && (
          <DrawControl
            position='bottom-left'
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={() => setFeatures({})}
          />
        )}
      </Map>
    </div>
  );
};
