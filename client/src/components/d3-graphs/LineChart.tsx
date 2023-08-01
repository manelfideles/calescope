import { groupBy, pick, startCase, uniqBy } from 'lodash';
import { useMemo, useState } from 'react';
import {
  AreaSeriesPoint,
  FlexibleXYPlot,
  HorizontalGridLines,
  LineMarkSeries,
  XAxis,
  YAxis,
} from 'react-vis';
import { MetricSystemUnits } from '../../utils/misc';
import { Tag, TagLeftIcon, TagLabel, Box, Text } from '@chakra-ui/react';
import { BsExclamationLg } from 'react-icons/bs';

interface LineChartProps {
  data?: (any[] | AreaSeriesPoint)[];
  seriesColor: any;
  selectedVariableId: number;
}

export const LineChart = ({
  data,
  seriesColor,
  selectedVariableId,
}: LineChartProps) => {
  const processedData = Object.entries(groupBy(data, 'location_id')).map(
    (elem) => {
      return {
        locationId: Number(elem[0]),
        variable: uniqBy(
          elem[1].map((point) => ({
            ...pick(point, ['measured_variable_id', 'variable_name']),
            values: Object.values(
              groupBy(
                groupBy(elem[1], 'measured_variable_id')[
                  // @ts-ignore
                  point.measured_variable_id as unknown as string
                ],
                'measurement_id'
              )
            ),
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
  console.log({ processedData });

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

  const [isHovered, setIsHovered] = useState<{ id: number; hover: boolean }[]>(
    []
  );

  const handleSeriesMouseHover = (id: number, hover: boolean) => {
    setIsHovered((hoveredSeries) => [...hoveredSeries, { id, hover }]);
    // popup with measurement start_date and end_date
    // here˙
  };

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
          {processedData?.map((locationData) =>
            locationData.variable
              .filter(
                (v: any) => v.measured_variable_id === selectedVariableId
              )?.[0]
              ?.values.map((measurements) => {
                return (
                  <LineMarkSeries
                    data={measurements}
                    opacity={
                      /* isHovered.length &&
                      isHovered.filter(
                        // @ts-ignore
                        (hs) => hs.id === measurements[0].measurement_id
                      )[0].hover && */
                      locationData.isVisible ? 0.4 : 0.1
                    }
                    onSeriesMouseOver={() => {
                      console.log(
                        isHovered.filter(
                          // @ts-ignore
                          (hs) => hs.id === measurements[0].measurement_id
                        )[0]
                      );
                      console.log(measurements[0]);
                      handleSeriesMouseHover(
                        // @ts-ignore
                        measurements[0].measurement_id,
                        true
                      );
                    }}
                    onSeriesMouseOut={() =>
                      handleSeriesMouseHover(
                        // @ts-ignore
                        measurements[0].measurement_id,
                        false
                      )
                    }
                    color={
                      locationData.isVisible ? locationData.color : 'lightgray'
                    }
                  />
                );
              })
          )}
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
