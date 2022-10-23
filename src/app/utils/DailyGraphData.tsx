import {format, parseISO} from 'date-fns';
import {useRecoilValue} from 'recoil';

import {yrWeatherState} from '../recoil/yr_weather.state';

export default function DailyGraphData(dtDay: Date) {
  const weatherData = useRecoilValue(yrWeatherState)!;

  // let day;
  let dtChart = format(dtDay, 'dd.MM');
  let labelX: string[] = [];
  let temperature: number[] = [];
  let windSpeed: number[] = [];
  let icon: string[] = [];

  let relativeHumidity: number[] = [];

  for (let i = 0; i < weatherData?.properties.timeseries.length; i++) {
    let dt1 = format(
      parseISO(weatherData?.properties.timeseries[i].time),
      'dd.MM',
    );

    if (dt1 === dtChart) {
      // Температура
      labelX.push(
        format(parseISO(weatherData?.properties.timeseries[i].time), 'HH'),
      );
      temperature.push(
        Math.round(
          weatherData?.properties.timeseries[i].data.instant.details
            .air_temperature,
        ),
      );
      windSpeed.push(
        Math.round(
          weatherData?.properties.timeseries[i].data.instant.details.wind_speed,
        ),
      );
      relativeHumidity.push(
        Math.round(
          weatherData?.properties.timeseries[i].data.instant.details
            .relative_humidity,
        ),
      );
      icon.push(
        weatherData?.properties?.timeseries[i]?.data.next_1_hours?.summary
          ?.symbol_code ||
          weatherData?.properties?.timeseries[i]?.data.next_6_hours?.summary
            ?.symbol_code,
      );
      // day = format(
      //   parseISO(weatherData?.properties.timeseries[i].time),
      //   'dd.MM.RRRR',
      // );
    }
  }

  return {labelX, temperature, windSpeed, relativeHumidity, icon};
}
