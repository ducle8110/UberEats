import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export default function MenuItems({restaurantName, foods}) {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });
  const items = useSelector(state => state.cartReducer.selectedItems.items);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollMenu}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemContainer}>
            <BouncyCheckbox
              onPress={checkboxValue => selectItem(food, checkboxValue)}
              fillColor="green"
              iconStyle={styles.checkBox}
              isChecked={
                items.some(
                  item => item.checkboxValue && item.title === food.title,
                )
                  ? true
                  : false
              }
            />
            <FoodInfo food={food} />
            <FoodImage food={food} />
          </View>
          <Divider width={0.5} orientation="vertical" style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
}
const FoodInfo = props => (
  <View style={styles.foodInfoContainer}>
    <Text style={styles.name}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = props => (
  <View>
    <Image style={styles.image} source={{uri: props.food.image}} />
  </View>
);

const styles = StyleSheet.create({
  checkBox: {
    borderColor: 'lightgray',
    borderRadius: 0,
  },
  foodInfoContainer: {
    width: 220,
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
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
  scrollMenu: {
    flex: 1,
  },
});
