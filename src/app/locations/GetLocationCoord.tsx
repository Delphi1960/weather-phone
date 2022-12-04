import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {useSetRecoilState} from 'recoil';
// import {CoordLocation} from '../types/coordLocation.type';
import Geolocation from 'react-native-geolocation-service';
// import {coordLocation} from '../recoil/yr_weather.state';
import {coordinatesLocation} from '../recoil/location.state';
import {Text} from 'react-native-paper';

export default function GetLocationCoord() {
  const [, setIsCoordLoading] = useState(true);
  const setCoordLoc = useSetRecoilState(coordinatesLocation);

  // const [location, setLocation] = useState<CoordLocation | undefined>(
  //   undefined,
  // );
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
    setIsCoordLoading(true);

    RequestGetLocation();
    if (acces) {
      Geolocation.getCurrentPosition(
        position => {
          const {altitude, latitude, longitude} = position.coords;
          setCoordLoc({altitude, latitude, longitude});
          setIsCoordLoading(false);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [acces, setCoordLoc]);

  return <Text>COORD</Text>;
}
