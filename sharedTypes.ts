export type ECGChannel = {
   label: string;
   samples: number[];
};

export type ConvertedECGData = {
   startTime: string;
   endTime: string;
   channels: ECGChannel[];
};
