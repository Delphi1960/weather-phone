import {ActivityIndicator, Stack} from '@react-native-material/core';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import WeatherIcon from '../../../assets/index.icon';

const styles = StyleSheet.create({
  image: {width: 100, height: 100},
  txt: {fontSize: 16, fontWeight: 'bold'},
  ind: {marginLeft: -5, marginTop: -85},
});

export default function FindPlace() {
  return (
    <Stack fill center spacing={4}>
      <Image style={styles.image} source={WeatherIcon.search} />
      <Text style={styles.txt}>Поиск места...</Text>
      <ActivityIndicator style={styles.ind} size="large" />
    </Stack>
  );
}
