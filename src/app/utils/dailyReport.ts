import {YrWeather} from '../types/yr_weather.type';
import {MathFunc} from './math';

export default function dailyReport(weatherData: YrWeather) {
  const minDayTemp: number[] = [];
  const maxDayTemp: number[] = [];
  const maxDayWind: number[] = [];
  const averageHumidity: number[] = [];
  const maxDayPrecip: number[] = [];
  const averagePres: number[] = [];
  const averageWindDir: number[] = [];
  const cloudiness: number[] = [];
  let temp = [];
  let wind = [];
  let humidity = [];
  let pres = [];
  let precip = 0;
  let cloud = [];
  let windDir = [];

  let dt = new Date(weatherData.properties.timeseries[0].time)
    .toLocaleString('ru-RU')
    .slice(0, 10);

  for (let i = 0; i < weatherData.properties.timeseries.length; i++) {
    //============================================================================

    let dt1 = new Date(weatherData.properties.timeseries[i].time)
      .toLocaleString('ru-RU')
      .slice(0, 10);

    let wDetail = weatherData.properties.timeseries[i].data.instant.details;
    if (dt === dt1) {
      //============================================================================
      // температура
      temp.push(Math.round(wDetail.air_temperature));
      //============================================================================
      // скорость ветра
      wind.push(Math.round(wDetail.wind_speed));
      // направление ветра
      windDir.push(wDetail.wind_from_direction);

      //============================================================================
      // Подсчитаем количество осадков за день
      precip +=
        weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
          ?.precipitation_amount !== undefined
          ? weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
              ?.precipitation_amount
          : weatherData?.properties?.timeseries[i]?.data.next_6_hours?.details
              ?.precipitation_amount;

      //============================================================================
      //относительная влажность
      humidity.push(wDetail.relative_humidity);
      //============================================================================
      // давление
      pres.push(Math.round(wDetail.air_pressure_at_sea_level * 0.75));
      //============================================================================
      // Облачность
      let dayTime = new Date(weatherData.properties.timeseries[i].time)
        .toLocaleString('ru-RU')
        .slice(12, 14);
      if (dayTime > '05' && dayTime < '21') {
        cloud.push(wDetail.cloud_area_fraction);
      } else {
        // Если на сегодня уже ночь и нет данных. Ставим что-нибуть
        cloud.push(wDetail.cloud_area_fraction);
      }
    } else {
      //============================================================================
      // Значения за сутки
      // температура
      minDayTemp.push(MathFunc.min(temp));
      maxDayTemp.push(MathFunc.max(temp));
      //найдем максимумы и минимумы скорости ветра
      maxDayWind.push(MathFunc.max(wind));
      // средняя скорость ветра
      averageWindDir.push(Math.round(MathFunc.mean(windDir)));
      //найдем максимумы количества осадков
      maxDayPrecip.push(precip);
      // средняя влажность
      averageHumidity.push(Math.round(MathFunc.mean(humidity)));
      // среднее давление
      averagePres.push(MathFunc.mean(pres));
      // средняя облачность
      cloudiness.push(Math.round(MathFunc.mean(cloud)));

      // Следующий день
      temp = [];
      wind = [];
      windDir = [];
      humidity = [];
      pres = [];
      cloud = [];
      dt = new Date(weatherData.properties.timeseries[i].time)
        .toLocaleString('ru-RU')
        .slice(0, 10);

      //============================================================================
      // температура
      temp.push(Math.round(wDetail.air_temperature));
      //============================================================================
      // скорость ветра
      wind.push(Math.round(wDetail.wind_speed));
      // направление ветра
      windDir.push(wDetail.wind_from_direction);

      //Подсчитаем количество осадков за день - начало нового дня
      precip = 0;
      precip +=
        weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
          ?.precipitation_amount !== undefined
          ? weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
              ?.precipitation_amount
          : weatherData?.properties?.timeseries[i]?.data.next_6_hours?.details
              ?.precipitation_amount;
      //============================================================================
      //============================================================================
      //относительная влажность
      humidity.push(wDetail.relative_humidity);
      //============================================================================
      // давление
      pres.push(Math.round(wDetail.air_pressure_at_sea_level * 0.75));
      //============================================================================
      // Облачность
      let dayTime = new Date(weatherData.properties.timeseries[i].time)
        .toLocaleString('ru-RU')
        .slice(12, 14);
      if (dayTime > '05' && dayTime < '21') {
        cloud.push(wDetail.cloud_area_fraction);
      } else {
        // Если на сегодня уже ночь и нет данных. Ставим что-нибуть
        cloud.push(wDetail.cloud_area_fraction);
      }
    }
  }
  minDayTemp.push(MathFunc.min(temp));
  maxDayTemp.push(MathFunc.max(temp));
  maxDayWind.push(MathFunc.max(wind));
  averageWindDir.push(Math.round(MathFunc.mean(windDir)));
  averageHumidity.push(Math.round(MathFunc.mean(humidity)));
  averagePres.push(MathFunc.mean(pres));
  cloudiness.push(MathFunc.mean(cloud));

  return {
    minDayTemp,
    maxDayTemp,
    maxDayWind,
    averageWindDir,
    maxDayPrecip,
    averageHumidity,
    averagePres,
    cloudiness,
  };
}
