import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WeatherTableRoute from '../components/WeatherForecast/WeatherTableRoute';
import WeatherHourlyRoute from '../components/WeatherForecast/WeatherHourlyRoute';

const Tab = createMaterialBottomTabNavigator();
const NowRoute = () => <WeatherHourlyRoute />;
const TableRoute = () => <WeatherTableRoute />;
export default function Forecast() {
  return (
    <Tab.Navigator
      initialRouteName="NowRoute"
      activeColor="blue"
      inactiveColor="gray"
      barStyle={{
        backgroundColor: 'transparent',
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
        marginLeft: '25%',
      }}>
      <Tab.Screen
        name="NowRoute"
        component={NowRoute}
        options={{
          tabBarLabel: 'По часам',
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
        name="TableRoute"
        component={TableRoute}
        options={{
          tabBarLabel: 'По дням',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="sun-wireless"
              color={color}
              size={26}
            />
          ),
        }}
      />
      {/* <Tab.Screen
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
        /> */}
      {/* <Tab.Screen
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
        /> */}
    </Tab.Navigator>
  );
}
