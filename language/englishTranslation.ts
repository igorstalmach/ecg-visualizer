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
      headerFileHeader: 'Attach ECG Recording Header File',
      headerFileDescription:
         'Field accepts a .hea header file specified by WFDB format.',
      dataFileHeader: 'Attach ECG Recording Data File',
      dataFileDescription:
         'Field accepts a .dat data file specified by WFDB format.',
      annotationsFileHeader: 'Attach ECG Recording Annotations File',
      annotationsFileDescription:
         'Field accepts a .xws annotations file specified by WFDB format.',
      detectButton: 'Detect',
      seeSupportedFiles: 'See supported files',
      invalidFileExtension: 'Invalid file extension. See supported extensions.',
      validFileIsRequired: 'A valid file is required.',
   },

   imageInput: {
      imageFileHeader: 'Attach ECG Recording Image File',
      imageFileDescription:
         'Field accepts image files in .png or .jpg formats.',
      samplingRateHeader: 'Set Recording Sampling Rate',
      samplingRateDescription: 'Sampling rate must be between 50 and 1000 Hz.',
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

   status: {
      statusHeader: 'Connection with server',
      statusDescription: 'Application is connected to the server.',
   },
};
