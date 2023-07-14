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

export const convertDateToTimestamptz = (date: Date) => {
  let offset: any = -date.getTimezoneOffset() / 60;
  const sign = offset >= 0 ? '+' : '-';
  offset = Math.abs(offset) < 10 ? '0' + offset : offset;
  let TIMESTAMPTZ = date
    .toISOString()
    .replace('T', ' ')
    .replace('Z', `000${sign}${offset}`);
  return TIMESTAMPTZ;
};

export enum MetricSystemUnits {
  humidity = 'g.m^(-3)',
  temperature = 'ºC',
  air_pressure = 'Pa',
}

export enum ImperialSystemUnits {}
