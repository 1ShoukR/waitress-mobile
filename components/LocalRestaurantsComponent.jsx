import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
import React from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import { router } from 'expo-router';

const LocalRestaurantsComponent = ({ localRestaurants }) => {
	const localRestaurantsData = localRestaurants?.localRestaurants?.restaurants;
	console.log('Local Restaurants:', localRestaurants);

	const handlePress = (restaurant) => {
		// Handle the card click event here
		console.log('Restaurant clicked:', restaurant.Name);
		router.push(`/home/restaurant/${restaurant.RestaurantId}`);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Restaurants Near You</Text>
			{localRestaurantsData?.map((restaurant, index) => (
				<TouchableOpacity key={index} onPress={() => handlePress(restaurant)} style={styles.cardContainer}>
					<Card style={styles.card}>
						<Card.Cover source={{ uri: restaurant?.ImageURL }} style={styles.cardImage} />
						<Card.Content>
							<Text style={styles.restaurantName}>{restaurant?.Name}</Text>
							<Text style={styles.restaurantDetails}>{restaurant?.Details}</Text>
						</Card.Content>
					</Card>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default LocalRestaurantsComponent;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: COLORS.background,
		flex: 1,
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		color: COLORS.lightModeText,
	},
	cardContainer: {
		marginBottom: 15,
	},
	card: {
		backgroundColor: COLORS.cardBackground,
		borderRadius: 10,
	},
	cardImage: {
		height: 150,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	restaurantName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.lightModeText,
		marginTop: 10,
	},
	restaurantDetails: {
		fontSize: 14,
		color: COLORS.lightModeText,
		marginTop: 5,
	},
});
