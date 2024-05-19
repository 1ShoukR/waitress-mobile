import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../../../redux/thunk';
import IndividualRestaurant from "../../../../components/RestaurantRelatedComponents/IndividualRestaurant"

const RestaurantPage = () => {
	const { restaurantId } = useLocalSearchParams();
	const dispatch = useDispatch();
  const singleRestaurant = useSelector((state) => state?.restaurant?.singleRestaurant);

  useEffect(() => {
    if (restaurantId) {
      console.log(`Fetching restaurant with ID: ${restaurantId}`);
        dispatch(getSingleRestaurant({ restaurantId }));
    } else {
      console.log('Restaurant ID is undefined');
    }
  }, [restaurantId]);

	return (
		<>
			<Stack.Screen options={{ title: `${singleRestaurant?.Name}` }} />
			<IndividualRestaurant />
		</>
	);
};

export default RestaurantPage;

