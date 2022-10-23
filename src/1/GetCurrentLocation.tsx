import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import takeCurrentPosition from './takeCurrentPosition';

type Props = {};

export default function GetCurrentLocation() {
  let location = takeCurrentPosition();
  if (!location)
    return (
      <View style={{flex: 1, marginTop: 50, marginLeft: 20}}>
        <Text>Loading...</Text>
        {/* <Text>{obj}</Text> */}
      </View>
    );

  return (
    <View style={{flex: 1, marginTop: 50, marginLeft: 20}}>
      <Text>Высота:{location.coords.altitude.toFixed(4)}</Text>
      <Text>Широта:{location.coords.latitude.toFixed(4)}</Text>
      <Text>Долгота:{location.coords.longitude.toFixed(4)}</Text>
    </View>
  );
}
