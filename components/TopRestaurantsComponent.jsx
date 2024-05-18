import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';
import { FontAwesome } from '@expo/vector-icons';

const TopRestaurantsComponent = ({ topRestaurants }) => {
	console.log('topRestaurants', topRestaurants);

	const renderStars = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(<FontAwesome key={i} name={i <= rating ? 'star' : 'star-o'} size={18} color={COLORS.secondary} />);
		}
		return stars;
	};
	const handlePress = (restaurantId) => {
		// Handle the card click event here
		console.log('Restaurant clicked:', restaurantId);
	
	}

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Top Restaurants</Text>
			{topRestaurants?.map((restaurant, index) => {
				console.log('restaurant id', restaurant);
				return (
				<TouchableOpacity key={index} onPress={() => handlePress(restaurant.RestaurantId)} style={styles.cardContainer}>
					<View style={styles.card}>
						<Image source={{ uri: restaurant?.ImageURL }} style={styles.cardImage} />
						<View style={styles.cardContent}>
							<Text style={styles.restaurantName}>{restaurant?.Name}</Text>
							<View style={styles.ratingContainer}>
								{renderStars(restaurant?.Rating)}
								<Text style={styles.ratingText}>{restaurant?.Rating}</Text>
							</View>
							<Text style={styles.restaurantTags}>Tags</Text>
							<Text style={styles.restaurantDetails}>{restaurant?.Details}</Text>
						</View>
					</View>
				</TouchableOpacity>
				)
			}
			)}
		</View>
	);
};

export default TopRestaurantsComponent;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: '#2A2C3B',
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
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	cardImage: {
		height: 150,
		width: '100%',
	},
	cardContent: {
		padding: 10,
		backgroundColor: '#2A2C3B',
	},
	restaurantName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.secondary,
		marginBottom: 5,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	ratingText: {
		marginLeft: 5,
		fontSize: 16,
		color: COLORS.secondary,
	},
	restaurantTags: {
		fontSize: 14,
		color: COLORS.secondary,
		marginBottom: 5,
	},
	restaurantDetails: {
		fontSize: 14,
		color: COLORS.secondary,
	},
});
