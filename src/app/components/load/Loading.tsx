import {ActivityIndicator, Stack} from '@react-native-material/core';
import React from 'react';
import {Image} from 'react-native';
import {Text} from 'react-native-paper';
import WeatherIcon from '../../../assets/index.icon';

export default function Loading() {
  return (
    // <>
    //   <View style={{flex: 1, margin: 4, alignItems: 'center'}}>
    //     <Image
    //       style={{width: 100, height: 100}}
    //       source={WeatherIcon.clearsky_day}
    //     />

    <Stack fill center spacing={4}>
      <Image
        style={{width: 100, height: 100}}
        source={WeatherIcon.clearsky_day}
      />
      <Text style={{fontSize: 14, fontWeight: 'bold'}}>Загрузка погоды</Text>
      <ActivityIndicator size="large" />
    </Stack>
    //   </View>
    // </>
  );
}
