import React, {useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {WeatherApi} from './api/weather';
import Loading from './components/load/Loading';
import {astroForecastCount, yrSunriseState} from './recoil/yr_sunrise.state';
import {
  dailyValueState,
  dataHourlyForecast,
  yrWeatherState,
} from './recoil/yr_weather.state';
import {addDays} from 'date-fns';
import hourlyForecast from './utils/hourlyForecast';
import dailyReport from './utils/dailyReport';
import {coordinatesLocation, placeLocation} from './recoil/location.state';
import getPlace from './locations/getPlace';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import FindPlace from './components/load/FindPlace';

type Props = {
  children: React.ReactNode;
};

export default function Bootstrap({children}: Props) {
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const setWeatherData = useSetRecoilState(yrWeatherState);
  // const currentWeather = useRecoilValue(yrWeatherState);
  const setSunriseData = useSetRecoilState(yrSunriseState);

  const dayCount = useRecoilValue(astroForecastCount);

  const setDayData = useSetRecoilState(dataHourlyForecast);
  const setDailyValue = useSetRecoilState(dailyValueState);
  const setPlaceLocation = useSetRecoilState(placeLocation);

  // получим координаты места и отправим в recoil
  const [isCoordLoading, setIsCoordLoading] = useState(true);
  const setCoordLoc = useSetRecoilState(coordinatesLocation);
  const [acces, setAccess] = useState(false);

  async function RequestGetLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Доступ к местоположению',
          message: 'Weather запрашивает доступ к местоположению ',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setAccess(true);
      } else {
        setAccess(false);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    setIsCoordLoading(true);

    RequestGetLocation();
    if (acces) {
      Geolocation.getCurrentPosition(
        position => {
          const {altitude, latitude, longitude} = position.coords;
          setCoordLoc({altitude, latitude, longitude});
          setIsCoordLoading(false);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [acces, setCoordLoc]);

  // возьмем координаты места из recoil
  const coord = useRecoilValue(coordinatesLocation);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsWeatherLoading(true);
      try {
        // Геокодирование
        setPlaceLocation(getPlace(coord.latitude, coord.longitude));

        // Преoбразуем координаты для запроса в формат:
        // 'lat=46.4196&lon=30.7596&altitude=42'
        const coordForWeather = `lat=${coord.latitude.toFixed(
          4,
        )}&lon=${coord.longitude.toFixed(4)}&altitude=${coord.altitude?.toFixed(
          0,
        )}`;
        // console.log(coordForWeather);
        const weather = await WeatherApi.loadWeather(coordForWeather);
        setWeatherData(weather);

        //Расчитаем данные о погоде по дням и по часам и сохраним в рекол,
        // чтобы потом только отображать их без перерасчета
        // В компонентах будем брать
        // const dayData = useRecoilValue(dataHourlyForecast);
        //
        // dayData[i] - прогноз по дням
        // dayData[i][j] - прогноз по дням и по часам для i-го дня
        let dayData = [];
        let dat = new Date();
        for (let i = 0; i < 7; i++) {
          dayData.push(hourlyForecast(weather, dat));

          dat = addDays(dat, 1);
        }
        setDayData(dayData);
        setDailyValue(dailyReport(weather));
        //=================================================================

        const sunrise = await WeatherApi.loadSunrise(coordForWeather, dayCount);
        setSunriseData(sunrise);
      } catch (error) {
        console.log(error);
      } finally {
        setIsWeatherLoading(false);
      }
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    coord,
    // setWeatherData,
    // setSunriseData,
    // dayCount,
    // setDayData,
    // setDailyValue,
  ]);

  if (isCoordLoading) {
    return <FindPlace />;
  }
  if (isWeatherLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
