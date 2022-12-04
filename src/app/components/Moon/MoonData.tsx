/* eslint-disable react-native/no-inline-styles */
import {add, format, parseISO} from 'date-fns';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../../../assets/index.back';
import {YrSunrise} from '../../types/yr_sunrise.type';
import MoonPhaseIcon from './MoonPhaseIcon';
import MoonPhaseState from './MoonPhaseState';

type Props = {
  moonData: YrSunrise;
};

const styles = StyleSheet.create({
  phasa: {
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  data: {
    fontWeight: '500',
    // textAlign: 'right',
    color: 'white',
    fontSize: 16,
    marginLeft: -20,
    marginTop: -5,
  },
  icon: {
    width: 60,
    height: 60,
  },
});

export default function MoonData({moonData}: Props) {
  // let sun = moonData.location.time[0].sunrise.time.slice(11, -9);
  // let dt = moonData.location.time[0].date;
  const dt = new Date(moonData.location.time[0].date);
  const dayPlus = add(dt, {days: 1});
  const dayMinus = add(dt, {days: -1});
  return (
    <ImageBackground
      source={Background.night0}
      resizeMode="cover"
      style={{
        flex: 1,
      }}>
      <View style={{alignItems: 'center'}}>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              fontWeight: '600',
              textAlign: 'left',
              color: 'white',
              fontSize: 18,
            }}>
            {format(
              parseISO(moonData.location.time[0].date),
              'eeee, dd MMMM HH:mm:ss',
            )}
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={styles.phasa}>
            {'Фаза : ' +
              Number(moonData.location.time[0].moonposition.phase).toFixed(2)}
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <MoonPhaseIcon
            moonPhase={Number(
              moonData.location.time[0].moonposition.phase,
            ).toFixed(0)}
          />
          <Text style={styles.phasa}>
            {MoonPhaseState(
              Number(moonData.location.time[0].moonposition.phase).toFixed(0),
            )}
          </Text>
        </View>
      </View>
      {/* ///////////////////////////////////////////////////////////// */}
      <View style={{flexDirection: 'row', marginTop: 14}}>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 50}}>
          <Text style={styles.data}>Восход </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={styles.data}>
            {moonData.location.time[0].moonrise?.time !== undefined
              ? format(
                  parseISO(moonData.location.time[0].moonrise?.time),
                  'd MMMM HH:MM',
                )
              : format(dayMinus, 'd MMMM ')}
          </Text>
        </View>
      </View>

      {/* //////////////////////////////// */}
      <View style={{flexDirection: 'row', marginTop: 4}}>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 50}}>
          <Text style={styles.data}>Заход</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={styles.data}>
            {moonData.location.time[0].moonset?.time !== undefined
              ? format(
                  parseISO(moonData.location.time[0].moonset?.time),
                  'd MMMM HH:MM',
                )
              : format(dayPlus, 'd MMMM ')}
          </Text>
        </View>
      </View>

      {/* //////////////////////////////// */}
      <View style={{flexDirection: 'row', marginTop: 4}}>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 50}}>
          <Text style={styles.data}>Расстояние</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={styles.data}>
            {Number(moonData.location.time[0].moonposition.range).toFixed(0)} км
          </Text>
        </View>
      </View>
      {/* //////////////////////////////// */}
      <View style={{flexDirection: 'row', marginTop: 4}}>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 50}}>
          <Text style={styles.data}>Высота</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={styles.data}>
            {Number(moonData.location.time[0].moonposition.elevation).toFixed(
              0,
            ) + '°'}
          </Text>
        </View>
      </View>
      {/* //////////////////////////////// */}
      {/* //////////////////////////////// */}
      <View style={{flexDirection: 'row', marginTop: 4}}>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 50}}>
          <Text style={styles.data}>Азимут</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={styles.data}>
            {Number(moonData.location.time[0].moonposition.azimuth).toFixed(0) +
              '°'}
          </Text>
        </View>
      </View>
      {/* //////////////////////////////// */}
    </ImageBackground>
  );
}
