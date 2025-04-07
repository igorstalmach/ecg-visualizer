import { useBearStore } from '@/hooks/useStore';
import { englishTranslation } from '@/language/englishTranslation';
import { polishTranslation } from '@/language/polishTranslation';

export const useTranslation = () => {
   const language = useBearStore((state) => state.language);

   if (language === 'polish') {
      return polishTranslation;
   } else {
      return englishTranslation;
   }
};
