import { useMemo } from 'react';
import { bin, scaleLinear, max, extent } from 'd3';
import { D3GraphTemplate } from './D3GraphTemplate';
import { useGraphSlider } from '../../hooks/useGraphSlider';

interface D3HistogramProps {
  data: number[];
  height: number;
  width: number;
}

export const D3Histogram = ({
  data,
  width = 190,
  height = 50,
}: D3HistogramProps) => {
  const { mode, sliderRange, defaultSliderValues, sliderValues } =
    useGraphSlider();
  const x = scaleLinear()
    .domain(extent(data) as [number, number])
    .range([0, width]);
  const bins = bin()
    .domain(x.domain() as [number, number])
    .thresholds(x.ticks(sliderRange?.[1] ?? defaultSliderValues[1]))(data)
    .map((bin) => ({
      ...bin,
      length: bin.length,
      isSelected:
        mode === 'value'
          ? bin.x0! >= sliderValues[0] && bin.x1! <= sliderValues[0] + 1
          : bin.x0! >= sliderValues[0] && bin.x1! <= sliderValues[1],
    }));
  const y = scaleLinear()
    .range([height, 0])
    .domain([0, max(bins, (d) => d.length) as number]);

  const bars = useMemo(
    () =>
      bins.map((bin, idx) => (
        <rect
          key={idx}
          x={x(bin.x0!) + 1}
          y={y(bin.length)}
          width={x(bin.x1!) - x(bin.x0!) - 1}
          height={height - y(bin.length)}
          fill={bin.isSelected ? 'tomato' : 'lightgray'}
          opacity={bin.isSelected ? 1 : 0.5}
        />
      )),
    [bins]
  );

  const graphStyle = {
    marginBottom: '-12px',
  };

  return (
    <D3GraphTemplate
      childStyle={graphStyle}
      graphId='histogram'
      width={width}
      height={height}
    >
      {bars}
    </D3GraphTemplate>
  );
};
