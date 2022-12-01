import {YrWeather} from '../types/yr_weather.type';
import {format, parseISO} from 'date-fns';
import {DataHourly} from '../types/datahourly.type';

export default function hourlyForecast(weatherData: YrWeather, dat: any) {
  const dataHourlyForecast: DataHourly[] = weatherData?.properties.timeseries
    .filter(item => {
      let dat1 = new Date(item.time);
      return dat1.toLocaleDateString() === dat.toLocaleDateString();
    })
    .map(hourly => ({
      UTC: hourly.time,
      // time: new Date(hourly.time).toLocaleTimeString().slice(0, 5),
      time: format(parseISO(hourly.time), 'HH.00'),

      icon:
        hourly?.data.next_1_hours?.summary?.symbol_code ||
        hourly?.data.next_6_hours?.summary?.symbol_code ||
        hourly?.data.next_12_hours?.summary?.symbol_code ||
        'null1',

      air_temperature: Math.round(hourly.data.instant.details.air_temperature),

      cloud_area_fraction: Math.round(
        hourly.data.instant.details.cloud_area_fraction,
      ),

      pricip:
        hourly?.data.next_1_hours?.details?.precipitation_amount !== undefined
          ? hourly?.data.next_1_hours?.details?.precipitation_amount
          : hourly?.data.next_6_hours?.details?.precipitation_amount,

      wind_speed: Math.round(hourly.data.instant.details.wind_speed),

      wind_from_direction: Math.round(
        hourly.data.instant.details.wind_from_direction,
      ),

      relative_humidity: Math.round(
        hourly.data.instant.details.relative_humidity,
      ),

      air_pressure_at_sea_level: Math.round(
        hourly.data.instant.details.air_pressure_at_sea_level * 0.75,
      ),
    }));

  return dataHourlyForecast;
}
