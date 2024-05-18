import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants';
import { Avatar, Button, Card } from 'react-native-paper';
import React from 'react'

const TopRestaurantsComponent = ({ topRestaurants }) => {
	console.log('topRestaurants', topRestaurants)
	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: COLORS.white }}>Top Restaurants</Text>
			{topRestaurants?.map((restaurant, index) => (
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

export default TopRestaurantsComponent

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
		color: COLORS.white,
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
		color: COLORS.secondary,
		marginTop: 10,
	},
	restaurantDetails: {
		fontSize: 14,
		color: COLORS.secondary,
		marginTop: 5,
	},
});
