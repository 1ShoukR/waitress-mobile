import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../constants';
import React from 'react'

const TopRestaurantsComponent = ({ topRestaurants }) => {
	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: COLORS.white }}>Top Restaurants</Text>
			{topRestaurants.map((restaurant, index) => (
				<Text key={index} style={{ marginVertical: 5, padding: 10, color: COLORS.white, borderRadius: 5 }}>
					{restaurant}
				</Text>
			))}
		</View>
	);
};

export default TopRestaurantsComponent

const styles = StyleSheet.create({})