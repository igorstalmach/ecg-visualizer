'use client';

import EcgChart from '@/components/ECGPlot/ECGPlot';
import { Timeline } from '@/components/Timeline';
import { useBearStore } from '@/hooks/useStore';
import React, { useRef } from 'react';

const EcgPage: React.FC = () => {
   const svgContainerRef = useRef<HTMLDivElement | null>(null);

   const { ecgData } = useBearStore((state) => state);

   return (
      <>
         <Timeline svgContainerRef={svgContainerRef} />
         <EcgChart
            svgContainerRef={svgContainerRef}
            data={ecgData.channels}
            events={ecgData.events}
         />
      </>
   );
};

export default EcgPage;
