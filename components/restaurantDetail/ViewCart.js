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
import db from '../../database/db';

export default function ViewCart({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
              onPress={async () => {
                try {
                  setLoading(true);

                  // db.info().then(function (info) {
                  //   console.log(info);
                  // });
                  // db.get('mittens').then(function (doc) {
                  //   console.log(doc);
                  // });

                  // var doc = {
                  //   _id: 'mittens2',
                  //   name: 'Mittens2',
                  //   occupation: 'kitten2',
                  //   age: 4,
                  //   hobbies: [
                  //     'playing with balls of yarn2',
                  //     'chasing laser pointers2',
                  //     "lookin' hella cute2",
                  //   ],
                  // };
                  // db.put(doc);

                  setTimeout(() => {
                    setModalVisible(false);
                    setLoading(false);
                    navigation.navigate('OrderCompleted');
                  }, 2500);

                  setModalVisible(false);
                } catch (ex) {
                  console.log(ex);
                }
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
