/* // app/home/restaurant/_layout.js
import React from 'react';
import { Stack } from 'expo-router';

const RestaurantLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="[restaurantId]" options={{ headerShown: false }} />
			<Stack.Screen name="ViewOrderScreen" options={{ headerShown: false, presentation: 'modal' }} />
		</Stack>
	);
};

export default RestaurantLayout;
*/


import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../../../redux/thunk';
import IndividualRestaurant from "../../../../components/RestaurantRelatedComponents/IndividualRestaurant"
import { COLORS } from '../../../../constants';
import ViewOrderButton from '../../../../components/RestaurantRelatedComponents/ViewOrderButton';

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
			<Stack.Screen options={{ title: `${singleRestaurant?.Name}`, contentStyle: { backgroundColor: COLORS.primary } }} />
			<SafeAreaView>
				<ScrollView>
					<IndividualRestaurant />
				</ScrollView>
				{singleRestaurant ? <ViewOrderButton /> : null}
			</SafeAreaView>
		</>
	);
};

export default RestaurantPage;

