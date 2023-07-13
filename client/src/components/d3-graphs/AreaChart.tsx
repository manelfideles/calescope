import { groupBy, pick, startCase, uniqBy } from 'lodash';
import { useEffect, useMemo } from 'react';
import {
  AreaSeriesPoint,
  FlexibleXYPlot,
  Highlight,
  HorizontalGridLines,
  LineMarkSeries,
  XAxis,
  YAxis,
} from 'react-vis';
import { MetricSystemUnits } from '../../utils/misc';
import { Tag, TagLeftIcon, TagLabel, Box, Text } from '@chakra-ui/react';
import { BsExclamationLg } from 'react-icons/bs';

interface AreaChartProps {
  data?: (any[] | AreaSeriesPoint)[];
  seriesColor: any;
  selectedVariableId: number;
}

export const AreaChart = ({
  data,
  seriesColor,
  selectedVariableId,
}: AreaChartProps) => {
  const dataByLocation = Object.entries(groupBy(data, 'location_id')).map(
    (elem) => {
      return {
        locationId: Number(elem[0]),
        variable: uniqBy(
          elem[1].map((point) => ({
            ...pick(point, ['measured_variable_id', 'variable_name']),
            values: groupBy(elem[1], 'measured_variable_id')[
              // @ts-ignore
              point.measured_variable_id as unknown as string
            ],
          })),
          'measured_variable_id'
        ),
        color:
          seriesColor.filter(
            (colors: any) => colors.locationId === Number(elem[0])
          )[0]?.color ?? 'black',
        isVisible: seriesColor.filter(
          (colors: any) => colors.locationId === Number(elem[0])
        )[0]?.isVisible,
      };
    }
  );

  const xAxisTitle = useMemo(
    () =>
      startCase(
        data?.filter(
          (elem: any) => elem.measured_variable_id === selectedVariableId
          // @ts-ignore
        )?.[0]?.variable_name
      ),
    [selectedVariableId]
  );

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <>
      {selectedVariableId > 0 ? (
        <FlexibleXYPlot width={425} height={250}>
          <HorizontalGridLines />
          <YAxis style={{ fontSize: '90%' }} title='Altitude (m)' />
          <XAxis
            style={{ fontSize: '90%' }}
            tickFormat={(v) => v.toFixed(2)}
            tickTotal={5}
            title={
              xAxisTitle +
              ` (${
                MetricSystemUnits[
                  xAxisTitle.toLocaleLowerCase() as keyof typeof MetricSystemUnits
                ]
              })`
            }
          />
          {dataByLocation?.map((locationData) => (
            <LineMarkSeries
              // @ts-ignore
              data={
                locationData.variable.filter(
                  (v: any) => v.measured_variable_id === selectedVariableId
                )?.[0]?.values
              }
              opacity={locationData.isVisible ? 0.5 : 0.2}
              color={locationData.isVisible ? locationData.color : 'lightgray'}
            />
          ))}
          <Highlight
            onBrushEnd={(area: any) => console.log('onBrushEnd:', { area })}
            onDrag={(area: any) => console.log('onDrag:', { area })}
          />
        </FlexibleXYPlot>
      ) : (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDir='column'
          gap={2}
          padding={10}
        >
          <Tag colorScheme='red' padding={2}>
            <TagLeftIcon boxSize='1rem' as={BsExclamationLg} />
            <TagLabel textAlign='center'>No variable selected</TagLabel>
          </Tag>
          <Text textAlign='center' padding={2} maxWidth='20rem'>
            Select a variable to see details. <br />
            You can do this by using the <b>dropdown menu</b> above.
          </Text>
        </Box>
      )}
    </>
  );
};
