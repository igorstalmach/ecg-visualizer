import { ECG_WFDB_FILES_PARSE_URL } from '@/api';
import { TimelineProps } from '@/components/Timeline/types';
import { Button } from '@/components/ui/button';
import { useBearStore } from '@/hooks/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import { getTimestamp } from '@/utils/getTimestamp';
import axios from 'axios';
import {
   ArrowBigLeft,
   ArrowBigLeftDash,
   ArrowBigRight,
   ArrowBigRightDash,
   Loader2,
   Printer,
   ZoomIn,
   ZoomOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export const Timeline = ({
   svgContainerRef,
   graphScale,
   setGraphScale,
}: TimelineProps) => {
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

   const handlePrint = () => {
      const svgElement = svgContainerRef.current?.querySelector('svg');
      if (!svgElement) {
         return;
      }

      const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

      clonedSvg.removeAttribute('style');
      clonedSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

      if (!clonedSvg.hasAttribute('viewBox')) {
         const width =
            clonedSvg.getAttribute('width') || svgElement.clientWidth;
         const height =
            clonedSvg.getAttribute('height') || svgElement.clientHeight;
         clonedSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      }

      clonedSvg.setAttribute('width', '100%');
      clonedSvg.setAttribute('height', 'auto');

      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
         return;
      }

      const html = `
      <!DOCTYPE html>
      <html>
         <head>
            <title>${translation.plot.printWindow + getTimestamp()}</title>
            <style>
               @page {
                  size: A4 landscape;
                  margin: 0;
               }
               html, body {
                  margin: 0;
                  padding: 0;
                  height: 100%;
                  width: 100%;
               }
               body {
                  display: flex;
                  align-items: center;
                  justify-content: center;
               }
               svg {
                  display: block;
                  width: 100%;
                  height: auto;
                  max-height: 100%;
               }
            </style>
         </head>
         <body>
            ${svgData}
            <script>
               setTimeout(() => {
                  window.print();
                  window.close();
               }, 200);
            </script>
         </body>
      </html>
   `;

      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
   };

   return (
      <>
         <div className="flex items-center gap-5 mb-3 mt-7 z-10">
            <Button
               disabled={isLoading}
               onClick={() => router.push('/')}
               className="ml-15 z-11"
            >
               {translation.plot.back}
            </Button>
            {inputType === 'wfdb' && (
               <div className="flex grow justify-center items-center gap-5">
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
                     {ecgData.cropIndex}
                     {translation.plot.of}
                     {ecgData.maxCropIndex}
                  </p>

                  <Button
                     disabled={
                        currentIndex === ecgData.maxCropIndex || isLoading
                     }
                     onClick={() => moveGraph(currentIndex + 1)}
                  >
                     <ArrowBigRight />
                  </Button>
                  <Button
                     disabled={
                        currentIndex === ecgData.maxCropIndex || isLoading
                     }
                     onClick={() => moveGraph(ecgData.maxCropIndex!)}
                  >
                     {translation.plot.end} <ArrowBigRightDash />
                  </Button>
               </div>
            )}
            <div className="flex justify-center items-center gap-2 mr-15">
               <Button
                  disabled={graphScale === 5 || isLoading}
                  onClick={() => setGraphScale(graphScale + 1)}
               >
                  <ZoomIn />
               </Button>
               <Button
                  disabled={graphScale === 1 || isLoading}
                  onClick={() => setGraphScale(graphScale - 1)}
               >
                  <ZoomOut />
               </Button>
               <Button disabled={isLoading} onClick={handlePrint}>
                  <Printer />
               </Button>
            </div>
         </div>

         {isLoading && (
            <div className="absolute flex items-center justify-center h-[90vh] w-full z-50 bg-[rgba(0,0,0,0.2)]">
               <Loader2 className="animate-spin" />
               <span className="pl-3">{uploadProgress}%</span>
            </div>
         )}
      </>
   );
};
