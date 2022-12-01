import React, {useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useRecoilValue} from 'recoil';
import GetCurrentCoordinates from '../locations/GetCurrentCoordinates';
import {placeLocation} from '../recoil/location.state';
import {PlaceLocation} from '../types/locations.type';

export default function TopAppBar({navigation}) {
  const getPlaceLocation = useRecoilValue(placeLocation);
  const [place, setPlace] = useState<PlaceLocation>(getPlaceLocation);

  useEffect(() => {
    setPlace(getPlaceLocation);
  }, [getPlaceLocation]);

  return (
    <Appbar.Header style={{backgroundColor: 'white'}}>
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <Appbar.Action icon="map-marker" style={{marginRight: -25}} />
      <Appbar.Content title={place.route || place.sublocality_level_1} />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => navigation.navigate(<GetCurrentCoordinates />)}
      />
    </Appbar.Header>
  );
}
