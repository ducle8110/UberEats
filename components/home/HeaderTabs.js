import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../configs/colors';

export const defaultSelect = 'Delivery';

export default function HeaderTabs(props) {
  return (
    <View style={styles.headerContainer}>
      <HeaderButton
        id={'Delivery'}
        buttonName={'配達'}
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        id={'PickUp'}
        buttonName={'お持ち帰り'}
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const HeaderButton = props => (
  <View>
    <TouchableOpacity
      style={[
        styles.button,
        props.activeTab === props.id
          ? styles.activedButton
          : styles.unactivedButton,
      ]}
      onPress={() => props.setActiveTab(props.id)}>
      <Text
        style={[
          styles.buttonText,
          props.activeTab === props.id
            ? styles.activedText
            : styles.unactivedText,
        ]}>
        {props.buttonName}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '900',
  },
  activedButton: {
    backgroundColor: colors.black,
  },
  unactivedButton: {
    backgroundColor: colors.white,
  },
  activedText: {
    color: colors.white,
  },
  unactivedText: {
    color: colors.black,
  },
});
