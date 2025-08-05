import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import React, { memo } from 'react';
import { COLORS } from '../constants';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Restaurant } from 'types/types';

const TopRestaurantsComponent = ({ 
	topRestaurants, isLoading 
}: { 
	topRestaurants: Restaurant[], 
	isLoading: boolean  
}) => {
	const restaurantsData = topRestaurants || [];

	const renderStars = (rating: number): React.JSX.Element[] => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(<FontAwesome key={i} name={i <= rating ? 'star' : 'star-o'} size={18} color={COLORS.black} />);
		}
		return stars;
	};
	const handlePress = (restaurantId: number): void => {
		console.log('Restaurant clicked:', restaurantId);
		router.push(`/home/restaurant/${restaurantId}`);
	};

	const renderItem = ({ item }: { item: Restaurant }) => (
		<TouchableOpacity key={item.RestaurantId} onPress={(): void => handlePress(item.RestaurantId)} style={styles.cardContainer}>
			<View style={styles.card}>
				<Image source={{ uri: item?.ImageURL }} style={styles.cardImage} />
				<View style={styles.cardContent}>
					<Text style={styles.restaurantName}>{item?.Name}</Text>
					<View style={styles.ratingContainer}>
						{item?.Ratings && item.Ratings.length > 0 ? (
							<>
								{renderStars(item.Ratings.reduce((sum, review) => sum + review.Rating, 0) / item.Ratings.length)}
								<Text style={styles.ratingText}>{item.Ratings.length} {item.Ratings.length === 1 ? 'Review' : 'Reviews'}</Text>
							</>
						) : (
							<Text style={styles.ratingText}>No reviews yet</Text>
						)}
					</View>
					<Text style={styles.restaurantTags}>Tags</Text>
					<View style={{ flexDirection: 'row', gap: 7, paddingTop: 7, paddingBottom: 10 }}>
						{item?.Categories?.map((category, index) => {
							return (
								<TouchableOpacity key={index} onPress={() => router.push(`/category/${category.CategoryID}`)}>
									<Text style={{ fontSize: 12, color: COLORS.secondary }}>{category?.CategoryName}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<>
			<Text style={styles.headerText}>Top Restaurants</Text>
			{isLoading ? (
				<ActivityIndicator size="large" />
			) : restaurantsData.length > 0 ? (
				<FlatList
					data={restaurantsData}
					renderItem={renderItem}
					keyExtractor={(item) => item?.RestaurantId?.toString()}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			) : (
				<View style={styles.noDataContainer}>
					<Text style={styles.noDataText}>No top restaurants found</Text>
				</View>
			)}
		</>
	);
};

export default memo(TopRestaurantsComponent);

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
		marginLeft: 10
	},
	scrollViewContentContainer: {
		paddingVertical: 10,
	},
	cardContainer: {
		marginRight: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
		width: 220, 
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
	noDataContainer: {
		alignItems: 'center',
		paddingVertical: 20,
	},
	noDataText: {
		fontSize: 16,
		color: COLORS.gray,
	},
});
