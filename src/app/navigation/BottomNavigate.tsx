/* */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WeatherTableRoute from '../components/WeatherForecast/WeatherTableRoute';
import MoonDataRoute from '../components/Moon/MoonDataRoute';
import GraphDataRoute from '../components/Graph/GraphDataRoute';
import GetCurrentCoordinates from '../locations/GetCurrentCoordinates';
import WeatherHourlyRoute from '../components/WeatherForecast/WeatherHourlyRoute';

const Tab = createMaterialBottomTabNavigator();

// const NowRoute = () => <WeatherNow />;
const NowRoute = () => <WeatherHourlyRoute />;
const MoonRoute = () => <MoonDataRoute />;
const GraphRoute = () => <GraphDataRoute />;
const CurrentPositionRoute = () => <GetCurrentCoordinates />;
// const ForecastRoute = () => <Forecast />;

export default function BottomNavigate() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="NowRoute"
        activeColor="blue"
        inactiveColor="gray"
        // eslint-disable-next-line react-native/no-inline-styles
        barStyle={{backgroundColor: 'white'}}>
        <Tab.Screen
          name="NowRoute"
          component={NowRoute}
          options={{
            tabBarLabel: 'Сегодня',
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
          name="ForecastRoute"
          component={WeatherTableRoute}
          options={{
            tabBarLabel: 'Прогноз',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="sun-wireless"
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
            tabBarLabel: 'Фазы Луны',
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
          name="Graph"
          component={GraphRoute}
          options={{
            tabBarLabel: 'Графики',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="chart-bell-curve"
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
