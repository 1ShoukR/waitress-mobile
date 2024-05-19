import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRestaurant } from '../../../../redux/thunk';
import { COLORS } from '../../../../constants';
import { FontAwesome } from '@expo/vector-icons';

const RestaurantPage = () => {
	const { restaurantId } = useLocalSearchParams();
	const dispatch = useDispatch();
	const singleRestaurant = useSelector((state) => state?.restaurant?.singleRestaurant);

	useEffect(() => {
		dispatch(getSingleRestaurant({ restaurantId }));
	}, [restaurantId]);

	const renderStars = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(<FontAwesome key={i} name={i <= rating ? 'star' : 'star-o'} size={18} color={COLORS.secondary} />);
		}
		return stars;
	};

	return (
		<>
			<Stack.Screen options={{ title: `Restaurant ${restaurantId}` }} />
			<SafeAreaView style={styles.container}>
				<ScrollView contentContainerStyle={styles.scrollViewContent}>
					{singleRestaurant ? (
						<View style={styles.cardContainer}>
							<View style={styles.card}>
								<Image source={{ uri: singleRestaurant.ImageURL }} style={styles.cardImage} />
								<View style={styles.cardContent}>
									<Text style={styles.restaurantName}>{singleRestaurant.Name}</Text>
									<View style={styles.ratingContainer}>
										{renderStars(singleRestaurant.AverageRating)}
										<Text style={styles.ratingText}>{singleRestaurant.AverageRating}</Text>
									</View>
									<Text style={styles.restaurantAddress}>{singleRestaurant.Address}</Text>
									<Text style={styles.restaurantDetails}>{`Phone: ${singleRestaurant.Phone}`}</Text>
									<Text style={styles.restaurantDetails}>{`Email: ${singleRestaurant.Email}`}</Text>
									<Text style={styles.restaurantDetails}>{`Number of Tables: ${singleRestaurant.NumberOfTables}`}</Text>
								</View>
							</View>
						</View>
					) : (
						<Text style={styles.loadingText}>Loading...</Text>
					)}
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default RestaurantPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primary,
	},
	scrollViewContent: {
		padding: 10,
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
		height: 200,
		width: '100%',
	},
	cardContent: {
		padding: 10,
		backgroundColor: COLORS.primary,
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
	restaurantAddress: {
		fontSize: 14,
		color: COLORS.secondary,
		marginBottom: 5,
	},
	restaurantDetails: {
		fontSize: 14,
		color: COLORS.secondary,
	},
	loadingText: {
		color: COLORS.white,
		textAlign: 'center',
		marginTop: 20,
	},
});
