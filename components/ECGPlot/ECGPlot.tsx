'use client';

import { ChartDims, ECGPlotProps, EventRect } from './types';
import { drawGrid, drawHighlights, drawLeads, drawXAxis } from './utils';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

const EcgChart = ({ data, events, svgContainerRef }: ECGPlotProps) => {
   const scrollContainerRef = useRef<HTMLDivElement | null>(null);

   const [eventRects, setEventRects] = useState<EventRect[]>([]);
   const [dims, setDims] = useState<ChartDims | null>(null);

   useEffect(() => {
      if (!data.length) {
         return;
      }
      const container = svgContainerRef.current;
      if (!container) {
         return;
      }

      // Remove any previous SVG (keep React overlay nodes)
      d3.select(container).selectAll('svg').remove();

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const svgWidth = containerWidth;
      const svgHeight = containerHeight;

      const bandHeight = svgHeight / data.length;

      const svg = d3
         .select(container)
         .append('svg')
         .attr('width', svgWidth)
         .attr('height', svgHeight);

      const margin = { top: 20, right: 0, bottom: 30, left: 60 } as const;
      const innerWidth = svgWidth - margin.left - margin.right;
      const innerHeight = svgHeight - margin.top - margin.bottom;

      const g = svg
         .append('g')
         .attr('transform', `translate(${margin.left},${margin.top})`);

      const maxSamples = d3.max(data, (d) => d.samples.length) ?? 0;
      const xScale = d3
         .scaleLinear()
         .domain([0, maxSamples])
         .range([0, innerWidth]);

      // Draw layers
      drawGrid(g, innerWidth, innerHeight);
      drawHighlights(g, events, xScale, innerHeight);
      drawLeads(g, data, xScale, bandHeight, margin.left);
      drawXAxis(g, xScale, innerHeight);

      // Build overlay rectangles for tooltips
      const rects: EventRect[] = events.map((evt) => {
         const x1 = xScale(Math.min(evt.start, evt.end));
         const x2 = xScale(Math.max(evt.start, evt.end));
         return { x: x1, width: x2 - x1, type: evt.type };
      });

      setEventRects(rects);
      setDims({ margin, innerWidth, innerHeight });

      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
         scrollContainer.scrollLeft = 0;
      }
   }, [data, events]);

   return (
      <div
         ref={scrollContainerRef}
         className="relative w-[calc(100vw-60px)] h-[90vh] overflow-x-scroll overflow-y-scroll"
      >
         <div
            ref={svgContainerRef}
            className="relative w-full min-w-[2000px] h-full min-h-[1000px]"
         />

         {dims && (
            <TooltipProvider delayDuration={150}>
               {eventRects.map((r, idx) => (
                  <Tooltip key={idx}>
                     <TooltipTrigger asChild>
                        <div
                           style={{
                              position: 'absolute',
                              left: dims.margin.left + r.x,
                              top: dims.margin.top,
                              width: r.width,
                              height: dims.innerHeight,
                              cursor: 'help',
                              background: 'rgba(0,0,0,0)',
                           }}
                        />
                     </TooltipTrigger>
                     <TooltipContent>
                        {r.type ? (
                           <span className="capitalize font-medium text-sm">
                              {r.type}
                           </span>
                        ) : (
                           'Event'
                        )}
                     </TooltipContent>
                  </Tooltip>
               ))}
            </TooltipProvider>
         )}
      </div>
   );
};

export default EcgChart;
