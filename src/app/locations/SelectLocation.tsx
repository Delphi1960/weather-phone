import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Dialog, Menu, Paragraph, Portal} from 'react-native-paper';
import {useSetRecoilState} from 'recoil';
import {searchLocation} from './ua_cities';
import {coordinatesLocation} from '../recoil/location.state';

export default function SelectLocation() {
  const navigation = useNavigation();

  // const setCoord = useSetRecoilState(coordLocation);
  const setCoordLoc = useSetRecoilState(coordinatesLocation);

  const [selCoord, setSelCoord] = useState('');
  const [selCity, setSelCity] = useState('');
  const [selectLoc, setSelectLoc] = useState<string | undefined>('');

  const sortLocation = searchLocation.sort((a, b) =>
    a.location > b.location ? 1 : -1,
  );
  const place = sortLocation.map(city => city.location);

  const [visible, setVisible] = useState(false);
  const okDialog = () => {
    setVisible(false);
    const newCoord = {
      latitude: Number(selCoord.slice(4, 11)),
      longitude: Number(selCoord.slice(16, 23)),
      altitude: Number(selCoord.slice(33)),
    };
    setCoordLoc(newCoord);
    // console.log(newCoord);
    navigation.goBack();
  };
  const canselDialog = () => {
    setVisible(false);
  };

  function WindowModal() {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={canselDialog}>
          <Dialog.Title>{selCity}</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{fontSize: 16}}>{selectLoc}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="elevated"
              buttonColor="rgb(220,230,250)"
              textColor="navy"
              onPress={okDialog}>
              Ok
            </Button>
            <Button
              mode="elevated"
              buttonColor="rgb(220,230,250)"
              textColor="navy"
              onPress={canselDialog}>
              Cansel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  return (
    <View>
      <ScrollView>
        {place.map(item => (
          <Menu.Item
            key={item}
            onPress={() => {
              setVisible(true);

              const coord = searchLocation.find(
                city => city.location === item,
              )?.coord;
              coord !== undefined ? setSelCoord(coord) : null;
              setSelCity(item);
              setSelectLoc(
                'Широта  : ' +
                  coord?.slice(4, 11) +
                  '°' +
                  '\n' +
                  'Долгота : ' +
                  coord?.slice(16, 23) +
                  '°' +
                  '\n' +
                  'Высота  : ' +
                  coord?.slice(33) +
                  'm',
              );
            }}
            title={item}
          />
        ))}
      </ScrollView>
      <WindowModal />
    </View>
  );
}
