'use client';

import { ECG_WFDB_FILES_PARSE_URL } from '@/api';
import EcgChart from '@/components/ECGPlot/ECGPlot';
import { Button } from '@/components/ui/button';
import { useBearStore } from '@/hooks/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import axios from 'axios';
import {
   ArrowBigLeft,
   ArrowBigLeftDash,
   ArrowBigRight,
   ArrowBigRightDash,
   Loader2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const EcgPage: React.FC = () => {
   const translation = useTranslation();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);
   const [uploadProgress, setUploadProgress] = useState(0);
   const [currentIndex, setCurrentIndex] = useState(0);

   const { ecgData, heaFile, datFile, xwsFile, inputType } = useBearStore(
      (state) => state,
   );
   const setECGData = useBearStore((state) => state.setECGData);

   const fetchGraphData = async (cropIndex: number = 0) => {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('hea_file', heaFile!);
      formData.append('dat_file', datFile!);
      formData.append('xws_file', xwsFile!);

      try {
         const response = await axios.post(
            `${ECG_WFDB_FILES_PARSE_URL}?crop_idx=${cropIndex}`,
            formData,
            {
               onUploadProgress: (progressEvent) => {
                  const percent = Math.round(
                     (progressEvent.loaded * 100) / (progressEvent.total || 1),
                  );
                  setUploadProgress(percent);
               },
            },
         );

         if (response.status === 200) {
            setECGData(response.data);
         } else {
            toast.error(translation.messages.parsingError);
         }
      } catch (err) {
         toast.error(translation.messages.parsingError);
         console.error(err);
      } finally {
         setIsLoading(false);
      }
   };

   const moveGraph = (newIndex: number) => {
      setCurrentIndex(newIndex);
      void fetchGraphData(newIndex);
   };

   return (
      <div>
         <div className="flex items-center gap-5 mb-3 mt-7">
            <Button
               disabled={isLoading}
               onClick={() => router.push('/')}
               className="ml-15 z-10"
            >
               {translation.plot.back}
            </Button>
            {inputType === 'wfdb' && (
               <div className="flex grow justify-center items-center gap-5 ml-[-10rem]">
                  <Button
                     disabled={currentIndex === 0 || isLoading}
                     onClick={() => moveGraph(0)}
                  >
                     <ArrowBigLeftDash /> {translation.plot.start}
                  </Button>
                  <Button
                     disabled={currentIndex === 0 || isLoading}
                     onClick={() => moveGraph(currentIndex - 1)}
                  >
                     <ArrowBigLeft />
                  </Button>

                  <p>
                     {ecgData.cropIndex === -1
                        ? currentIndex
                        : ecgData.cropIndex}
                     {translation.plot.of}
                     {ecgData.maxCropIndex}
                  </p>

                  <Button
                     disabled={
                        currentIndex === -1 ||
                        currentIndex === ecgData.maxCropIndex ||
                        isLoading
                     }
                     onClick={() => moveGraph(currentIndex + 1)}
                  >
                     <ArrowBigRight />
                  </Button>
                  <Button
                     disabled={
                        currentIndex === -1 ||
                        currentIndex === ecgData.maxCropIndex ||
                        isLoading
                     }
                     onClick={() => moveGraph(-1)}
                  >
                     {translation.plot.end} <ArrowBigRightDash />
                  </Button>
               </div>
            )}
         </div>

         {isLoading && (
            <div className="absolute flex items-center justify-center h-[90vh] w-full z-50 bg-[rgba(0,0,0,0.2)]">
               <Loader2 className="animate-spin" />
               <span className="pl-3">{uploadProgress}%</span>
            </div>
         )}

         <EcgChart data={ecgData.channels} />
      </div>
   );
};

export default EcgPage;
