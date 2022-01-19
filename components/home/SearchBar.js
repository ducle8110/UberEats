import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from '../../configs/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GoogleApi from '../../configs/GoogleApi';

export default function SearchBar({changeCity}) {
  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        placeholder="新しい住所を入力してください"
        query={{key: GoogleApi.PLACES_API}}
        onPress={(data, detail = null) => {
          const city = data.description.split(',')[0];
          changeCity(city);
        }}
        styles={{
          textInput: {
            backgroundColor: colors.backGround,
            borderRadius: 20,
            fontWeight: '700',
            marginTop: 5,
          },
          textInputContainer: {
            backgroundColor: colors.backGround,
            borderRadius: 50,
            alignItems: 'center',
          },
        }}
        renderLeftButton={() => (
          <View style={styles.iconContainer}>
            <Ionicons name="location-sharp" size={28} />
          </View>
        )}
        renderRightButton={() => (
          <View style={styles.searchButton}>
            <AntDesign style={styles.icon} name="clockcircle" size={11} />
            <Text>検索</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchButton: {
    flexDirection: 'row',
    marginRight: 8,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 6,
  },
  searchBarContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
});
