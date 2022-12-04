import {ActivityIndicator, Stack} from '@react-native-material/core';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import WeatherIcon from '../../../assets/index.icon';

const styles = StyleSheet.create({
  image: {width: 100, height: 100},
  txt: {fontSize: 14, fontWeight: 'bold'},
});

export default function FindPlace() {
  return (
    <Stack fill center spacing={4}>
      <Image style={styles.image} source={WeatherIcon.search} />
      <Text style={styles.txt}>Поиск места...</Text>
      <ActivityIndicator size="large" />
    </Stack>
  );
}
