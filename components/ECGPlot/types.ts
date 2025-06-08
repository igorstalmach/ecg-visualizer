import { ECGChannel, ECGEvent } from '@/sharedTypes';
import { RefObject } from 'react';

export type ECGPlotProps = {
   data: ECGChannel[];
   events: ECGEvent[];
   svgContainerRef: RefObject<HTMLDivElement | null>;
   graphScale: number;
};

export type EventRect = {
   x: number;
   width: number;
   type?: string;
};

export type ChartDims = {
   margin: { top: number; right: number; bottom: number; left: number };
   innerWidth: number;
   innerHeight: number;
};
