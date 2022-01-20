import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import colors from '../../configs/colors';
import {useSelector} from 'react-redux';

export default function ViewCart() {
  const [modalVisible, setModalVisible] = useState(false);
  const items = useSelector(state => state.cartReducer.selectedItems.items);
  const total = items
    .map(item => {
      var price = item.price
        .replace('￥', '')
        .substring(0, item.price.indexOf('（') - 1);
      return Number(price);
    })
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <>
      {total ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
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
    </>
  );
}

const styles = StyleSheet.create({
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
});
