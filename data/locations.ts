// This file simulates a geocoding service by providing a static map
// of location names to their latitude and longitude coordinates.

export const LOCATION_COORDINATES: Record<string, [number, number]> = {
  // Major Cities
  'Beograd': [44.7866, 20.4489],
  'Novi Sad': [45.2671, 19.8335],
  'Niš': [43.3209, 21.8958],
  'Kragujevac': [44.0167, 20.9167],
  'Subotica': [46.1004, 19.6633],
  'Zrenjanin': [45.3836, 20.3819],
  'Pančevo': [44.8711, 20.6403],
  'Čačak': [43.8914, 20.3494],
  'Kraljevo': [43.7258, 20.6892],
  'Novi Pazar': [43.1367, 20.5122],
  'Smederevo': [44.6628, 20.93],
  'Valjevo': [44.275, 20.1583],
  'Šabac': [44.7575, 19.69],
  'Užice': [43.8569, 19.8481],
  'Irig': [45.0986, 19.8561],
  'Veliko Gradište': [44.7667, 21.5167],

  // Specific addresses from mock listings data/listings.ts
  'Krunska 52, Kalenić, Vračar, Beograd': [44.8016, 20.4761],
  'Braće Ribnikar 10, Grbavica, Novi Sad': [45.2494, 19.8331],
  'Narodnog fronta 50, Liman 3, Novi Sad': [45.2405, 19.8340],
  'Vitezova Karađorđeve zvezde 45, Mirijevo, Zvezdara, Beograd': [44.7891, 20.5284],
  'Glavna 123, Ljubić, Čačak': [43.905, 20.35],
  'Vrdnik, Irig': [45.123, 19.789],
  'Srebrno Jezero, Veliko Gradište': [44.755, 21.493],
};