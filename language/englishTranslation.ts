export const englishTranslation = {
   home: {
      homeTitle: 'ECG Arrhythmia Detector',
   },

   inputSelector: {
      wfdbInput: 'WFDB Recording',
      imageInput: 'Image Recording',
      selectInputType: 'Select input type...',
      searchInputTypes: 'Search input types...',
      noInputOptionFound: 'No input option found',
   },

   fileInput: {
      headerFileHeader: 'Attach ECG Recording Header File',
      headerFileDescription:
         'Field accepts a .hea header file specified by WFDB format.',
      dataFileHeader: 'Attach ECG Recording Data File',
      dataFileDescription:
         'Field accepts a .dat data file specified by WFDB format.',
      annotationsFileHeader: 'Attach ECG Recording Annotations File',
      annotationsFileDescription:
         'Field accepts a .xws annotations file specified by WFDB format.',
      detectButton: 'Analyze',
      seeSupportedFiles: 'See supported files',
      invalidFileExtension: 'Invalid file extension. See supported extensions.',
      validFileIsRequired: 'A valid file is required.',
      previewRecording: 'Preview full ECG recording',
      previewRecordingDescription:
         'View the entire ECG recording, instead of just the segments with detected arrhythmias.',
   },

   imageInput: {
      imageFileHeader: 'Attach ECG Recording Image File',
      imageFileDescription:
         'Field accepts image files in .png or .jpg formats.',
      samplingRateHeader: 'Set Recording Sampling Rate',
      samplingRateDescription: 'Sampling rate must be between 50 and 1000 Hz.',
      detectButton: 'Analyze',
      seeSupportedFiles: 'See supported files',
      seeSupportedValues: 'See supported values',
      invalidFileExtension: 'Invalid file extension. See supported extensions.',
      invalidSamplingRate: 'Sampling rate must be between 50 and 1000 Hz.',
      validFileIsRequired: 'A valid file is required.',
      cropperModalTitle: 'Select a Lead',
      cropperModalDescription:
         'Use the crop tool to select a single ECG lead from the image. Analysis supports only one lead.',
      previewRecording: 'Preview full ECG recording',
      previewRecordingDescription:
         'View the entire ECG recording, instead of just the segments with detected arrhythmias.',
   },

   languageSelector: {
      selectLanguage: 'Select language...',
      searchLanguage: 'Search languages...',
      noLanguagesFound: 'No languages found',
   },

   status: {
      statusHeader: 'Connection with server',
      statusDescription: 'Application is connected to the server.',
   },

   plot: {
      start: 'Start',
      end: 'End',
      back: 'Back',
      of: ' of ',
      printWindow: 'ecg-analysis',
   },

   messages: {
      parsingError: 'Error parsing the files. Please try again later.',
      noDataFound: 'No arrhythmias detected in the recording',
   },

   manualCropper: {
      cancel: 'Cancel',
      crop: 'Crop and submit',
   },
};
