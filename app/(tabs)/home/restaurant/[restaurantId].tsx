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
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const RestaurantPage = (): React.JSX.Element => {
	const apiToken = useAppSelector((state) => state.auth.apiToken);
	const { restaurantId } = useLocalSearchParams();
	const dispatch = useAppDispatch();
  const singleRestaurant = useAppSelector((state) => state?.restaurant?.singleRestaurant);

	// Fix type issue - ensure restaurantId is a string
	const restaurantIdString = Array.isArray(restaurantId) ? restaurantId[0] : restaurantId;
	
	console.log('🔗 Route received restaurantId:', {
		rawRestaurantId: restaurantId,
		type: typeof restaurantId,
		isArray: Array.isArray(restaurantId),
		finalId: restaurantIdString
	});

	// Early return if no restaurantId
	if (!restaurantIdString) {
		console.log('❌ No restaurant ID provided to route');
		return (
			<SafeAreaView>
				<Stack.Screen options={{ title: 'Restaurant Not Found' }} />
			</SafeAreaView>
		);
	}

	return (
		<>
			<Stack.Screen options={{ title: `${singleRestaurant?.Name}`, contentStyle: { backgroundColor: COLORS.primary } }} />
			<SafeAreaView>
				<ScrollView>
					<IndividualRestaurant restaurantId={restaurantIdString} />
				</ScrollView>
				{singleRestaurant ? <ViewOrderButton /> : null}
			</SafeAreaView>
		</>
	);
};

export default RestaurantPage;

