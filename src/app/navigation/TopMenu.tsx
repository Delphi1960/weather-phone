import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {View, StyleSheet} from 'react-native';
import {Provider, Appbar, Menu} from 'react-native-paper';
import GetCurrentCoordinates from '../locations/GetCurrentCoordinates';

const TopMenu = () => {
  //   const [searchQuery, setSearchQuery] = React.useState('');

  //   const onChangeSearch = (query: React.SetStateAction<string>) =>
  //     setSearchQuery(query);

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <Appbar.Header style={styles.title}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="User" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={openMenu} />
      </Appbar.Header>
      {/* <View style={styles.mainbox}> */}
      {/* <Card> */}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}>
        <Menu.Item
          onPress={() => {
            <GetCurrentCoordinates />;
          }}
          title="О программе"
        />
        <Menu.Item
          onPress={() => {
            console.log('Option 2 was pressed');
          }}
          title="Option 2"
        />
      </Menu>
      {/* </Card> */}
      {/* </View> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  title: {
    // margin: 10,
    // fontSize: 15,
    backgroundColor: 'red',
  },
  mainbox: {
    textAlign: 'center',
    margin: 15,
    // flex: 1,
    justifyContent: 'space-between',
  },
  databeBox: {
    margin: 10,
    textAlign: 'center',
  },
  databeHeader: {
    margin: 10,
    textAlign: 'left',
  },
});
export default TopMenu;
