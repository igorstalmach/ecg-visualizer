'use client';

import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

export interface EcgChannel {
   label: string;
   samples: number[];
}

interface EcgChartProps {
   data: EcgChannel[];
}

const EcgChart = ({ data }: EcgChartProps) => {
   const containerRef = useRef<HTMLDivElement | null>(null);

   /**
    * Draw a checkered grid across (innerWidth x innerHeight).
    */
   const drawGrid = (
      g: d3.Selection<SVGGElement, unknown, null, undefined>,
      innerWidth: number,
      innerHeight: number,
   ) => {
      const minorSpacing = 10;
      const majorSpacing = 50;

      for (let x = 0; x <= innerWidth; x += minorSpacing) {
         const isMajor = x % majorSpacing === 0;
         g.append('line')
            .attr('x1', x)
            .attr('y1', 0)
            .attr('x2', x)
            .attr('y2', innerHeight)
            .attr('stroke', '#b71c1c')
            .attr('stroke-width', isMajor ? 1 : 0.5)
            .attr('opacity', isMajor ? 0.4 : 0.2);
      }

      for (let y = 0; y <= innerHeight; y += minorSpacing) {
         const isMajor = y % majorSpacing === 0;
         g.append('line')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', innerWidth)
            .attr('y2', y)
            .attr('stroke', '#b71c1c')
            .attr('stroke-width', isMajor ? 1 : 0.5)
            .attr('opacity', isMajor ? 0.4 : 0.2);
      }
   };

   /**
    * Draw each lead in a separate horizontal band.
    */
   const drawLeads = (
      g: d3.Selection<SVGGElement, unknown, null, undefined>,
      data: EcgChannel[],
      xScale: d3.ScaleLinear<number, number>,
      bandHeight: number,
      marginLeft: number,
   ) => {
      data.forEach((channel, i) => {
         const offsetY = i * bandHeight;
         // local Y-scale for amplitude
         const yScale = createYScale(channel.samples, bandHeight);

         const lineGen = d3
            .line<number>()
            .x((_, idx) => xScale(idx))
            .y((val) => yScale(val) + offsetY)
            .curve(d3.curveBasis);

         g.append('path')
            .datum(channel.samples)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('d', lineGen);

         // label
         g.append('text')
            .attr('x', -marginLeft + 5)
            .attr('y', offsetY + bandHeight / 2)
            .attr('dy', '.35em')
            .attr('font-size', 14)
            .attr('fill', 'blue')
            .text(channel.label);
      });
   };

   /**
    * Draw a bottom X-axis.
    */
   const drawXAxis = (
      g: d3.Selection<SVGGElement, unknown, null, undefined>,
      xScale: d3.ScaleLinear<number, number>,
      innerHeight: number,
   ) => {
      const xAxis = d3.axisBottom(xScale).ticks(10);
      g.append('g')
         .attr('transform', `translate(0,${innerHeight})`)
         .call(xAxis);
   };

   /**
    * Helper to create a Y-scale for each lead,
    * with amplitude padding so wave isn't clipped.
    */
   const createYScale = (samples: number[], bandHeight: number) => {
      const extent = d3.extent(samples) as [number, number];
      const pad = 0.2;
      const [minVal, maxVal] = [extent[0] - pad, extent[1] + pad];
      return d3.scaleLinear().domain([minVal, maxVal]).range([bandHeight, 0]); // invert
   };

   useEffect(() => {
      if (!data || data.length === 0) {
         return;
      }

      const container = containerRef.current;

      if (!container) {
         return;
      }

      // Clear old content
      d3.select(container).selectAll('*').remove();

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const svgWidth = containerWidth * 2;
      const svgHeight = containerHeight;

      // Assume 4 leads => each is svgHeight / 4
      // (if data.length != 4, then do totalHeight / data.length)
      const leadCount = data.length;
      const bandHeight = svgHeight / leadCount;

      // Create the SVG inline here
      const svg = d3
         .select(container)
         .append('svg')
         .attr('width', svgWidth)
         .attr('height', svgHeight);

      // Margins around the plot area
      const margin = {
         top: 20,
         right: 20,
         bottom: 30,
         left: 60,
      };
      const innerWidth = svgWidth - margin.left - margin.right;
      const innerHeight = svgHeight - margin.top - margin.bottom;

      // Main chart group
      const g = svg
         .append('g')
         .attr('transform', `translate(${margin.left},${margin.top})`);

      // X-scale domain from [0..max samples]
      const maxSamples = d3.max(data, (d) => d.samples.length) ?? 0;
      const xScale = d3
         .scaleLinear()
         .domain([0, maxSamples])
         .range([0, innerWidth]);

      drawGrid(g, innerWidth, innerHeight);
      drawLeads(g, data, xScale, bandHeight, margin.left);
      drawXAxis(g, xScale, innerHeight);
   }, [data]);

   return (
      <div
         ref={containerRef}
         style={{
            width: '100vw',
            height: '90vh',
            overflowX: 'auto',
            overflowY: 'hidden',
         }}
      />
   );
};

export default EcgChart;
