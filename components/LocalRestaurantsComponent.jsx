import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const LocalRestaurantsComponent = ({ localRestaurants }) => {
	const localRestaurantsData = localRestaurants?.localRestaurants;
	console.log('Local Restaurants:', localRestaurants);

	const handlePress = (restaurant) => {
		// Handle the card click event here
		console.log('Restaurant clicked:', restaurant.Name);
		router.push(`/home/restaurant/${restaurant.RestaurantId}`);
	};

	const renderStars = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(<FontAwesome key={i} name={i <= rating ? 'star' : 'star-o'} size={18} color={COLORS.black} />);
		}
		return stars;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Restaurants Near You</Text>
			{localRestaurantsData?.map((restaurant, index) => {
				console.log('Restaurant:', restaurant.Ratings);
				return (
					<TouchableOpacity key={index} onPress={() => handlePress(restaurant)} style={styles.cardContainer}>
						<View style={styles.card}>
							<Image source={{ uri: restaurant?.ImageURL }} style={styles.cardImage} />
							<View style={styles.cardContent}>
								<Text style={styles.restaurantName}>{restaurant?.Name}</Text>
								<View style={styles.ratingContainer}>
									{renderStars(restaurant?.Ratings.reduce((sum, review) => sum + review.Rating, 0) / restaurant.Ratings.length)}
									<Text style={styles.ratingText}>{restaurant?.Ratings.length > 0 ? restaurant?.Ratings.length + ' Reviews' : restaurant?.Ratings.length + ' Review'}</Text>
								</View>
								<Text style={styles.restaurantTags}>Tags</Text>
								<Text style={styles.restaurantDetails}>{restaurant?.Details}</Text>
							</View>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default LocalRestaurantsComponent;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: COLORS.primary,
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
		borderRadius: 10,
		backgroundColor: COLORS.cardBackground,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 12,
	},
	card: {
		borderRadius: 10,
		overflow: 'hidden',
	},
	cardImage: {
		height: 150,
		width: '100%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	cardContent: {
		padding: 10,
		backgroundColor: COLORS.primary,
	},
	restaurantName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.black,
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
		color: COLORS.gray,
	},
	restaurantTags: {
		fontSize: 14,
		color: COLORS.black,
		marginBottom: 5,
	},
	restaurantDetails: {
		fontSize: 14,
		color: COLORS.secondary,
	},
});
