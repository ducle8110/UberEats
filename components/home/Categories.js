import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import colors from '../../configs/colors';

const items = [
  {
    image: require('../../assets/images/shopping-bag.png'),
    text: 'お持ち帰り',
  },
  {
    image: require('../../assets/images/soft-drink.png'),
    text: 'ドリンク',
  },
  {
    image: require('../../assets/images/bread.png'),
    text: 'ベーカリー',
  },
  {
    image: require('../../assets/images/fast-food.png'),
    text: 'ファーストフード',
  },
  {
    image: require('../../assets/images/deals.png'),
    text: 'Deals',
  },
  {
    image: require('../../assets/images/coffee.png'),
    text: 'コーヒーとお茶',
  },
  {
    image: require('../../assets/images/desserts.png'),
    text: 'デザート ',
  },
];
export default function Categories() {
  return (
    <View style={styles.categoryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={styles.categoryChildContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.categoryIcon} source={item.image} />
            </View>
            <Text style={styles.categoryText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 5,
    paddingTop: 5,
    backgroundColor: colors.white,
  },
  categoryChildContainer: {
    alignItems: 'center',
    marginLeft: 15,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '900',
  },
  imageContainer: {
    backgroundColor: colors.backGround,
    padding: 10,
    borderRadius: 10,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
