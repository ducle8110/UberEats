import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../configs/colors';
import {useSelector} from 'react-redux';
import OrderItem from './OrderItem';
import {Divider} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import CarSchema from '../../Database/CarSchema';
import PersonSchema from '../../Database/PersonSchema';

export default function ViewCart({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const Realm = require('realm');

  const {items, restaurantName} = useSelector(
    state => state.cartReducer.selectedItems,
  );
  const total = items
    .map(item => {
      var price = item.price
        .replace('￥', '')
        .substring(0, item.price.indexOf('（') - 1);
      return Number(price);
    })
    .reduce((prev, curr) => prev + curr, 0);

  const checkoutModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </ScrollView>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>小計</Text>
            <Text>{'￥' + total}</Text>
          </View>
          <Divider width={1.5} />
          <View>
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => {
                setLoading(true);

                // Initialize a Realm with Car and Person models
                Realm.open({schema: [CarSchema, PersonSchema]}).then(realm => {
                  // Add persons and their cars
                  realm.write(() => {
                    let john = realm.create('Person', {name: 'John', cars: []});
                    john.cars.push({
                      make: 'Honda',
                      model: 'Accord',
                      miles: 1500,
                    });
                    john.cars.push({
                      make: 'Toyota',
                      model: 'Prius',
                      miles: 2780,
                    });

                    let joan = realm.create('Person', {name: 'Joan', cars: []});
                    joan.cars.push({
                      make: 'Skoda',
                      model: 'Octavia',
                      miles: 1120,
                    });
                    joan.cars.push({make: 'Ford', model: 'Fiesta', miles: 95});
                    joan.cars.push({make: 'VW', model: 'Golf', miles: 1270});

                    let jill = realm.create('Person', {name: 'Jill', cars: []});

                    let jack = realm.create('Person', {name: 'Jack', cars: []});
                    jack.cars.push({make: 'Porche', model: '911', miles: 965});
                  });

                  // Find car owners
                  let carOwners = realm
                    .objects('Person')
                    .filtered('cars.@size > 0');
                  console.log('Car owners');
                  for (let p of carOwners) {
                    console.log(`  ${p.name}`);
                  }

                  // Find who has been driver longer than average
                  let average = realm.objects('Car').avg('miles');
                  let longerThanAverage = realm
                    .objects('Person')
                    .filtered('cars.@sum.miles > $0', average);
                  console.log(`Longer than average (${average})`);
                  for (let p of longerThanAverage) {
                    console.log(`  ${p.name}: ${p.cars.sum('miles')}`);
                  }

                  realm.close();
                });

                setTimeout(() => {
                  setModalVisible(false);
                  setLoading(false);
                  navigation.navigate('OrderCompleted');
                }, 2500);

                setModalVisible(false);
              }}>
              <Text style={styles.checkoutText}>お会計に進む</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.button}>
            <Text style={styles.text}>
              カートを見る
              {items.length === 0
                ? ''
                : '(' +
                  items.length +
                  ')         ￥' +
                  total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View style={styles.loading}>
          <LottieView
            source={require('../../assets/animations/scanner.json')}
            style={styles.loadingLottie}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingLottie: {
    height: 200,
  },
  loading: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
    height: '100%',
    width: '100%',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    bottom: 20,
    zIndex: 999,
    position: 'absolute',
  },
  button: {
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 13,
    width: 370,
    opacity: 0.8,
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
  checkout: {
    marginVertical: 8,
    backgroundColor: colors.black,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  checkoutText: {
    color: colors.white,
    fontSize: 16,
  },
  restaurantName: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 15,
  },
  modalCheckoutContainer: {
    backgroundColor: colors.white,
    height: '50%',
    // width: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 10,
  },
  subtotalText: {
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
  },
});
