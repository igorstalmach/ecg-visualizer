"use client";

import { useState } from "react";
import { InputSelector } from "@/components/InputSelector";
import { FileInput } from "@/components/FileInput";
import { ImageInput } from "@/components/ImageInput";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-items-start h-screen">
      <h1 className="font-bold text-4xl mb-8 mt-12">
        AI ECG Arrhythmia Detector
      </h1>
      <InputSelector value={value} setValue={setValue} />
      {value === "wfdb" && <FileInput />}
      {value === "image" && <ImageInput />}
    </div>
  );
}
