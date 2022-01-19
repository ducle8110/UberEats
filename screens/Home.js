import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import colors from '../configs/colors';
import HeaderTabs, {defaultSelect} from '../components/home/HeaderTabs';
import SearchBar from '../components/home/SearchBar';
import Categories from '../components/home/Categories';
import RestaurantItems, {
  localRestaurants,
} from '../components/home/RestaurantItems';
import YelpApi from '../configs/YelpApi';
import axios from 'react-native-axios';
import BottomTabs from '../components/home/BottomTabs';
import {Divider} from 'react-native-elements/dist/divider/Divider';

export default function Home({navigation}) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState('福岡');
  const [activeTab, setActiveTab] = useState('Delivery');

  useEffect(() => {
    const getRestaurantsFromYelp = async () => {
      try {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

        const apiOptions = {
          headers: {
            Authorization: `Bearer ${YelpApi.YELP_API_KEY}`,
          },
        };

        let result = await axios.get(yelpUrl, apiOptions);
        if (
          result.data.businesses.filter(business =>
            business.transactions.includes(activeTab.toLowerCase()),
          ).length === 0
        ) {
          await setRestaurantData(result.data.businesses);
        } else {
          await setRestaurantData(
            result.data.businesses.filter(business =>
              business.transactions.includes(activeTab.toLowerCase()),
            ),
          );
        }
      } catch (error) {
        await setRestaurantData(null);
      }
    };
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={styles.backGround}>
      <Animated.View style={styles.fadingContainer}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar changeCity={setCity} />
      </Animated.View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fadingContainer: {
    padding: 15,
    backgroundColor: colors.white,
  },
  backGround: {
    backgroundColor: colors.backGround,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors.white,
    padding: 15,
  },
});
