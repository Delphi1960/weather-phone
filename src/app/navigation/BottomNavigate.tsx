/* */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MoonDataRoute from '../components/Moon/MoonDataRoute';
import GetCurrentCoordinates from '../locations/GetCurrentCoordinates';
// import WeatherHourlyRoute from '../components/WeatherForecast/WeatherHourlyRoute';
import Forecast from './Forecast';

const Tab = createMaterialBottomTabNavigator();

// const NowRoute = () => <WeatherNow />;
// const NowRoute = () => <WeatherHourlyRoute />;
const MoonRoute = () => <MoonDataRoute />;
// const GraphRoute = () => <GraphDataRoute />;
const CurrentPositionRoute = () => <GetCurrentCoordinates />;
const ForecastRoute = () => <Forecast />;

export default function BottomNavigate() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="ForecastRoute"
        activeColor="blue"
        inactiveColor="gray"
        // eslint-disable-next-line react-native/no-inline-styles
        barStyle={{backgroundColor: 'white'}}>
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
