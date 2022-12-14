import * as React from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Menu} from 'react-native-paper';
import {searchLocation} from './ua_cities';

export default function SelectPlace() {
  const sortLocation = searchLocation.sort((a, b) =>
    a.location > b.location ? 1 : -1,
  );
  const options = sortLocation.map(city => city.location);

  // const addMap = (event: React.MouseEvent<HTMLElement>, value: any) => {};
  const addMap = (item: string) => {
    Alert.alert(item);
  };
  return (
    <View>
      <ScrollView>
        {options.map(item => (
          <Menu.Item
            key={item}
            onPress={() => {
              addMap(item);
            }}
            title={item}
            // selected={option === 'Одесса'}
            // onClick={e => addMap(e, option)}>
            // {option}
          />
        ))}
        {/* <Menu.Item leadingIcon="redo" onPress={() => {}} title="Redo" />
      <Menu.Item leadingIcon="undo" onPress={() => {}} title="Undo" /> */}
      </ScrollView>
    </View>
  );
}
