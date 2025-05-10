export const polishTranslation = {
   home: {
      homeTitle: 'AI Detektor Arytmii w EKG',
   },

   inputSelector: {
      wfdbInput: 'Nagranie WFDB',
      imageInput: 'Nagranie w postaci obrazu',
      selectInputType: 'Wybierz typ wejścia...',
      searchInputTypes: 'Szukaj typu wejścia...',
      noInputOptionFound: 'Nie znaleziono typu wejścia',
   },

   fileInput: {
      headerFileHeader: 'Załącz plik nagłówkowy nagrania EKG',
      headerFileDescription:
         'Pole akceptuje plik nagłówkowy .hea zgodny z formatem WFDB.',
      dataFileHeader: 'Załącz plik danych nagrania EKG',
      dataFileDescription:
         'Pole akceptuje plik danych .dat zgodny z formatem WFDB.',
      annotationsFileHeader: 'Załącz plik adnotacji nagrania EKG',
      annotationsFileDescription:
         'Pole akceptuje plik adnotacji .xws zgodny z formatem WFDB.',
      detectButton: 'Wykryj',
      seeSupportedFiles: 'Zobacz obsługiwane pliki',
      invalidFileExtension:
         'Nieprawidłowe rozszerzenie pliku. Zobacz obsługiwane rozszerzenia.',
      validFileIsRequired: 'Wymagany jest prawidłowy plik.',
   },

   imageInput: {
      imageFileHeader: 'Załącz plik obrazu nagrania EKG',
      imageFileDescription:
         'Pole akceptuje pliki graficzne w formacie .png lub .jpg.',
      samplingRateHeader: 'Ustaw częstotliwość próbkowania nagrania',
      samplingRateDescription:
         'Częstotliwość próbkowania musi mieścić się w przedziale od 50 do 1000 Hz.',
      detectButton: 'Wykryj',
      seeSupportedFiles: 'Zobacz obsługiwane pliki',
      seeSupportedValues: 'Zobacz obsługiwane wartości',
      invalidFileExtension:
         'Nieprawidłowe rozszerzenie pliku. Zobacz obsługiwane rozszerzenia.',
      invalidSamplingRate:
         'Częstotliwość próbkowania musi mieścić się w przedziale od 50 do 1000 Hz.',
      validFileIsRequired: 'Wymagany jest prawidłowy plik.',
   },

   languageSelector: {
      selectLanguage: 'Wybierz język...',
      searchLanguage: 'Szukaj języka...',
      noLanguagesFound: 'Nie znaleziono języków',
   },

   status: {
      statusHeader: 'Status połączenia z serwerem',
      statusDescription: 'Aplikacja jest połączona z serwerem.',
   },

   plot: {
      start: 'Początek',
      end: 'Koniec',
      custom: 'Niestandardowy',
   },

   messages: {
      parsingError: 'Błąd podczas analizy plików. Spróbuj ponownie później.',
   },
};
