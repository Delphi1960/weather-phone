import {differenceInSeconds, format, parseISO} from 'date-fns';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useRecoilValue} from 'recoil';
import {yrSunriseState} from '../../recoil/yr_sunrise.state';

import {
  yrWeatherState,
  dataHourlyForecast,
  dailyValueState,
} from '../../recoil/yr_weather.state';
import GetBackground from '../background/GetBackground';
import Loading from '../load/Loading';
import WeatherHourly from './WeatherHourly';
import IsItDayOrNight from '../background/IsItDayOrNight';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    flexDirection: 'column',
  },
});

export default function WeatherHourlyRoute() {
  const weatherData = useRecoilValue(yrWeatherState);
  const dayData = useRecoilValue(dataHourlyForecast);
  const dailyValue = useRecoilValue(dailyValueState);

  const astroData = useRecoilValue(yrSunriseState);
  let sunrise;
  let sunset;
  let day = 0;
  let hour = 0;
  let min = 0;
  let sec = 0;

  if (astroData !== null) {
    sunrise = astroData[0].location.time[0].sunrise.time.slice(11, -6);
    sunset = astroData[0].location.time[0].sunset.time.slice(11, -6);
    // Вычислим продолжительность дня
    day = differenceInSeconds(
      new Date(astroData[0].location.time[0].sunset.time),
      new Date(astroData[0].location.time[0].sunrise.time),
    );
    hour = day / 3600;
    let h_toThePoint = Math.trunc(hour); // часы
    let h_afterThePoint = hour - Math.trunc(hour);
    hour = h_toThePoint;

    let m_toThePoint = h_afterThePoint * 60;
    let m_afterThePoint = m_toThePoint - Math.trunc(m_toThePoint);
    min = m_toThePoint;
    let s_afterThePoint = m_afterThePoint * 60;
    sec = s_afterThePoint;
  }
  const dayLength = hour + 'h ' + min.toFixed(0) + 'm ' + sec.toFixed(0) + 's';

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  let sceneMap: any = {};
  let arRoutes: any = [];

  const [routes] = React.useState(arRoutes);

  if (!weatherData) {
    return <Loading />;
  }

  for (let i = 0; i < dayData[0].length; i++) {
    let fr: any;
    fr = () => (
      <WeatherHourly
        dataHourly={dayData[0][i]}
        minDayTemp={dailyValue.minDayTemp[0]}
        maxDayTemp={dailyValue.maxDayTemp[0]}
      />
    );
    let key = 'key' + i;
    sceneMap[key] = fr;
    arRoutes[i] = {
      key: 'key' + i,
      title: dayData[0][i].time,
    };
  }

  const renderScene = SceneMap(sceneMap);
  // TabBar - стилизация
  // const renderTabBar = props => (
  //   <TabBar
  //     {...props}
  //     indicatorStyle={{backgroundColor: 'yellow'}}
  //     style={{backgroundColor: 'navy'}}
  //     scrollEnabled={true}
  //   />
  // );

  const textColor = IsItDayOrNight(dayData[0][1].UTC) ? 'navy' : 'yellow';
  return (
    <>
      <ImageBackground
        source={GetBackground(0, dayData[0][1].UTC)}
        resizeMode="cover"
        style={{
          flex: 1,
          height: '100%',
        }}>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: textColor,
              }}>
              {format(parseISO(dayData[0][1].UTC), 'eeee, dd MMMM')}
            </Text>
          </View>
          <TabView
            // renderTabBar={renderTabBar}
            renderTabBar={() => null}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
          />
          <View
            style={{
              alignItems: 'center',
              // backgroundColor: 'blue',
              flex: 0.09,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: textColor,
              }}>
              Восход - {sunrise} | Заход - {sunset}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: textColor,
              }}>
              Продолжительность дня - {dayLength}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
