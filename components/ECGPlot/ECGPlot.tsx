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

const EcgChart = ({ data, events }: ECGPlotProps) => {
   const svgContainerRef = useRef<HTMLDivElement | null>(null);

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

      const margin = { top: 20, right: 20, bottom: 30, left: 60 } as const;
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
   }, [data, events]);

   return (
      <div
         style={{
            position: 'relative',
            width: '100vw',
            minWidth: '2000px',
            height: '90vh',
            minHeight: '1000px',
            overflowX: 'auto',
            overflowY: 'auto',
         }}
      >
         {/* D3‑owned SVG container */}
         <div
            ref={svgContainerRef}
            style={{ width: '100%', height: '100%', position: 'relative' }}
         />

         {/* React overlay with tooltips */}
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
