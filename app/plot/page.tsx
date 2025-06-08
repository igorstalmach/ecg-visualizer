'use client';

import EcgChart from '@/components/ECGPlot/ECGPlot';
import { Timeline } from '@/components/Timeline';
import { useBearStore } from '@/hooks/useStore';
import React from 'react';

const EcgPage: React.FC = () => {
   const { ecgData } = useBearStore((state) => state);

   return (
      <>
         <Timeline />
         <EcgChart data={ecgData.channels} events={ecgData.events} />
      </>
   );
};

export default EcgPage;
