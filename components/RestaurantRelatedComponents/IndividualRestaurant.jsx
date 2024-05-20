import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { getSingleRestaurant } from '../../redux/thunk';
import { COLORS } from '../../constants';

const IndividualRestaurant = ({ restaurantId }) => {
	const dispatch = useDispatch();
	const singleRestaurant = useSelector((state) => state?.restaurant?.singleRestaurant);
	const foodCategories = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Thai'];

	useEffect(() => {
		if (restaurantId) {
			dispatch(getSingleRestaurant({ restaurantId }));
		}
	}, [restaurantId]);

	const renderStars = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(<FontAwesome key={i} name={i <= rating ? 'star' : 'star-o'} size={18} color={COLORS.black} />);
		}
		return stars;
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				{singleRestaurant ? (
					<>
						<Image source={{ uri: singleRestaurant.ImageURL }} style={styles.cardImage} />
						<View style={styles.cardContainer}>
							<View style={styles.card}>
								<View style={styles.cardContent}>
									<Text style={styles.restaurantName}>{singleRestaurant.Name}</Text>
									<View style={styles.ratingContainer}>
										{/* Hacky way of rendering average stars */}
										{renderStars(singleRestaurant.Ratings.reduce((sum, review) => sum + review.Rating, 0) / singleRestaurant.Ratings.length)}
										<Text style={styles.ratingText}>{singleRestaurant.Ratings.length} Reviews</Text>
									</View>
									<View style={styles.tagContainer}>
										{foodCategories.map((category, index) => {
											return (
												<TouchableOpacity onPress={() => console.log('This will push a user to a category page showing all restaurants with the category')} key={index} style={styles.tag}>
													<Text style={{ fontWeight: 'bold' }}>{category}</Text>
												</TouchableOpacity>
											);
										})}
									</View>
									<Text style={styles.restaurantAddress}>{singleRestaurant.Address}</Text>
									<Text style={styles.restaurantDetails}>{`Phone: ${singleRestaurant.Phone}`}</Text>
									<Text style={styles.restaurantDetails}>{`Email: ${singleRestaurant.Email}`}</Text>
									<Text style={styles.restaurantDetails}>{`Number of Tables: ${singleRestaurant.NumberOfTables}`}</Text>
								</View>
							</View>
						</View>
					</>
				) : (
					<Text style={styles.loadingText}>Loading...</Text>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default IndividualRestaurant;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primary,
	},
	scrollViewContent: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	cardContainer: {
		marginBottom: 15,
	},
	card: {
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.3)', // Faint lightModeText outline
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	cardImage: {
		width: '100%', // Full width of the screen
		height: 200,
	},
	cardContent: {
		padding: 10,
		backgroundColor: COLORS.primary,
	},
	tagContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	tag: {
		color: COLORS.lightModeText,
		backgroundColor: COLORS.gray,
		padding: 10,
		margin: 5,
		borderRadius: 50,
	},
	restaurantName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: COLORS.lightModeText,
		textAlign: 'center', // Center the restaurant name
		marginBottom: 10,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		justifyContent: 'center',
	},
	ratingText: {
		marginLeft: 5,
		fontSize: 16,
		color: COLORS.black,
	},
	restaurantAddress: {
		fontSize: 14,
		color: COLORS.black,
		marginBottom: 5,
	},
	restaurantDetails: {
		fontSize: 14,
		color: COLORS.black,
		marginBottom: 5,
	},
	loadingText: {
		color: COLORS.lightModeText,
		textAlign: 'center',
		marginTop: 20,
	},
	reviewContainer: {
		marginVertical: 10,
		paddingHorizontal: 20,
	},
	comment: {
		fontSize: 16,
		marginBottom: 5,
		color: COLORS.lightModeText,
	},
	starsContainer: {
		flexDirection: 'row',
	},
});
