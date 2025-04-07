import React from "react";
import EcgChart, { EcgChannel } from "@/components/ECGPlot/ECGPlot";
import { generateEcgData } from "@/lib/ecgDataGenerator";

const EcgPage: React.FC = () => {
  // 300 samples/beat * 10 beats = 3000 samples => plenty wide
  const baseData = generateEcgData(200, 10);

  // Create 4 leads with slight amplitude/offset differences
  const leads: EcgChannel[] = [
    // Strong negative offset, double amplitude
    { label: "Lead I", samples: baseData.map((v) => v * 2.0 - 1.0) },

    // 1.5 amplitude, offset slightly down
    { label: "Lead II", samples: baseData.map((v) => v * 1.5 - 0.3) },

    // Smaller amplitude, but shifted way up
    { label: "Lead III", samples: baseData.map((v) => v * 0.5 + 1.0) },

    // Inverted wave: negative amplitude + offset
    { label: "Lead V1", samples: baseData.map((v) => -1.5 * v + 0.7) },
  ];

  return (
    <div>
      <EcgChart data={leads} />
    </div>
  );
};

export default EcgPage;
