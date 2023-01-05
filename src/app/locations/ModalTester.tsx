import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Modal} from '../components/Modal';
import {Button} from 'react-native-paper';

type Props = {
  navigation: any;
};
export default function ModalTester({navigation}: Props) {
  // export default function ModalTester() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  // const handleModal = () => setIsModalVisible(() => !isModalVisible);
  React.useEffect(() => {
    setIsModalVisible(true);
  }, []);

  return (
    //  <View style={styles.container}>
    //   <Text style={styles.title}>Premium stuff here</Text>
    //   <View style={styles.separator} />
    <Modal
      isVisible={isModalVisible}
      // onSwipeComplete={() => setIsModalVisible(false)}
    >
      <Modal.Container>
        <View style={styles.modal}>
          <Modal.Header title="Это модальное окно" />
          <Modal.Body>
            <Text style={styles.text}>
              Здесь можно разместить какие-либо элементы
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <View style={styles.button}>
              {/* <Button mode="elevated" onPress={handleModal}> */}
              <Button
                mode="elevated"
                onPress={() => navigation.navigate('WeatherHourlyRoute')}>
                {/*  onPress={handleModal}> */}
                Понятно
              </Button>
            </View>
          </Modal.Footer>
        </View>
      </Modal.Container>
    </Modal>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    paddingTop: 10,
    borderColor: 'grey',
    borderBottomWidth: 2,
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  modal: {
    // width: '100%',
    // height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
