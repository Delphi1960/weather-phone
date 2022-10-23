import axios from 'axios';

import {YrSunrise} from '../types/yr_sunrise.type';
import {YrWeather} from '../types/yr_weather.type';

export namespace WeatherApi {
  export async function loadWeather(coord: string): Promise<YrWeather> {
    try {
      const response = await axios.get(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?${coord}`,
        {
          headers: {'User-Agent': 'andrew.m.cherry@gmail.com'},
        },
      );
      const weather = response.data;

      // AsyncStorageManager.setItem("weather", weather);
      // AsyncStorageManager.setItem("lastUpdated", Date.now());
      return weather;
    } catch (error) {
      throw error;
    }
  }

  export async function loadSunrise(
    coord: string,
    dayCount: number,
  ): Promise<YrSunrise[]> {
    const latitudeLongitude = coord.slice(0, coord.indexOf('&altitude'));
    const urls = [];
    const offSet = (new Date().getTimezoneOffset() / 60) * -1; // разница между локальным и всемирным временем
    // console.log(offSet);
    for (let i = 0; i < dayCount; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      let dtAstro = date.toISOString().slice(0, 10);
      const url = `https://api.met.no/weatherapi/sunrise/2.0/.json?${latitudeLongitude}&date=${dtAstro}&offset=+0${offSet}:00`;
      urls.push(url);
    }

    const promises = urls.map(url => axios.get<YrSunrise>(url));
    const result = await Promise.all(promises);

    const astroData = result.map(result => result.data);
    // LocalStorageManager.setItem("astroData", astroData);
    // LocalStorageManager.setItem("lastUpdated", Date.now());
    return astroData;
  }
}
