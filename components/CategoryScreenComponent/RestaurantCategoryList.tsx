import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Restaurant } from 'types/types';

// Define the interface for the props
interface RestaurantCategoryListProps {
	restaurants: Restaurant[];
}

export const RestaurantCategoryList = ({ restaurants }: RestaurantCategoryListProps): JSX.Element => {
	return (
		<View>
			<Text>RestaurantCategoryList</Text>
			{restaurants.map((restaurant) => (
				<Text key={restaurant.RestaurantId}>{restaurant.Name}</Text>
			))}
		</View>
	);
};



const styles = StyleSheet.create({});
