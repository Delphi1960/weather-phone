import {Text} from '@react-native-material/core';
import {setDefaultOptions} from 'date-fns';
import format from 'date-fns/format';
import {ru} from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';

import Button from '../../../assets/index.button';
import WeatherIcon from '../../../assets/index.icon';
import GetBackground from '../background/GetBackground';
import IsItDayOrNight from '../background/IsItDayOrNight';
import {TextStroke} from '../../utils/TextStroke';
import GetIconWindDirection from '../wind/GetIconWindDirection';
import GetWindDirection from '../wind/GetWindDirection';

setDefaultOptions({locale: ru});

type Props = {
  dataHourly: any;
  minDayTemp: any;
  maxDayTemp: any;
};

const styles = StyleSheet.create({
  cloudIcon: {
    width: 120,
    height: 120,
  },
  icon: {
    width: 60,
    height: 60,
    marginLeft: 20,
    marginTop: -10,
  },
});

function Divider() {
  return (
    <View
      style={{
        marginTop: 0,
        height: 1,
        width: '90%',
        backgroundColor: 'yellow',
      }}
    />
  );
}

export default function WeatherHourly({
  dataHourly,
  minDayTemp,
  maxDayTemp,
}: Props) {
  function print(
    txt: any,
    fontSize: any,
    fontWeight: any,
    color = 'black',
    showStroke = false,
  ) {
    return showStroke ? (
      <TextStroke stroke={1} color={'black'}>
        <Text
          style={{
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: IsItDayOrNight(dataHourly.UTC) ? color : 'white',
            textAlign: 'center',
          }}>
          {txt}
        </Text>
      </TextStroke>
    ) : (
      <Text
        style={{
          fontSize: fontSize,
          fontWeight: fontWeight,
          color: IsItDayOrNight(dataHourly.UTC) ? color : 'white',
          textAlign: 'center',
        }}>
        {txt}
      </Text>
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
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, margin: 4, alignItems: 'center'}}>
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
                16,
                'bold',
              )}
              {print(
                'Облачность  ' + dataHourly.cloud_area_fraction + '%',
                16,
                'bold',
              )}
            </View>
          </View>

          <View style={{flex: 1, margin: 4, alignItems: 'center'}}>
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
        <View style={{flexDirection: 'row', margin: 4}}>
          <View style={{flex: 1, margin: 14}}>
            <Image
              style={styles.icon}
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
            {print(dataHourly.wind_speed + ' м/с', 18, 'bold', 'black', false)}
          </View>
        </View>
        <Divider />
        <View style={{flexDirection: 'row', margin: 4}}>
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
        <View style={{flexDirection: 'row', margin: 4}}>
          <View style={{flex: 1, margin: 14}}>
            <Image style={styles.icon} source={Button.bt_press} />
          </View>

          <View style={{flex: 1, marginLeft: -50, alignItems: 'center'}}>
            {print('Атмосферное давление', 16, 'normal')}
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
        <View style={{flexDirection: 'row', margin: 4}}>
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
        <View
          style={{
            marginTop: -12,
            height: 1,
            width: '90%',
            backgroundColor: 'yellow',
          }}
        />
      </View>
    </ImageBackground>
  );
}
