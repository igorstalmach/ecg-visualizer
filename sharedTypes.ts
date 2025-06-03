export type ECGChannel = {
   label: string;
   samples: number[];
};

export type ECGEvent = {
   start: number;
   end: number;
   type: string;
};

export type UnconvertedECGData = {
   crop_idx: number;
   max_crop_idx: number;
   channels: ECGChannel[];
   events: ECGEvent[];
};

export type ConvertedECGData = {
   cropIndex?: number;
   maxCropIndex?: number;
   channels: ECGChannel[];
   events: ECGEvent[];
};
