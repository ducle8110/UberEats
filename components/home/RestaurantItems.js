import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../configs/colors';

export const localRestaurants = [
  {
    name: '一蘭ラーメン',
    image_url:
      'https://loco-pctr.c.yimg.jp/L1nT0Ke8h94Ofz4d8DOMV8i56SkP1DLoQV-fLBzXXF3zphQ_H7JMp8dZp9lQgA0i7im7ANKengDdcyAFhx8VwPJFnfvVFMJV-l-VddRKVoICbyuGshAmr361OAL0lqzMKPs0ISPTTKKv2N_r5vS7IGFvBbHAlA0FRZJF1vkcwfTAW1P417Scbf_9JPyCqvpS',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: 'ドミノピザ',
    image_url: 'https://www.dominos.jp/media/11646/lp_kv_sp.jpg',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: 'マクドナルド',
    image_url:
      'https://amami.sevenpark.jp/app/31/img/tenant/3100000034/img_3g9al6p7b0kks.jpg',
    categories: ['Indian', 'Bar'],
    price: '$$',
    reviews: 700,
    rating: 4.9,
  },
];

export default function RestaurantItems({navigation, ...props}) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={styles.itemContainer}
          onPress={() => {
            navigation.navigate('RestaurantDetail', {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
            });
          }}>
          <View style={styles.container}>
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}
const RestaurantImage = props => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={styles.image}
    />
    <TouchableOpacity style={styles.heart}>
      <MaterialCommunityIcons
        name="heart-outline"
        size={30}
        color={colors.white}
      />
    </TouchableOpacity>
  </>
);
const RestaurantInfo = props => (
  <View style={styles.infoContainer}>
    <View>
      <Text style={styles.restaurantName}>{props.name}</Text>
      <Text style={styles.deliveryInfo}>配送手数料￥0・5-25 分</Text>
    </View>
    <View style={styles.rating}>
      <Text>{props.rating}</Text>
    </View>
  </View>
);
const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
  container: {
    marginTop: 10,
    padding: 15,
    backgroundColor: colors.white,
  },
  heart: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  image: {
    width: '100%',
    height: 180,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  deliveryInfo: {
    fontSize: 13,
    color: 'gray',
  },
  rating: {
    backgroundColor: colors.backGround,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});
