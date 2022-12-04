import {format, parseISO} from 'date-fns';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useRecoilValue} from 'recoil';
import WeatherButton from '../../navigation/WeatherButton';

import {
  yrWeatherState,
  dataHourlyForecast,
  dailyValueState,
} from '../../recoil/yr_weather.state';
import GetBackground from '../background/GetBackground';
import Loading from '../load/Loading';
import WeatherHourly from './WeatherHourly';

export default function WeatherHourlyRoute({navigation}: any) {
  const weatherData = useRecoilValue(yrWeatherState);
  const dayData = useRecoilValue(dataHourlyForecast);
  const dailyValue = useRecoilValue(dailyValueState);

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
      // <View
      //   style={{
      //     flex: 1,
      //     justifyContent: 'space-between',
      //     alignItems: 'center',
      //     // backgroundColor: 'yellow',
      //   }}>
      <WeatherHourly
        dataDay={format(parseISO(dayData[0][1].UTC), 'eeee, dd MMMM')}
        dataHourly={dayData[0][i]}
        minDayTemp={dailyValue.minDayTemp[0]}
        maxDayTemp={dailyValue.maxDayTemp[0]}
      />
      //   <WeatherButton navigation={navigation} />
      // </View>
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: "center",
      flexDirection: 'column',
      // zIndex: 0,
    },

    background: {
      flex: 1,
      height: '100%',
    },
  });
  return (
    <>
      <ImageBackground
        source={GetBackground(0, dayData[0][1].UTC)}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.container}>
          <TabView
            // renderTabBar={renderTabBar}
            renderTabBar={() => null}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
          />
        </View>
        <WeatherButton navigation={navigation} />
      </ImageBackground>
    </>
  );
}
