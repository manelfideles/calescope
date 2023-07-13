import { groupBy, map, omit, pick, uniq, uniqBy } from 'lodash';
import {
  AreaSeriesPoint,
  FlexibleXYPlot,
  Highlight,
  HorizontalGridLines,
  LineMarkSeries,
  XAxis,
  YAxis,
} from 'react-vis';

interface AreaChartProps {
  data?: (any[] | AreaSeriesPoint)[];
  seriesColor: any;
}

export const AreaChart = ({ data, seriesColor }: AreaChartProps) => {
  const dataByLocation = Object.entries(groupBy(data, 'location_id')).map(
    (elem) => ({
      locationId: Number(elem[0]),
      variable: uniqBy(
        elem[1].map((elem) =>
          pick(elem, ['measured_variable_id', 'variable_name'])
        ),
        'measured_variable_id'
      ),
      values: elem[1],
      color:
        seriesColor.filter(
          (colors: any) => colors.locationId === Number(elem[0])
        )[0]?.color ?? 'black',
      isVisible: seriesColor.filter(
        (colors: any) => colors.locationId === Number(elem[0])
      )[0]?.isVisible,
    })
  );
  return (
    <FlexibleXYPlot width={425} height={250}>
      <HorizontalGridLines />
      <YAxis style={{ fontSize: '90%' }} title='Altitude (m)' />
      <XAxis
        style={{ fontSize: '90%' }}
        tickFormat={(v) => v.toFixed(2)}
        tickTotal={5}
        title='Temperature (ºC)'
      />
      {dataByLocation.map((locationData) => (
        <LineMarkSeries
          data={locationData.values}
          opacity={locationData.isVisible ? 0.5 : 0.2}
          color={locationData.isVisible ? locationData.color : 'lightgray'}
        />
      ))}
      <Highlight
        onBrushEnd={(area: any) => console.log('onBrushEnd:', { area })}
        onDrag={(area: any) => console.log('onDrag:', { area })}
      />
    </FlexibleXYPlot>
  );
};
