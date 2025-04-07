export const englishTranslation = {
   home: {
      homeTitle: 'AI ECG Arrhythmia Detector',
   },

   inputSelector: {
      wfdbInput: 'WFDB Recording',
      imageInput: 'Image Recording',
      selectInputType: 'Select input type...',
      searchInputTypes: 'Search input types...',
      noInputOptionFound: 'No input option found',
   },

   fileInput: {
      headerFileHeader: 'Upload ECG Recording Header File',
      headerFileDescription:
         'Field accepts a <b>.hea</b> header file specified by WFDB format.',
      dataFileHeader: 'Upload ECG Recording Data File',
      dataFileDescription:
         'Field accepts a <b>.dat</b> data file specified by WFDB format.',
      annotationsFileHeader: 'Upload ECG Recording Annotations File',
      annotationsFileDescription:
         'Field accepts a <b>.xws</b> annotations file specified by WFDB format.',
      detectButton: 'Detect',
      seeSupportedFiles: 'See supported files',
      invalidFileExtension: 'Invalid file extension. See supported extensions.',
      validFileIsRequired: 'A valid file is required.',
   },

   imageInput: {
      imageFileHeader: 'Upload ECG Recording Image File',
      imageFileDescription:
         'Field accepts image files in <b>.png</b> or <b>.jpg</b> formats.',
      samplingRateHeader: 'Set Recording Sampling Rate',
      samplingRateDescription:
         'Sampling rate must be between <b>50</b> and <b>1000 Hz</b>.',
      detectButton: 'Detect',
      seeSupportedFiles: 'See supported files',
      seeSupportedValues: 'See supported values',
      invalidFileExtension: 'Invalid file extension. See supported extensions.',
      invalidSamplingRate: 'Sampling rate must be between 50 and 1000 Hz.',
      validFileIsRequired: 'A valid file is required.',
   },

   languageSelector: {
      selectLanguage: 'Select language...',
      searchLanguage: 'Search languages...',
      noLanguagesFound: 'No languages found',
   },
};
