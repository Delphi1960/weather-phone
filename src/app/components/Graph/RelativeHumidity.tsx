import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

type Props = {
  dataChart: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
  // day: string;
};

export default function RelativeHumidity({dataChart}: Props) {
  return (
    <View>
      <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'black'}}>
        Относительная влажность, %
      </Text>
      <LineChart
        verticalLabelRotation={dataChart.labels.length > 14 ? 270 : 0}
        data={dataChart}
        width={Dimensions.get('window').width} // from react-native
        height={160}
        // yAxisLabel="$"
        yAxisSuffix=" %"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          // backgroundColor: "#03078c",
          backgroundGradientFrom: '#c6f5fa',
          backgroundGradientTo: '#c6f5fa',
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 0,
        }}
      />
    </View>
  );
}
