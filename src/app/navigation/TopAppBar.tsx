import React, {useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useRecoilValue} from 'recoil';
import GetCurrentCoordinates from '../locations/GetCurrentCoordinates';
import {placeLocation} from '../recoil/location.state';
import {PlaceLocation} from '../types/locations.type';

export default function TopAppBar() {
  const getPlaceLocation = useRecoilValue(placeLocation);
  const [place, setPlace] = useState<PlaceLocation>();

  useEffect(() => {
    setPlace(getPlaceLocation);
  }, []);

  return (
    <Appbar.Header style={{backgroundColor: 'white'}}>
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <Appbar.Action icon="map-marker" style={{marginRight: -25}} />
      <Appbar.Content title={place?.route} />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => {
          <GetCurrentCoordinates />;
        }}
      />
    </Appbar.Header>
  );
}
