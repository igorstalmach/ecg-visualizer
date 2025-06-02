'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Point {
   x: number;
   y: number;
}

interface ManualCropperProps {
   imageFile: File;
   onCropDoneAction: (file: File) => void;
}

export const ManualCropper = ({
   imageFile,
   onCropDoneAction,
}: ManualCropperProps) => {
   const [imageSrc, setImageSrc] = useState<string | null>(null);
   const imgRef = useRef<HTMLImageElement | null>(null);
   const overlayRef = useRef<HTMLDivElement | null>(null);
   const [startPos, setStartPos] = useState<Point | null>(null);
   const [endPos, setEndPos] = useState<Point | null>(null);
   const [isDragging, setIsDragging] = useState(false);

   useEffect(() => {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(imageFile);
   }, [imageFile]);

   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== overlayRef.current) return;

      const rect = overlayRef.current!.getBoundingClientRect();
      setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setEndPos(null);
      setIsDragging(true);
   };

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const rect = overlayRef.current!.getBoundingClientRect();
      setEndPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
   };

   const handleMouseUp = () => {
      setIsDragging(false);
   };

   const cropImage = () => {
      if (!imgRef.current || !startPos || !endPos) return;

      const img = imgRef.current;
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      const x = Math.min(startPos.x, endPos.x) * scaleX;
      const y = Math.min(startPos.y, endPos.y) * scaleY;
      const width = Math.abs(endPos.x - startPos.x) * scaleX;
      const height = Math.abs(endPos.y - startPos.y) * scaleY;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      canvas.toBlob((blob) => {
         if (blob) {
            const croppedFile = new File([blob], imageFile.name, {
               type: blob.type,
            });
            onCropDoneAction(croppedFile);
         }
      }, 'image/jpeg');
   };

   return (
      <div className="w-full h-full relative overflow-hidden bg-black">
         {imageSrc && (
            <>
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
            <button
               className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-100"
               onClick={cropImage}
            >
               Crop & Submit
            </button>
         </div>
      </div>
   );
};
