import { RefObject } from 'react';

export type TimelineProps = {
   graphScale: number;
   setGraphScale: (scale: number) => void;
   svgContainerRef: RefObject<HTMLDivElement | null>;
};
