import { FileInput } from "@/components/FileInput/FileInput";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-4xl m-8">AI ECG Arrhythmia Detector</h1>
      <FileInput />
    </div>
  );
}
