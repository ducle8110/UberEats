import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-elements';

const foods = {};
export default function MenuItems() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => {
        <View key={index}>
          <View style={styles.menuItemContainer}>
            <FoodInfo food={food} />
            <FoodImage food={food} />
          </View>
          <Divider width={0.5} orientation="vertical" style={styles.divider} />
        </View>;
      })}
    </ScrollView>
  );
}
const FoodInfo = props => (
  <View sytle={styles.foodInfoContainer}>
    <Text style={styles.name}>{props.food.name}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = props => (
  <View style={styles.image}>
    <Image source={{uri: props.food.image}} />
  </View>
);

const styles = StyleSheet.create({
  foodInfoContainer: {
    width: 240,
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 19,
    fontWeight: '500',
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  divider: {
    marginHorizontal: 20,
  },
});
