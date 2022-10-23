import {addDays, format, parseISO} from 'date-fns';
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useRecoilValue} from 'recoil';

import {
  dataHourlyForecast,
  yrWeatherState,
} from '../../recoil/yr_weather.state';
import DayDataTable from './DayDataTable';
import Loading from '../load/Loading';

export default function WeatherMainTable() {
  const dayData = useRecoilValue(dataHourlyForecast);
  const weatherData = useRecoilValue(yrWeatherState);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  let sceneMap: any = {};
  let arRoutes: any = [];
  const [routes] = React.useState(arRoutes);

  if (!weatherData) {
    return <Loading />;
  }

  let dat = new Date();

  for (let i = 0; i < 7; i++) {
    let fr = () => <DayDataTable dayData={dayData[i]} />;
    let key = 'key' + i;
    sceneMap[key] = fr;
    arRoutes[i] = {
      key: 'key' + i,
      title: format(parseISO(dayData[i][0].UTC), 'dd MMMM'),
    };

    dat = addDays(dat, 1);
  }

  const renderScene = SceneMap(sceneMap);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {/* <View style={{ justifyContent: "space-between", flex: 1 }}>
        <DayDataTable dayData={dayData} />
      </View> */}
      <TabView
        // renderTabBar={renderTabBar}
        renderTabBar={() => null}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
}
