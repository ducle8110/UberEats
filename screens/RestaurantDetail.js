import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import About from '../components/restaurantDetail/About';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import MenuItems from '../components/restaurantDetail/MenuItems';
import ViewCart from '../components/restaurantDetail/ViewCart';

const foods = [
  {
    title: 'ヒカル考案 冗談抜きで旨いハンバーグ',
    description: '745kcal 食塩相当量 4.6g',
    price: '￥799（税込￥878）',
    image: 'https://www.joyfull.co.jp/menu/img/20211015/foods-111748.jpg',
  },
  {
    title: 'ヒカル考案 冗談抜きで旨いハンバーグ＆えびフライ',
    description: '1,031kcal 食塩相当量 5.8g',
    price: '￥959（税込￥1,054）',
    image: 'https://www.joyfull.co.jp/menu/img/20211015/foods-111758.jpg',
  },
  {
    title: 'ツインハンバーグ',
    description: '936kcal 食塩相当量 5.8g',
    price: '￥799（税込￥878）',
    image:
      'https://www.joyfull.co.jp/menu/img/20210618/twin-salisbury-steak-124502.jpg',
  },
  {
    title: 'プライムサイコロペッパーステーキ',
    description: '536kcal 食塩相当量 3.5g',
    price: '￥999（税込￥1,098）',
    image:
      'https://www.joyfull.co.jp/menu/img/20210618/premium-pepper-diced-steak-123816.jpg',
  },
  {
    title: 'ミックスグリル',
    description: '712kcal 食塩相当量 4.8g',
    price: '￥799（税込￥878）',
    image:
      'https://www.joyfull.co.jp/menu/img/20210618/mixed-grillsalisbury-steak-and-grilled-chicken-124616.jpg',
  },
];

export default function RestaurantDetail({route, navigation}) {
  return (
    <View style={styles.container}>
      <About route={route} />
      <Divider width={1.5} />
      <MenuItems restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} restaurantName={route.params.name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
