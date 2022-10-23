import Geocoder from 'react-native-geocoding';
import {PlaceLocation} from '../types/locations.type';

export default function getPlace(lat: number, lng: number) {
  const place: PlaceLocation = {
    country: '',
    administrative_area_level_1: '',
    administrative_area_level_2: '',
    locality: '',
    route: '',
    street_number: '',
  };
  type AdressComponent = {
    long_name: string;
    short_name: string;
    types: string[];
  };
  let addressComponents: AdressComponent = {
    long_name: '',
    short_name: '',
    types: [],
  };
  Geocoder.init('AIzaSyCm7iqJEQYi-rkuegcrkg8TZOEZ8ynKE7U', {language: 'ru'});
  Geocoder.from({lat: lat, lng: lng})
    .then(json => {
      // place.city = json.results[2].address_components[3].short_name;
      // // place.city = json.results[2].formatted_address;
      // place.area = json.results[2].address_components[2].short_name;
      // place.street = json.results[2].address_components[1].short_name;
      // place.street_number = json.results[2].address_components[0].short_name;

      for (let i = 0; json.results.length; i++) {
        if (json.results[i].address_components[0] !== undefined) {
          addressComponents = json.results[i].address_components[0];
        }
        if (addressComponents !== undefined) {
          if (addressComponents.types[0] === 'street_number') {
            // console.log('номер дома ' + addressComponents.long_name);
            place.street_number = addressComponents.long_name;
          }
          if (addressComponents.types[0] === 'route') {
            // console.log('улица ' + addressComponents.long_name);
            place.route = addressComponents.long_name;
          }
          if (addressComponents.types[0] === 'locality') {
            // console.log('город ' + addressComponents.long_name);
            place.locality = addressComponents.long_name;
          }
          if (addressComponents.types[0] === 'administrative_area_level_2') {
            // console.log('район ' + addressComponents.long_name);
            place.administrative_area_level_2 = addressComponents.long_name;
          }
          if (addressComponents.types[0] === 'administrative_area_level_1') {
            // console.log('область ' + addressComponents.long_name);
            place.administrative_area_level_1 = addressComponents.long_name;
          }
          if (addressComponents.types[0] === 'country') {
            // console.log('страна ' + addressComponents.long_name);
            place.country = addressComponents.long_name;
          }
        }
      }
    })
    .catch(error => console.warn(error));
  return place;
}
