'use client';

import EcgChart from '@/components/ECGPlot/ECGPlot';
import { Timeline } from '@/components/Timeline';
import { useBearStore } from '@/hooks/useStore';
import { useRef, useState } from 'react';

export default function ECGPage() {
   const [graphScale, setGraphScale] = useState(1);

   const svgContainerRef = useRef<HTMLDivElement | null>(null);

   const { ecgData } = useBearStore((state) => state);

   return (
      <>
         <Timeline
            graphScale={graphScale}
            setGraphScale={setGraphScale}
            svgContainerRef={svgContainerRef}
         />
         <EcgChart
            graphScale={graphScale}
            svgContainerRef={svgContainerRef}
            data={ecgData.channels}
            events={ecgData.events}
         />
      </>
   );
}
