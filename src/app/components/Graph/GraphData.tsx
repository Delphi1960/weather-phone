import {format} from 'date-fns';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import DailyGraphData from '../../utils/DailyGraphData';
import RelativeHumidity from './RelativeHumidity';
import Temperature from './Temperature';
import WindSpeed from './WindSpeed';

type Props = {
  dt: Date;
};

export default function GraphData({dt}: Props) {
  let {labelX, temperature, windSpeed, relativeHumidity, icon} =
    DailyGraphData(dt);
  let dtDayTemperature;
  let dtDayWindSpeed;
  dtDayTemperature = {
    labels: labelX,
    datasets: [{data: temperature}],
    icon: icon,
    labelY: temperature,
    // legend: ["Температура "], // optional
  };
  dtDayWindSpeed = {
    labels: labelX,
    datasets: [{data: windSpeed}],
    // legend: ["Температура "], // optional
  };
  let dtRelativeHumidity = {
    labels: labelX,
    datasets: [{data: relativeHumidity}],
    // legend: ["Температура "], // optional
  };
  let day = format(dt, 'eeee, dd MMMM');
  return (
    <View style={{flex: 1, backgroundColor: '#c6f5fa'}}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'blue',
          fontSize: 16,
        }}>
        {day}
      </Text>
      <Temperature dataChart={dtDayTemperature} />
      <WindSpeed dataChart={dtDayWindSpeed} />
      <RelativeHumidity dataChart={dtRelativeHumidity} />
    </View>
  );
}
