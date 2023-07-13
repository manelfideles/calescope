export const convertDataToGeoJson = (
  data: Array<any>,
  propertiesArr: Array<string>
) => {
  return {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: data.map((elem) => ({
      type: 'Feature',
      properties: propertiesArr.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [`${currentValue}`]: elem[currentValue],
        }),
        {}
      ),
      geometry: {
        type: 'Point',
        coordinates: [elem.lon, elem.lat],
      },
    })),
  };
};

export const removeValueRowsWithOneElement = (array: string[][]) =>
  array.filter((elem) => elem.length == 2);

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const DATE_FORMAT = 'yyyy-MM-dd';
