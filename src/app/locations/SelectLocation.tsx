import * as React from 'react';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Button,
  Dialog,
  Menu,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import {searchLocation} from './ua_cities';

export default function SelectLocation() {
  const [selectLoc, setSelectLoc] = useState<string | undefined>('');

  const sortLocation = searchLocation.sort((a, b) =>
    a.location > b.location ? 1 : -1,
  );
  const place = sortLocation.map(city => city.location);

  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  function WindowModal() {
    return (
      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Вы выбрали</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{selectLoc}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
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
              setSelectLoc(item + '\n' + coord);
            }}
            title={item}
          />
        ))}
      </ScrollView>
      <WindowModal />
    </View>
  );
}
