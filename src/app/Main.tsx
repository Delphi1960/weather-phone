import {IconButton} from '@react-native-material/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilValue} from 'recoil';
import GetCurrentCoordinates from './locations/GetCurrentCoordinates';
import BottomNavigate from './navigation/BottomNavigate';
import {placeLocation} from './recoil/location.state';
import {PlaceLocation} from './types/locations.type';
import {Alert, StyleSheet, View} from 'react-native';
import ModalTester from './locations/ModalTester';

const RootStack = createNativeStackNavigator();

export default function Main() {
  const getPlaceLocation = useRecoilValue(placeLocation);
  const [place, setPlace] = useState<PlaceLocation>(getPlaceLocation);
  // const [visible, setVisible] = useState(false);

  useEffect(() => {
    setPlace(getPlaceLocation);
  }, [getPlaceLocation]);

  const styles = StyleSheet.create({
    left: {marginLeft: -20, flexDirection: 'row'},
    right: {flexDirection: 'row'},
  });

  let foundPlace;
  if (place.sublocality_level_1.length > 1) {
    foundPlace = place.locality + ', ' + place.sublocality_level_1;
  } else {
    foundPlace = place.locality;
  }
  // console.log(foundPlace);
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={foundPlace || 'undeffined'}
        component={BottomNavigate}
        options={props => ({
          // headerLeft: () => (
          //   <View style={styles.left}>
          //     <IconButton
          //       icon={prop => <MaterialCommunityIcons name="menu" {...prop} />}
          //       onPress={() => props.navigation.navigate('DriverMenu')}
          //       color="blue"
          //     />
          //   </View>
          // ),
          headerRight: () => (
            <View style={styles.right}>
              <IconButton
                icon={prop => (
                  <MaterialCommunityIcons
                    name="map-marker-radius-outline"
                    {...prop}
                  />
                )}
                onPress={() =>
                  props.navigation.navigate('GetCurrentCoordinates')
                }
                // color="blue"
              />
              <IconButton
                icon={prop => (
                  <MaterialCommunityIcons
                    name="information-outline"
                    {...prop}
                  />
                )}
                onPress={() =>
                  Alert.alert(
                    'О приложении.',
                    'Погодные данные предоставлены Норвежским метеорологическим институтом. \n' +
                      ' Ссылка для разработчиков https://developer.yr.no/',
                  )
                }
                // color="blue"
              />
              <IconButton
                icon={prop => <MaterialCommunityIcons name="menu" {...prop} />}
                // onPress={() => <ModalTester />}
                onPress={() => props.navigation.navigate('ModalTester')}
                // color="blue"
              />
            </View>
          ),
        })}
      />

      <RootStack.Screen
        name="ModalTester"
        component={ModalTester}
        options={props => ({
          headerRight: () => (
            <IconButton
              icon={prop => <MaterialCommunityIcons name="menu" {...prop} />}
              onPress={() => props.navigation.goBack()}
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
              icon={prop => (
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  {...prop}
                />
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
