import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function BottomTabs() {
  return (
    <View style={styles.fotterContainer}>
      <Icon icon="home" text="ホーム" />
      <Icon icon="search" text="検索" />
      <Icon icon="receipt" text="注文" />
      <Icon icon="user" text="アカウント" />
    </View>
  );
}
const Icon = props => (
  <TouchableOpacity>
    <View>
      <FontAwesome5 name={props.icon} size={25} style={styles.icon} />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  fotterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginHorizontal: 30,
  },
  icon: {
    marginBottom: 3,
    alignSelf: 'center',
  },
});
