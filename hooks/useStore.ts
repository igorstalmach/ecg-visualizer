import { ConvertedECGData, UnconvertedECGData } from '@/sharedTypes';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BearState {
   inputType: string;
   setInputType: (inputType: string) => void;

   heaFile: File | undefined;
   setHeaFile: (heaFile: File) => void;

   datFile: File | undefined;
   setDatFile: (datFile: File) => void;

   xwsFile: File | undefined;
   setXwsFile: (xwsFile: File) => void;

   imageFile: File | undefined;
   setImageFile: (imageFile: File | undefined) => void;

   ecgData: ConvertedECGData;
   setECGData: (ecgData: UnconvertedECGData) => void;

   language: string;
   setLanguage: (language: string) => void;
}

export const useBearStore = create<BearState>()(
   devtools(
      persist(
         (set) => ({
            inputType: '',
            setInputType: (inputType) => set({ inputType }),

            heaFile: undefined,
            setHeaFile: (heaFile) => set({ heaFile }),

            datFile: undefined,
            setDatFile: (datFile) => set({ datFile }),

            xwsFile: undefined,
            setXwsFile: (xwsFile) => set({ xwsFile }),

            imageFile: undefined,
            setImageFile: (imageFile: File | undefined) => set({ imageFile }),

            ecgData: {
               cropIndex: undefined,
               maxCropIndex: undefined,
               channels: [],
               events: [],
            },
            setECGData: (ecgData) =>
               set({
                  ecgData: {
                     cropIndex: ecgData.crop_idx,
                     maxCropIndex: ecgData.max_crop_idx,
                     channels: ecgData.channels,
                     events: ecgData.events,
                  },
               }),

            language: 'english',
            setLanguage: (language) => set({ language }),
         }),
         {
            name: 'bear-storage',
         },
      ),
   ),
);
