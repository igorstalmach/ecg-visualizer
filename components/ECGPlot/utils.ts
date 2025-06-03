import { ECGChannel, ECGEvent } from '@/sharedTypes';
import * as d3 from 'd3';

/** Draw a checkered grid across (innerWidth × innerHeight). */
export const drawGrid = (
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

/** Render translucent yellow rectangles for every event. */
export const drawHighlights = (
   g: d3.Selection<SVGGElement, unknown, null, undefined>,
   events: ECGEvent[],
   xScale: d3.ScaleLinear<number, number>,
   innerHeight: number,
) => {
   if (!events.length) {
      return;
   }

   const layer = g.append('g').attr('class', 'highlight-layer');

   events.forEach((evt) => {
      const xStart = xScale(Math.min(evt.start, evt.end));
      const xEnd = xScale(Math.max(evt.start, evt.end));
      layer
         .append('rect')
         .attr('x', xStart)
         .attr('y', 0)
         .attr('width', xEnd - xStart)
         .attr('height', innerHeight)
         .attr('fill', 'yellow')
         .attr('opacity', 0.4)
         .attr('pointer-events', 'none'); // let overlay handle hover
   });
};

/** Draw a bottom X‑axis. */
export const drawXAxis = (
   g: d3.Selection<SVGGElement, unknown, null, undefined>,
   xScale: d3.ScaleLinear<number, number>,
   innerHeight: number,
) => {
   const xAxis = d3.axisBottom(xScale).ticks(10);
   g.append('g').attr('transform', `translate(0,${innerHeight})`).call(xAxis);
};

/** Helper to create a Y-scale for each lead (with padding). */
export const createYScale = (samples: number[], bandHeight: number) => {
   const extent = d3.extent(samples) as [number, number];
   const pad = 0.2;
   const [minVal, maxVal] = [extent[0] - pad, extent[1] + pad];
   return d3.scaleLinear().domain([minVal, maxVal]).range([bandHeight, 0]); // invert
};

/** Draw each lead in its own horizontal band. */
export const drawLeads = (
   g: d3.Selection<SVGGElement, unknown, null, undefined>,
   data: ECGChannel[],
   xScale: d3.ScaleLinear<number, number>,
   bandHeight: number,
   marginLeft: number,
) => {
   data.forEach((channel, i) => {
      const offsetY = i * bandHeight;
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

      // lead label
      g.append('text')
         .attr('x', -marginLeft + 5)
         .attr('y', offsetY + bandHeight / 2)
         .attr('dy', '.35em')
         .attr('font-size', 14)
         .attr('fill', 'blue')
         .text(channel.label);
   });
};
