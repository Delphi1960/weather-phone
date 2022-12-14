/* */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MoonDataRoute from '../components/Moon/MoonDataRoute';
// import GetCurrentCoordinates from '../locations/GetCurrentCoordinates';
import Forecast from './Forecast';
import {StyleSheet} from 'react-native';
import SelectLocation from '../locations/SelectLocation';

const Tab = createMaterialBottomTabNavigator();

const ForecastRoute = () => <Forecast />;
const MoonRoute = () => <MoonDataRoute />;
const CurrentPositionRoute = () => <SelectLocation />;

const styles = StyleSheet.create({
  buttonPanel: {backgroundColor: 'white'},
});
export default function BottomNavigate() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="ForecastRoute"
        activeColor="blue"
        inactiveColor="gray"
        barStyle={styles.buttonPanel}>
        <Tab.Screen
          name="ForecastRoute"
          component={ForecastRoute}
          options={{
            tabBarLabel: 'Forecast',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="sun-thermometer"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Moon"
          component={MoonRoute}
          options={{
            tabBarLabel: 'Moon phases',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="moon-waxing-crescent"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Location"
          component={CurrentPositionRoute}
          options={{
            tabBarLabel: 'Location',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="map-marker"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
