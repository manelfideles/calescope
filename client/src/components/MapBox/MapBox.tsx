import { useMemo, useState } from 'react';
import { Map as ReactMapBox, Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import bbox from '@turf/bbox';

import { useConfig, useCounts, useClickedCounty } from '../../hooks';

import { sources } from './utils';

import {
  atmIcon,
  publicTransportsIcon,
  restaurantIcon,
  gasStationIcon,
  bikeIcon,
  healthcareIcon,
  parkingIcon,
  mallIcon,
  houseIcon,
  bookIcon,
} from '../../assets/icons';

import styles from './MapBox.module.scss';

const categoryIcons = {
  'public-transportation': [publicTransportsIcon, '#ff0000'],
  'leisure/tourism': [bikeIcon, '#ffa500'],
  shopping: [mallIcon, '8B8000'],
  'food/drinks': [restaurantIcon, '#00ff00'],
  education: [bookIcon, '#0000ff'],
  ATMs: [atmIcon, '#800080'],
  'gas-stations': [gasStationIcon, '#ffc0cb'],
  parking: [parkingIcon, '#a52a2a'],
  healthcare: [healthcareIcon, '#808080'],
};

export const MapBox = () => {
  const { centerPoint, defaultZoom } = useConfig();
  const initialViewState = {
    latitude: centerPoint[0],
    longitude: centerPoint[1],
    zoom: defaultZoom,
  };
  const {
    clickedCounty,
    countyHouses,
    countyPOIs,
    setClickedCounty,
    setBoundingBox,
  } = useClickedCounty();
  const houseCounts = useCounts();
  const [hoveredCounty, setHoveredCounty] = useState('');

  const onClick = (event) => {
    const feature = event.features[0];
    if (feature) {
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      setBoundingBox([
        [minLng, minLat],
        [maxLng + 0.015, maxLat],
      ]);
      setClickedCounty(feature.properties.Freguesia);
    }
  };

  const onHover = (event) => {
    const feature = event.features[0];
    if (feature) setHoveredCounty(feature.properties.Freguesia);
  };

  const highlightCounty = useMemo(
    () => [
      '==',
      'Freguesia',
      clickedCounty === 'Lisboa' ? hoveredCounty : clickedCounty,
    ],
    [hoveredCounty, clickedCounty]
  );

  const housePins = useMemo(
    () =>
      countyHouses?.map(({ lat, long }, index) => (
        <Marker
          key={`marker-${index}`}
          latitude={lat}
          longitude={long}
          anchor='center'
          /* TODO: scroll to house card with id == index */
          onClick={() => console.log(`Casa ${index}`)}
        >
          <img
            src={houseIcon}
            alt='house-icon'
            style={{
              height: '20px',
              cursor: 'pointer',
              fill: '#000000',
            }}
          />
        </Marker>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clickedCounty]
  );

  const poiPins = useMemo(() => {
    if (clickedCounty !== 'Lisboa') {
      return Object.entries(countyPOIs).map((entry) => {
        const [category, poiArray] = entry;
        return poiArray.map(([long, lat], index) => (
          <Marker
            key={`marker-${index}`}
            latitude={lat}
            longitude={long}
            anchor='center'
            onClick={() =>
              console.log(`${category} #${index}; lat=${lat} long=${long}`)
            }
          >
            <img
              src={categoryIcons[category][0]}
              alt={`${category}-icon`}
              style={{
                cursor: 'pointer',
                fill: `${categoryIcons[category][1]}`,
              }}
            />
          </Marker>
        ));
      });
    }
  }, [clickedCounty, countyPOIs]);

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapContainer}>
        <ReactMapBox
          id='map'
          reuseMaps
          mapboxAccessToken='pk.eyJ1IjoiZmlkZWxlcyIsImEiOiJjbDJoYzJoeGQwNjdvM25vN29tY2k5Y2tsIn0.JuCva4gmqFcpFPI7zQRQ1g'
          initialViewState={initialViewState}
          mapStyle='mapbox://styles/mapbox/light-v9'
          interactiveLayerIds={['houseCountsLayer']}
          onClick={onClick}
          onMouseMove={onHover}
        >
          <Source id='houseCountsLayer' type='geojson' data={houseCounts}>
            <Layer
              {...{
                ...sources.houseCountsLayer,
                paint: {
                  ...sources.houseCountsLayer.paint,
                  'fill-opacity': clickedCounty === 'Lisboa' ? 0.8 : 0.5,
                },
              }}
              filter={['!=', 'Freguesia', clickedCounty]}
            />
            <Layer {...sources.highlightedCounty} filter={highlightCounty} />
          </Source>
          {poiPins}
          {housePins}
        </ReactMapBox>
      </div>
      <span>📍 {clickedCounty}</span>
    </div>
  );
};
