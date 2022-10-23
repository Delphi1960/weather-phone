import React from 'react';
import {View, Text} from 'react-native';
import {useRecoilValue} from 'recoil';
import {coordinatesLocation, placeLocation} from '../recoil/location.state';

type Props = {};

export default function GetCurrentCoordinates({}: Props) {
  const coord = useRecoilValue(coordinatesLocation);
  const getPlaceLocation = useRecoilValue(placeLocation);
  // console.log(getPlaceLocation.city);
  return (
    <View style={{margin: 15}}>
      <>
        <Text style={{color: 'black', fontSize: 16}}>
          Широта: {coord.latitude}
        </Text>
        <Text style={{color: 'black', fontSize: 16}}>
          Долгота:{coord.longitude}
        </Text>
        <Text style={{color: 'black', fontSize: 16}}>
          Высота: {coord.altitude?.toFixed(0)}
        </Text>

        <Text>==================================</Text>
        <View>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
            Номер дома: {getPlaceLocation.street_number}
          </Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
            Улица: {getPlaceLocation.route}
          </Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
            Город: {getPlaceLocation.locality}
          </Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
            Район: {getPlaceLocation.administrative_area_level_2}
          </Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
            Область: {getPlaceLocation.administrative_area_level_1}
          </Text>
        </View>
      </>
    </View>
  );
}
