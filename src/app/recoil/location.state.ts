import {atom} from 'recoil';
import {CoordLocation} from '../types/coordLocation.type';
// import {CoordLocation} from '../types/coordLocation.type';
import {PlaceLocation} from '../types/locations.type';

import {AsyncStorageManager} from '../utils';

export const nameLocation = atom({
  key: 'nameLocation',
  default: AsyncStorageManager.getItem('location') ?? 'Одесса',
});

export const placeLocation = atom<PlaceLocation>({
  key: 'placeLocation',
  default: {
    country: '',
    administrative_area_level_1: '',
    administrative_area_level_2: '',
    sublocality_level_1: '',
    locality: '',
    route: '',
    street_number: '',
  },
});

export const coordinatesLocation = atom<CoordLocation>({
  key: 'coordinatesLocation',
  default: {
    //lat=46.4196&lon=30.7596&altitude=42
    latitude: 46.4196,
    longitude: 30.7596,
    altitude: 42,
  },
});
