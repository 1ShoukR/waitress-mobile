import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { COLORS } from '../constants';
import React, { memo } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const LocalRestaurantsComponent = ({ localRestaurants, isLoading }) => {
	const localRestaurantsData = localRestaurants?.localRestaurants;
	console.log('Local Restaurants:', localRestaurants);

	const handlePress = (restaurant) => {
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
			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContentContainer}>
					{localRestaurantsData.map((item) => (
						<TouchableOpacity key={item.RestaurantId} onPress={() => handlePress(item)} style={styles.cardContainer}>
							<View style={styles.card}>
								<Image source={{ uri: item?.ImageURL }} style={styles.cardImage} />
								<View style={styles.cardContent}>
									<Text style={styles.restaurantName}>{item?.Name}</Text>
									<View style={styles.ratingContainer}>
										{renderStars(item?.Ratings.reduce((sum, review) => sum + review.Rating, 0) / item.Ratings.length)}
										<Text style={styles.ratingText}>{item?.Ratings.length > 0 ? item?.Ratings.length + ' Reviews' : item?.Ratings.length + ' Review'}</Text>
									</View>
									<Text style={styles.restaurantTags}>Tags</Text>
									<View style={{ flexDirection: 'row', gap: 7, paddingTop: 7 }}>
										{item?.Categories?.map((category, index) => (
											<TouchableOpacity key={index} onPress={() => router.push(`/category/${category.CategoryID}`)}>
												<Text style={{ fontSize: 12, color: COLORS.secondary }}>{category.CategoryName}</Text>
											</TouchableOpacity>
										))}
									</View>
									<Text style={styles.restaurantDetails}>{item?.Details}</Text>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default memo(LocalRestaurantsComponent);

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: COLORS.primary,
		flex: 1,
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
		color: COLORS.lightModeText,
		marginLeft: 10,
	},
	scrollViewContentContainer: {
		paddingVertical: 10,
	},
	cardContainer: {
		marginRight: 15,
		borderRadius: 10,
		backgroundColor: COLORS.cardBackground,
		borderWidth: 1,
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
		width: 220, // Adjust the width to your preference
		marginVertical: 5,
	},
	card: {
		borderRadius: 10,
		overflow: 'hidden',
	},
	cardImage: {
		height: 120,
		width: '100%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	cardContent: {
		padding: 10,
		backgroundColor: COLORS.primary,
	},
	restaurantName: {
		fontSize: 16,
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
		fontSize: 14,
		color: COLORS.gray,
	},
	restaurantTags: {
		fontSize: 12,
		color: COLORS.black,
		marginBottom: 5,
	},
	restaurantDetails: {
		fontSize: 12,
		color: COLORS.secondary,
	},
});
