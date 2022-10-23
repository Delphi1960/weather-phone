import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {CoordLocation} from '../types/coordLocation.type';

export default function getCurrentPosition() {
  //   const [acces, setAccess] = useState(false);

  const coord: CoordLocation = {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  };
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
        // console.log('Есть доступ к положению');
        // return true;
        Geolocation.getCurrentPosition(
          position => {
            coord.latitude = position.coords.latitude;
            coord.longitude = position.coords.longitude;
            coord.altitude = position.coords.altitude;
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }
  RequestGetLocation();
  console.log(coord);
  return coord;
}
