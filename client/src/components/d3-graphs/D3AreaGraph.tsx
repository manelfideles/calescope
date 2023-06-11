import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { D3GraphTemplate } from './D3GraphTemplate';

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

type DataPoint = { x: number; y: number };

type D3AreaGraphProps = {
  width: number;
  height: number;
  data: DataPoint[];
};

export const D3AreaGraph = ({ width, height, data }: D3AreaGraphProps) => {
  // bounds = area inside the graph axis = calculated by substracting the margins
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const [min, max] = d3.extent(data, (d) => d.y);
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, height]);

  const [xMin, xMax] = d3.extent(data, (d) => d.x);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([xMin || 0, xMax || 0])
      .range([0, boundsWidth]);
  }, [data, width]);

  // Render the X and Y axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll('*').remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append('g')
      .attr('transform', 'translate(0,' + boundsHeight + ')')
      .call(xAxisGenerator);
    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append('g').call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const areaBuilder = d3
    .area<DataPoint>()
    .x((d) => xScale(d.x))
    .y1((d) => yScale(d.y))
    .y0(yScale(0));
  const areaPath = areaBuilder(data);

  const lineBuilder = d3
    .line<DataPoint>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));
  const linePath = lineBuilder(data);

  if (!linePath || !areaPath) return null;

  return (
    <D3GraphTemplate
      childStyle={{}}
      graphId='area_chart'
      width={width}
      height={height}
    >
      <path
        d={areaPath}
        opacity={1}
        stroke='none'
        fill='#9a6fb0'
        fillOpacity={0.4}
      />
      <path
        d={linePath}
        opacity={1}
        stroke='#9a6fb0'
        fill='none'
        strokeWidth={2}
      />
    </D3GraphTemplate>
  );
};
