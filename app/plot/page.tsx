'use client';

import EcgChart, { EcgChannel } from '@/components/ECGPlot/ECGPlot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { generateEcgData } from '@/utils/ecgDataGenerator';
import {
   ArrowBigLeft,
   ArrowBigLeftDash,
   ArrowBigRight,
   ArrowBigRightDash,
} from 'lucide-react';
import React from 'react';

const EcgPage: React.FC = () => {
   const translation = useTranslation();

   // 300 samples/beat * 10 beats = 3000 samples => plenty wide
   const baseData = generateEcgData(200, 10);

   // Create 4 leads with slight amplitude/offset differences
   const leads: EcgChannel[] = [
      // Strong negative offset, double amplitude
      {
         label: 'Lead I',
         samples: baseData.map((v) => v * 2.0 - 1.0),
      },

      // 1.5 amplitude, offset slightly down
      {
         label: 'Lead II',
         samples: baseData.map((v) => v * 1.5 - 0.3),
      },

      // Smaller amplitude, but shifted way up
      {
         label: 'Lead III',
         samples: baseData.map((v) => v * 0.5 + 1.0),
      },

      // Inverted wave: negative amplitude + offset
      {
         label: 'Lead V1',
         samples: baseData.map((v) => -1.5 * v + 0.7),
      },
   ];

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
            <p>12:00:00 - 12:30:00</p>
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
         <EcgChart data={leads} />
      </div>
   );
};

export default EcgPage;
