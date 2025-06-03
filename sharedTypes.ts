export type ECGChannel = {
   label: string;
   samples: number[];
};

export type UnconvertedECGData = {
   crop_idx: number;
   max_crop_idx: number;
   channels: ECGChannel[];
};

export type ConvertedECGData = {
   cropIndex?: number;
   maxCropIndex?: number;
   channels: ECGChannel[];
};
