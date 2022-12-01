import {IconButton} from '@react-native-material/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilValue} from 'recoil';
import GetCurrentCoordinates from './locations/GetCurrentCoordinates';
import BottomNavigate from './navigation/BottomNavigate';
import {placeLocation} from './recoil/location.state';
import {PlaceLocation} from './types/locations.type';

const RootStack = createNativeStackNavigator();

export default function Main() {
  const getPlaceLocation = useRecoilValue(placeLocation);
  const [place, setPlace] = useState<PlaceLocation>(getPlaceLocation);
  // const [visible, setVisible] = useState(false);

  useEffect(() => {
    setPlace(getPlaceLocation);
  }, [getPlaceLocation]);

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={
          place.route ||
          place.sublocality_level_1 ||
          place.locality ||
          'undeffined'
        }
        component={BottomNavigate}
        options={props => ({
          headerRight: () => (
            <IconButton
              // eslint-disable-next-line @typescript-eslint/no-shadow
              icon={props => (
                <MaterialCommunityIcons name="map-marker" {...props} />
              )}
              onPress={() => props.navigation.navigate('GetCurrentCoordinates')}
              color="blue"
            />
          ),
        })}
      />

      <RootStack.Screen
        name="GetCurrentCoordinates"
        component={GetCurrentCoordinates}
        options={props => ({
          headerRight: () => (
            <IconButton
              // eslint-disable-next-line @typescript-eslint/no-shadow
              icon={props => (
                <MaterialCommunityIcons name="map-marker" {...props} />
              )}
              onPress={() => props.navigation.goBack()}
              color="blue"
            />
          ),
        })}
      />
    </RootStack.Navigator>
  );
}
