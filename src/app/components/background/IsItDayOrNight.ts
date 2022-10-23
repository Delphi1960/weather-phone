import {useRecoilValue} from 'recoil';

import {yrSunriseState} from '../../recoil/yr_sunrise.state';
import {yrWeatherState} from '../../recoil/yr_weather.state';

export default function IsItDayOrNight(time: string) {
  const weatherData = useRecoilValue(yrWeatherState)!;
  const astroData = useRecoilValue(yrSunriseState)!;
  const date = weatherData!.properties.timeseries[0].time;
  let sunrise: string = '';
  let sunset: string = '';

  for (let i = 0; i < astroData.length; i++) {
    if (astroData[i].location.time[0].date === date.slice(0, 10)) {
      sunrise = astroData[i].location.time[0].sunrise.time;
      sunset = astroData[i].location.time[0].sunset.time;
    }
  }

  const dtSunrise = new Date(sunrise).getTime();
  const dtSunset = new Date(sunset).getTime();
  const dtNow = new Date(time).getTime();

  // console.log(dtSunrise, dtSunset,)
  // console.log(dtNow, dtSunset - dtNow)

  if (dtNow >= dtSunrise && dtNow < dtSunset) {
    // console.log("DAY")
    return true;
    // setDayStateNow(true)
  } else {
    // console.log("NIGHT")
    return false;
    // setDayStateNow(false)
  }
}
