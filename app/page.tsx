'use client';

import { FileInput } from '@/components/FileInput';
import { ImageInput } from '@/components/ImageInput';
import { InputSelector } from '@/components/InputSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useBearStore } from '@/hooks/useStore';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
   const inputType = useBearStore((state) => state.inputType);

   const translation = useTranslation();

   return (
      <div className="flex flex-col items-center justify-items-start h-screen">
         <h1 className="font-bold text-4xl mb-8 mt-12">
            {translation.home.homeTitle}
         </h1>

         <InputSelector />

         {inputType === 'wfdb' && <FileInput />}
         {inputType === 'image' && <ImageInput />}

         <LanguageSelector />
      </div>
   );
}
