export const convertDataToGeoJson = (data: Array<any>) => {
  return {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: data.map((elem) => ({
      type: 'Feature',
      properties: {
        id: elem.id,
        name: elem.name,
        measurementCount: elem.measurementCount,
      },
      geometry: {
        type: 'Point',
        coordinates: [elem.lon, elem.lat],
      },
    })),
  };
};

export const removeValueRowsWithOneElement = (array: string[][]) =>
  array.filter((elem) => elem.length == 2);
