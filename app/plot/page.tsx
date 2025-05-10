'use client';

import EcgChart from '@/components/ECGPlot/ECGPlot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBearStore } from '@/hooks/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import {
   ArrowBigLeft,
   ArrowBigLeftDash,
   ArrowBigRight,
   ArrowBigRightDash,
} from 'lucide-react';
import React from 'react';

const EcgPage: React.FC = () => {
   const translation = useTranslation();

   const { startTime, endTime, channels } = useBearStore(
      (state) => state.ecgData,
   );

   return (
      <div>
         <div className="flex justify-center items-center gap-5 mb-3 mt-7">
            <div className="flex gap-2 w-40">
               <Button type="submit">
                  <ArrowBigLeft />
               </Button>
               <Input
                  type="number"
                  placeholder={translation.plot.custom}
                  min={0}
               />
            </div>
            <Button>
               <ArrowBigLeftDash /> {translation.plot.start}
            </Button>
            <Button>
               <ArrowBigLeft /> 15s
            </Button>
            {/*<p>12:00:00 - 12:30:00</p>*/}
            <p>
               {startTime} - {endTime}
            </p>
            <Button>
               15s <ArrowBigRight />
            </Button>
            <Button>
               {translation.plot.end} <ArrowBigRightDash />
            </Button>
            <div className="flex gap-2 w-40">
               <Input
                  type="number"
                  placeholder={translation.plot.custom}
                  min={0}
               />
               <Button type="submit">
                  <ArrowBigRight />
               </Button>
            </div>
         </div>
         <EcgChart data={channels} />
      </div>
   );
};

export default EcgPage;
