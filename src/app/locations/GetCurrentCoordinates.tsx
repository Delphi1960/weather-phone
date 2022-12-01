import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRecoilValue} from 'recoil';
import {coordinatesLocation, placeLocation} from '../recoil/location.state';

const styles = StyleSheet.create({
  view: {margin: 15},
  coord: {
    color: 'black',
    fontSize: 16,
  },
  place: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default function GetCurrentCoordinates() {
  const coord = useRecoilValue(coordinatesLocation);
  const getPlaceLocation = useRecoilValue(placeLocation);
  // console.log(getPlaceLocation.city);
  return (
    <View style={styles.view}>
      <>
        <Text style={styles.coord}>Широта: {coord.latitude}</Text>
        <Text style={styles.coord}>Долгота:{coord.longitude}</Text>
        <Text style={styles.coord}>Высота: {coord.altitude?.toFixed(0)}</Text>

        <Text>==================================</Text>
        <View>
          <Text style={styles.place}>
            Номер дома: {getPlaceLocation.street_number}
          </Text>
          <Text style={styles.place}>Улица: {getPlaceLocation.route}</Text>
          <Text style={styles.place}>
            Район города: {getPlaceLocation.sublocality_level_1}
          </Text>
          <Text style={styles.place}>Город: {getPlaceLocation.locality}</Text>
          <Text style={styles.place}>
            Административный район:{' '}
            {getPlaceLocation.administrative_area_level_2}
          </Text>
          <Text style={styles.place}>
            Область: {getPlaceLocation.administrative_area_level_1}
          </Text>
        </View>
      </>
    </View>
  );
}
