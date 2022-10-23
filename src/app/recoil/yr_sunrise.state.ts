import {differenceInMinutes} from 'date-fns';
import {atom} from 'recoil';

import {YrSunrise} from '../types/yr_sunrise.type';
import {AsyncStorageManager} from '../utils';

// import { LocalStorageManager } from '../utils/localStorage';

function getDefaultAstroDataState() {
  const astroData = AsyncStorageManager.getItem('astroData');
  const lastUpdated = AsyncStorageManager.getItem('lastUpdated');
  if (
    lastUpdated !== null &&
    differenceInMinutes(Date.now(), lastUpdated) < 60
  ) {
    return astroData;
  }
  return null;
}

export const yrSunriseState = atom<YrSunrise[] | null>({
  key: 'yrSunriseState',
  // default: null,
  default: getDefaultAstroDataState(),
});

export const astroForecastCount = atom({
  key: 'astroForecastCount',
  default: 30,
});

// export const dataSunrise = atom({
//   key: "dataSunrise",
//   default: "2022-03-19T19:00:00Z",
// });

// 🌒 🌓
