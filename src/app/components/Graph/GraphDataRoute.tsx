import {addDays, format} from 'date-fns';
import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import WeatherButton from '../../navigation/WeatherButton';
import GraphData from './GraphData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    flexDirection: 'column',
  },
  box: {
    // height: "50%", //set this one
  },
  button_box: {
    // height: "8%", //set this one
    // backgroundColor:"black"
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default function GrarphDataRoute({navigation}: any) {
  // const dayData = useRecoilValue(dataHourlyForecast);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  let sceneMap: any = {};
  let arRoutes: any = [];

  const [routes] = React.useState(arRoutes);

  // if (!dayData) {
  //   return <Loading />;
  // }

  let date = new Date();
  let arDate: Date[] = [];
  for (let i = 0; i < 7; i++) {
    arDate[i] = date;
    date = addDays(date, 1);
  }

  for (let i = 0; i < 7; i++) {
    let fr = () => <GraphData dt={arDate[i]} />;
    let key = 'key' + i;
    sceneMap[key] = fr;
    arRoutes[i] = {
      key: 'key' + i,
      title: format(date, 'dd.MM'),
    };
  }

  const renderScene = SceneMap(sceneMap);
  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={() => null}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
      <WeatherButton navigation={navigation} />
    </View>
  );
}
