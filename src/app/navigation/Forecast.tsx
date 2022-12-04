import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherHourlyRoute from '../components/WeatherForecast/WeatherHourlyRoute';
import WeatherTableRoute from '../components/WeatherForecast/WeatherTableRoute';
import GrarphDataRoute from '../components/Graph/GraphDataRoute';

const WeatherStack = createNativeStackNavigator();
export default function Forecast() {
  return (
    <WeatherStack.Navigator screenOptions={{headerShown: false}}>
      <WeatherStack.Screen
        name="WeatherHourlyRoute"
        component={WeatherHourlyRoute}
      />
      <WeatherStack.Screen
        name="WeatherTableRoute"
        component={WeatherTableRoute}
      />
      <WeatherStack.Screen name="GrarphDataRoute" component={GrarphDataRoute} />
    </WeatherStack.Navigator>
  );
}
