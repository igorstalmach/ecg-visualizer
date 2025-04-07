import { useBearStore } from "@/hooks/useStore";
import { polishTranslation } from "@/language/polishTranslation";
import { englishTranslation } from "@/language/englishTranslation";

export const useTranslation = () => {
  const language = useBearStore((state) => state.language);

  if (language === "polish") {
    return polishTranslation;
  } else {
    return englishTranslation;
  }
};
