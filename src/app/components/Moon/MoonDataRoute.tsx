import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useRecoilValue} from 'recoil';
import {yrSunriseState} from '../../recoil/yr_sunrise.state';

import Loading from '../load/Loading';
import MoonData from './MoonData';

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

export default function MoonDataRoute() {
  const moonData = useRecoilValue(yrSunriseState);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  let sceneMap: any = {};
  let arRoutes: any = [];

  const [routes] = React.useState(arRoutes);

  if (!moonData) {
    return <Loading />;
  }

  for (let i = 0; i < moonData.length; i++) {
    let fr: any;
    fr = () => <MoonData moonData={moonData[i]} />;
    let key = 'key' + i;
    sceneMap[key] = fr;
    arRoutes[i] = {
      key: 'key' + i,
      title: 'key' + i,
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
    </View>
  );
}
