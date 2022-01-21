import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import colors from '../configs/colors';
import LottieView from 'lottie-react-native';
import MenuItems from '../components/restaurantDetail/MenuItems';
import {ScrollView} from 'react-native-gesture-handler';

export default function OrderCompleted() {
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
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        style={styles.done}
        source={require('../assets/animations/check-mark.json')}
        autoPlay
        speed={0.5}
        loop={false}
      />
      <Text style={styles.restaurantName}>{restaurantName}</Text>
      <ScrollView>
        <MenuItems foods={items} hideCheckbox={true} />
      </ScrollView>
      <LottieView
        style={styles.cooking}
        source={require('../assets/animations/cooking.json')}
        autoPlay
        speed={0.5}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  done: {
    height: 100,
    alignSelf: 'center',
  },
  cooking: {
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
