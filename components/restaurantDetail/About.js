import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function About(props) {
  const {name, image, price, reviews, rating, categories} = props.route.params;

  const formattedCategories = categories.map(cat => cat.title).join(' • ');

  const description = `${formattedCategories} ${
    price ? ' • ' + price : ''
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;

  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName title={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = props => (
  <Image style={styles.image} source={{uri: props.image}} />
);
const RestaurantName = props => <Text style={styles.title}>{props.title}</Text>;
const RestaurantDescription = props => (
  <Text style={styles.description}>{props.description}</Text>
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    color: 'black',
    fontSize: 29,
    fontWeight: '600',
    marginTop: 10,
    marginHorizontal: 15,
  },
  description: {
    color: 'black',
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 15,
    fontWeight: '400',
    fontSize: 15,
  },
});
