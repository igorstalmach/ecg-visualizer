import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  inputType: string;
  setInputType: (inputType: string) => void;

  language: string;
  setLanguage: (language: string) => void;
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        inputType: "",
        setInputType: (inputType) => set({ inputType }),

        language: "english",
        setLanguage: (language) => set({ language }),
      }),
      {
        name: "bear-storage",
      },
    ),
  ),
);
