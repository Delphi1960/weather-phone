import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

type Props = {
  navigation: any;
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    height: 40,
    margin: 5,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    alignSelf: 'center',
  },
  but: {
    margin: 1,
  },
});

export default function WeatherButton({navigation}: Props) {
  return (
    <View style={styles.box}>
      <View style={styles.but}>
        <Button
          icon="weather-cloudy-clock"
          mode="elevated"
          buttonColor="rgb(247, 218, 239)"
          textColor="navy"
          uppercase={false}
          // compact={true}
          onPress={() => navigation.navigate('WeatherHourlyRoute')}>
          Now
        </Button>
      </View>
      <View style={styles.but}>
        <Button
          icon="table-clock"
          mode="elevated"
          buttonColor="rgb(247, 218, 239)"
          textColor="navy"
          uppercase={false}
          // compact={true}
          onPress={() => navigation.navigate('WeatherTableRoute')}>
          Table
        </Button>
      </View>
      <View style={styles.but}>
        <Button
          icon="chart-bell-curve"
          mode="elevated"
          buttonColor="rgb(247, 218, 239)"
          textColor="navy"
          uppercase={false}
          // compact={true}
          onPress={() => navigation.navigate('GrarphDataRoute')}>
          Graph
        </Button>
      </View>
    </View>
  );
}
