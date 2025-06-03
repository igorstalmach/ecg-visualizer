import { ECGChannel, ECGEvent } from '@/sharedTypes';

export type ECGPlotProps = {
   data: ECGChannel[];
   events: ECGEvent[];
};

/** Absolute‑pixel rectangle for a single event (used for tooltip triggers). */
export type EventRect = {
   x: number;
   width: number;
   type?: string;
};

/** Chart layout info we need outside the D3 scope. */
export type ChartDims = {
   margin: { top: number; right: number; bottom: number; left: number };
   innerWidth: number;
   innerHeight: number;
};
