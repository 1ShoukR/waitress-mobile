import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../constants';
import React from 'react'

const LocalRestaurantsComponent = ({ localRestaurants }) => {
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: COLORS.white }}>Local Restaurants</Text>
			{localRestaurants?.localRestaurants?.data?.map((restaurant, index) => (
				<Text key={index} style={{ marginVertical: 5, padding: 10, color: COLORS.white, borderRadius: 5 }}>
					{restaurant?.name}
				</Text>
			))}
		</View>
	);
};

export default LocalRestaurantsComponent

const styles = StyleSheet.create({})