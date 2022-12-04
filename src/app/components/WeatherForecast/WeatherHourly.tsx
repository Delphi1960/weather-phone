/* eslint-disable react-native/no-inline-styles */
import {Text} from '@react-native-material/core';
import {setDefaultOptions} from 'date-fns';
import format from 'date-fns/format';
import {ru} from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Button from '../../../assets/index.button';
import WeatherIcon from '../../../assets/index.icon';
import GetBackground from '../background/GetBackground';
import IsItDayOrNight from '../background/IsItDayOrNight';
import {TextStroke} from '../../utils/TextStroke';
import GetIconWindDirection from '../wind/GetIconWindDirection';
import GetWindDirection from '../wind/GetWindDirection';
import {useRecoilValue} from 'recoil';
import {yrSunriseState} from '../../recoil/yr_sunrise.state';

setDefaultOptions({locale: ru});

type Props = {
  dataDay: any;
  dataHourly: any;
  minDayTemp: any;
  maxDayTemp: any;
};

export default function WeatherHourly({
  dataDay,
  dataHourly,
  minDayTemp,
  maxDayTemp,
}: Props) {
  const astroData = useRecoilValue(yrSunriseState);
  let sunrise;
  let sunset;
  // let day = 0;
  // let hour = 0;
  // let min = 0;
  // let sec = 0;

  if (astroData !== null) {
    sunrise = astroData[0].location.time[0].sunrise.time.slice(11, -6);
    sunset = astroData[0].location.time[0].sunset.time.slice(11, -6);
    // Вычислим продолжительность дня
    // day = differenceInSeconds(
    //   new Date(astroData[0].location.time[0].sunset.time),
    //   new Date(astroData[0].location.time[0].sunrise.time),
    // );
    // hour = day / 3600;
    // let h_toThePoint = Math.trunc(hour); // часы
    // let h_afterThePoint = hour - Math.trunc(hour);
    // hour = h_toThePoint;

    // let m_toThePoint = h_afterThePoint * 60;
    // let m_afterThePoint = m_toThePoint - Math.trunc(m_toThePoint);
    // min = m_toThePoint;
    // let s_afterThePoint = m_afterThePoint * 60;
    // sec = s_afterThePoint;
  }
  // const dayLength = hour + 'h ' + min.toFixed(0) + 'm ' + sec.toFixed(0) + 's';

  const styles = StyleSheet.create({
    cloudIcon: {
      width: 130,
      height: 130,
    },
    icon: {
      width: 50,
      height: 50,
      marginLeft: 20,
      marginTop: -10,
    },
    iconWind: {
      width: 55,
      height: 55,
      marginLeft: 20,
      marginTop: -10,
    },
    divider: {
      marginTop: 0,
      height: 1,
      width: '90%',
      backgroundColor: 'yellow',
    },
    sun: {
      fontSize: 12,
      fontWeight: '500',
      color: IsItDayOrNight(dataHourly.UTC) ? 'navy' : 'yellow',
    },
    sunBox: {
      alignItems: 'center',
      marginTop: 2,
      // backgroundColor: 'blue',
      // flex: 0.09,
    },
  });
  function Divider() {
    return <View style={styles.divider} />;
  }

  function print(
    txt: any,
    fontSize: any,
    fontWeight: any,
    color = 'black',
    showStroke = false,
  ) {
    const stylePrint = StyleSheet.create({
      print: {
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: IsItDayOrNight(dataHourly.UTC) ? color : 'white',
        textAlign: 'center',
      },
    });
    return showStroke ? (
      <TextStroke stroke={1} color={'black'}>
        <Text style={stylePrint.print}>{txt}</Text>
      </TextStroke>
    ) : (
      <Text style={stylePrint.print}>{txt}</Text>
    );
  }
  return (
    <ImageBackground
      source={GetBackground(dataHourly.cloud_area_fraction, dataHourly.UTC)}
      resizeMode="cover"
      style={{
        flex: 1,
        height: '100%',
      }}>
      <ScrollView>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', margin: 2}}>
            {print(dataDay, 18, 'bold')}
          </View>
          <Divider />

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, margin: 1, alignItems: 'center'}}>
              {print(
                dataHourly.air_temperature + '°',
                80,
                'normal',
                Number(dataHourly.air_temperature) > 0 ? 'white' : 'white',
                true,
              )}
              <View style={{}}>
                {print(
                  'min=' + minDayTemp + '°' + ' max=' + maxDayTemp + '°',
                  14,
                  'bold',
                )}
                {print(
                  'Облачность  ' + dataHourly.cloud_area_fraction + '%',
                  14,
                  'bold',
                )}
              </View>
            </View>

            <View style={{flex: 1, margin: 1, alignItems: 'center'}}>
              {print(format(parseISO(dataHourly.UTC), 'HH:mm'), 30, 'bold')}

              <Image
                style={styles.cloudIcon}
                source={WeatherIcon[dataHourly.icon]}
              />
            </View>
          </View>
          <Divider />
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <View>
              <Divider />
            </View>
          </View>
          <View style={{flexDirection: 'row', margin: 2}}>
            <View style={{flex: 1, margin: 14}}>
              <Image
                style={styles.iconWind}
                source={GetIconWindDirection(dataHourly.wind_from_direction)}
              />
            </View>

            <View style={{flex: 1, marginLeft: -50, alignItems: 'center'}}>
              {print('Ветер', 16, 'normal')}
              {print(
                GetWindDirection(dataHourly.wind_from_direction),
                16,
                'bold',
                'black',
                false,
              )}
              {print(
                dataHourly.wind_speed + ' м/с',
                18,
                'bold',
                'black',
                false,
              )}
            </View>
          </View>
          <Divider />
          <View style={{flexDirection: 'row', margin: 2, marginBottom: -5}}>
            <View style={{flex: 1, margin: 14}}>
              <Image style={styles.icon} source={Button.bt_rain} />
            </View>

            <View style={{flex: 1, marginLeft: -50, alignItems: 'center'}}>
              {print('Осадки', 16, 'normal')}
              {dataHourly.pricip === 0
                ? print('не ожидаются', 18, 'bold', 'black', false)
                : print(dataHourly.pricip + ' мм', 18, 'bold', 'black', false)}
            </View>
          </View>
          <Divider />
          <View style={{flexDirection: 'row', margin: 2, marginBottom: -5}}>
            <View style={{flex: 1, margin: 14}}>
              <Image style={styles.icon} source={Button.bt_press} />
            </View>

            <View style={{flex: 1, marginLeft: -50, alignItems: 'center'}}>
              {print('Давление', 16, 'normal')}
              {print(
                dataHourly.air_pressure_at_sea_level + ' мм',
                18,
                'bold',
                'black',
                false,
              )}
            </View>
          </View>
          <Divider />
          <View style={{flexDirection: 'row', margin: 2, marginBottom: -5}}>
            <View style={{flex: 1, margin: 14}}>
              <Image style={styles.icon} source={Button.bt_humidity} />
            </View>

            <View style={{flex: 1, marginLeft: -50, alignItems: 'center'}}>
              {print('Влажность', 16, 'normal')}
              {print(
                dataHourly.relative_humidity + ' %',
                18,
                'bold',
                'black',
                false,
              )}
            </View>
          </View>
          <Divider />
          <View style={styles.sunBox}>
            <Text style={styles.sun}>
              Восход - {sunrise} Заход - {sunset}
            </Text>
            {/* <Text style={styles.sun}>Продолжительность дня - {dayLength}</Text> */}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
