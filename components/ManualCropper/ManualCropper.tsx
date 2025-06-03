'use client';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import React, { useEffect, useRef, useState } from 'react';

interface Point {
   x: number;
   y: number;
}

interface Props {
   imageFile: File;
   onCropDoneAction: (file: File) => void;
}

export const ManualCropper = ({ imageFile, onCropDoneAction }: Props) => {
   const translation = useTranslation();

   const imgRef = useRef<HTMLImageElement | null>(null);
   const overlayRef = useRef<HTMLDivElement | null>(null);

   const [imageSrc, setImageSrc] = useState<string>();
   const [startPos, setStartPos] = useState<Point | null>(null);
   const [endPos, setEndPos] = useState<Point | null>(null);
   const [isDragging, setIsDragging] = useState(false);

   useEffect(() => {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(imageFile);
   }, [imageFile]);

   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== overlayRef.current) {
         return;
      }
      const rect = overlayRef.current!.getBoundingClientRect();
      setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setEndPos(null);
      setIsDragging(true);
   };

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) {
         return;
      }
      const rect = overlayRef.current!.getBoundingClientRect();
      setEndPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
   };

   const handleMouseUp = () => {
      setIsDragging(false);
   };

   const cropImage = () => {
      if (!imgRef.current || !startPos || !endPos) return;

      const img = imgRef.current;

      // Figure out how the natural bitmap sits inside the <img> element
      // (there may be letter- or pillar-boxing if the aspect ratios
      // differ). We need the visible bitmap’s size and its offset from
      // the <img>’s top-left corner.
      const {
         clientWidth: cw,
         clientHeight: ch,
         naturalWidth: nw,
         naturalHeight: nh,
      } = img;
      const naturalRatio = nw / nh;
      const renderedRatio = cw / ch;

      // Size of the bitmap currently visible in the element
      const visibleW = naturalRatio > renderedRatio ? cw : ch * naturalRatio;
      const visibleH = naturalRatio > renderedRatio ? cw / naturalRatio : ch;

      // Padding around the visible bitmap (black bars)
      const padX = (cw - visibleW) / 2;
      const padY = (ch - visibleH) / 2;

      // Convert the user’s selection (screen-space) into bitmap pixels.
      const scaleX = nw / visibleW;
      const scaleY = nh / visibleH;

      const left = (Math.min(startPos.x, endPos.x) - padX) * scaleX;
      const top = (Math.min(startPos.y, endPos.y) - padY) * scaleY;
      const width = Math.abs(endPos.x - startPos.x) * scaleX;
      const height = Math.abs(endPos.y - startPos.y) * scaleY;

      // Draw that region to a canvas, then hand it back as a File.
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);

      canvas.toBlob((blob) => {
         if (blob) {
            onCropDoneAction(
               new File([blob], imageFile.name, { type: blob.type }),
            );
         }
      }, 'image/jpeg');
   };

   return (
      <div className="w-full h-full overflow-hidden bg-black">
         {imageSrc && (
            <>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                  ref={imgRef}
                  src={imageSrc}
                  alt="Crop target"
                  className="w-full h-full object-contain select-none pointer-events-none"
                  width={window.innerWidth}
               />

               <div
                  ref={overlayRef}
                  className="absolute inset-0 z-10 cursor-crosshair"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
               >
                  {startPos && endPos && (
                     <div
                        className="absolute border-2 border-blue-400 bg-blue-200/30 pointer-events-none"
                        style={{
                           left: `${Math.min(startPos.x, endPos.x)}px`,
                           top: `${Math.min(startPos.y, endPos.y)}px`,
                           width: `${Math.abs(endPos.x - startPos.x)}px`,
                           height: `${Math.abs(endPos.y - startPos.y)}px`,
                        }}
                     />
                  )}
               </div>
            </>
         )}

         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4">
            <Button variant="secondary" onClick={cropImage}>
               {translation.manualCropper.crop}
            </Button>
         </div>
      </div>
   );
};
