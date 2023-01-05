import {ActivityIndicator, Stack} from '@react-native-material/core';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import WeatherIcon from '../../../assets/index.icon';

const styles = StyleSheet.create({
  image: {width: 100, height: 100},
  txt: {fontSize: 16, fontWeight: 'bold'},
  ind: {marginTop: -97},
});

export default function Loading() {
  return (
    <Stack fill center spacing={4}>
      <Image style={styles.image} source={WeatherIcon.clearsky_day} />
      <Text style={styles.txt}>Загрузка погоды...</Text>
      <ActivityIndicator style={styles.ind} size="large" />
    </Stack>
  );
}
