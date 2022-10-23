import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {placeLocation} from '../recoil/location.state';
import {CoordLocation} from '../types/coordLocation.type';
import Geolocation from 'react-native-geolocation-service';
import {coordLocation} from '../recoil/yr_weather.state';

export default function CurrentPosition() {
  const place = useRecoilValue(placeLocation);
  const setCoordLoc = useSetRecoilState(coordLocation);

  const [location, setLocation] = useState<CoordLocation | undefined>(
    undefined,
  );
  const [acces, setAccess] = useState(false);

  async function RequestGetLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Доступ к местоположению',
          message: 'Weather запрашивает доступ к местоположению ',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setAccess(true);
      } else {
        setAccess(false);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    RequestGetLocation();
    if (acces) {
      Geolocation.getCurrentPosition(
        position => {
          const {altitude, latitude, longitude} = position.coords;
          setLocation({
            latitude,
            longitude,
            altitude,
          });
          const coordinates =
            'lat=' +
            latitude.toFixed(4) +
            '&lon=' +
            longitude.toFixed(4) +
            '&altitude=' +
            altitude;

          setCoordLoc(coordinates);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [acces, setCoordLoc, setLocation]);

  return (
    <View>
      {location ? (
        <>
          <Text>
            Широта:{' '}
            {location?.latitude !== null ? location?.latitude.toFixed(4) : ''}
          </Text>
          <Text>
            Долгота:{' '}
            {location?.longitude !== null ? location?.longitude.toFixed(4) : ''}
          </Text>
          <Text>
            Высота:{' '}
            {location?.altitude !== null ? location?.altitude.toFixed(0) : ''}
          </Text>

          <Text>==================================</Text>
          <View style={styles.text}>
            <Text style={{color: 'black'}}>Страна: {place.country}</Text>
            <Text style={{color: 'black'}}>
              Область: {place.administrative_area_level_1}
            </Text>
            <Text style={{color: 'black'}}>
              Район: {place.administrative_area_level_2}
            </Text>

            <Text style={{color: 'black'}}>Город: {place.locality}</Text>
            <Text style={{color: 'black'}}>Улица: {place.route}</Text>
            <Text style={{color: 'black'}}>
              Номер дома: {place.street_number}
            </Text>
          </View>
        </>
      ) : (
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: 'black',
    marginLeft: 20,
  },
});
