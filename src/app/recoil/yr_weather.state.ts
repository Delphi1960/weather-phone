// import {differenceInMinutes} from 'date-fns';
import {atom} from 'recoil';
import {DailyValue} from '../types/daily_value.type';
import {DataHourly} from '../types/datahourly.type';

import {YrWeather} from '../types/yr_weather.type';
// import {AsyncStorageManager} from '../utils/asyncStorage';

// import { LocalStorageManager } from '../utils'

// function getDefaultWeatherState() {
//   const weather = AsyncStorageManager.getItem('weather');
//   const lastUpdated = AsyncStorageManager.getItem('lastUpdated');
//   // console.log('w=',weather);
//   if (
//     lastUpdated !== null &&
//     // coordOk &&
//     differenceInMinutes(Date.now(), lastUpdated) < 60
//   ) {
//     return weather;
//   }
//   return null;
// }

export const yrWeatherState = atom<YrWeather | null>({
  key: 'yrWeatherState',
  // default: getDefaultWeatherState(),

  default: null,
});

export const coordLocation = atom({
  key: 'coordLocation',
  default: 'lat=46.4196&lon=30.7596&altitude=42',
  // LocalStorageManager.getItem("coord") ??

  // default: "lat=46.4725&lon=30.74136&altitude=42",
});

export const dataHourlyForecast = atom<DataHourly[][]>({
  key: 'dataHourlyForecast',
  default: [
    [
      {
        UTC: '',
        time: '',
        icon: '',
        air_temperature: 0,
        cloud_area_fraction: 0,
        pricip: 0,
        wind_speed: 0,
        wind_from_direction: 0,
        relative_humidity: 0,
        air_pressure_at_sea_level: 0,
      },
    ],
  ],
});
export const dailyValueState = atom<DailyValue>({
  key: 'dailyValueState',
  default: {
    minDayTemp: [],
    maxDayTemp: [],
    maxDayWind: [],
    averageHumidity: [],
    maxDayPrecip: [],
    averagePres: [],
    averageWindDir: [],
    cloudiness: [],
  },
});
