import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { getSingleRestaurant } from '../../redux/thunk';
import { COLORS } from '../../constants';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { MenuItem } from 'types/types';
import client from 'api/client';

const IndividualRestaurant = ({ restaurantId }: { restaurantId: string  }): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const singleRestaurant = useAppSelector((state) => state?.restaurant?.singleRestaurant);
	const placeholderImage = 'https://via.placeholder.com/150';
	const apiToken = useAppSelector((state) => state.auth.apiToken);

	useEffect(() => {
		if (restaurantId) {
			let stringId: string = restaurantId?.toString();
			dispatch(getSingleRestaurant({ restaurantId: stringId, apiToken: apiToken }));
		}
	}, [restaurantId]);
	// Render stars based on rating
	const renderStars = (rating: number) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(<FontAwesome key={i} name={i <= rating ? 'star' : 'star-o'} size={18} color={COLORS.gray600} />);
		}
		return stars;
	};

	// Categorize menu items into predefined categories
	const categorizeMenuItems = (menuItems: MenuItem[]): { [key: string]: MenuItem[] } => {
		// We can grab all the restaurant's categorires, and make the categories based on those here, rather than hardcoding them
		// instead of const categories = { Appetizers: [], Mains: [], Desserts: [], Other: [] };
		const categories: { [key: string]: MenuItem[] } = { Appetizers: [], Mains: [], Desserts: [], Other: [] };
		menuItems?.forEach((item) => {
			const category = item?.Category?.CategoryID || 'Other';
			if (categories[category]) {
				categories[category].push(item);
			} else {
				categories?.Other?.push(item);
			}
		});
		return categories;
	};

	const addToFavorites = () => {
		const payload = {
			restaurantId: restaurantId,
			apiToken: apiToken,
		}
		// POST to addToFavortise route
	}

	const categorizedMenuItems: {[key: string]: MenuItem[]} = singleRestaurant ? categorizeMenuItems(singleRestaurant.MenuItems!) : {};
	const categoryOrder: string[] = ['Appetizers', 'Mains', 'Desserts', 'Other'];

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
										<TouchableOpacity onPress={() => console.log('take user to reviews page')} style={{ flexDirection: 'row' }}>
											{renderStars(singleRestaurant.Ratings!?.reduce((sum, review) => sum + review.Rating!, 0) / singleRestaurant.Ratings!?.length)}
											<Text style={styles.ratingText}>{singleRestaurant.Ratings!?.length} Reviews</Text>
										</TouchableOpacity>
										<Text style={styles.restaurantAddress}>{singleRestaurant.Address}</Text>
										<Text style={styles.restaurantDetails}>{`Phone: ${singleRestaurant.Phone}`}</Text>
										<Text style={styles.restaurantDetails}>{`Email: ${singleRestaurant.Email}`}</Text>
									</View>
									<View style={styles.tagContainer}>
										{singleRestaurant?.Categories?.map((category, index) => (
											<TouchableOpacity onPress={() => router.push(`/home/category/${category.CategoryID}`)} key={index} style={styles.tag}>
												<Text style={{ fontWeight: 'bold' }}>{category?.CategoryName}</Text>
											</TouchableOpacity>
										))}
									</View>
									<View style={styles.separator} />
									<View style={styles.tablesContainer}>
										<Text style={styles.tableNumber}>{`Available Tables: ${singleRestaurant.NumberOfTables}`}</Text>
											<View style={styles.reserveButtonContent}>
												<TouchableOpacity onPress={addToFavorites} >
													<FontAwesome name="star-o" size={24}  style={styles.reserveButtonIcon} />
												</TouchableOpacity>
												<TouchableOpacity onPress={() => router.push(`/home/reserve/ReserveScreen`)} style={styles.reserveButton}>
														<Text style={styles.reserveButtonText}>Reserve Now</Text>
												</TouchableOpacity>
											</View>
									</View>
									<View style={styles.separator} />
									<View style={{ justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.menuTitle}>Menu</Text>
									</View>
									{categoryOrder.map(
										(category) => {
											console.log('category', category)
											console.log('categorizedMenuItems[category]', categorizedMenuItems[category])
											return (
												categorizedMenuItems[category] &&
												categorizedMenuItems[category]?.length > 0 && (
													<View key={category} style={styles.menuCategory}>
														<Text style={styles.menuCategoryTitle}>{category}</Text>
														{categorizedMenuItems[category].map((item) => {
															console.log('item', item)
															console.log('item?.MenuItemId', item?.MenuID)
															return (
														<TouchableOpacity key={item?.MenuID} onPress={() => router.push(`/home/menu/${item?.MenuID}`)}>
															<View style={styles.menuItem}>
																<Image source={{ uri: item?.ImageUrl }} style={styles.menuItemImage} />
																<View style={styles.menuItemDetails}>
																	<Text style={styles.menuItemName}>{item.NameOfItem}</Text>
																	<Text style={styles.menuItemDescription}>{'This is a mock description.'}</Text>
																	<Text style={styles.menuItemPrice}>{`$${item?.Price?.toFixed(2)}`}</Text>
																</View>
															</View>
														</TouchableOpacity>
															)})}
													</View>
												)
										)})}
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
		borderColor: 'rgba(255, 255, 255, 0.3)',
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	cardImage: {
		width: '100%',
		height: 200,
	},
	cardContent: {
		padding: 10,
		backgroundColor: COLORS.primary,
	},
	separator: {
		height: 1,
		backgroundColor: COLORS.gray,
		marginVertical: 10,
	},
	tagContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	tag: {
		color: COLORS.lightModeText,
		backgroundColor: COLORS.secondary,
		padding: 10,
		margin: 5,
		borderRadius: 50,
	},
	restaurantName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: COLORS.lightModeText,
		textAlign: 'center',
		marginBottom: 10,
	},
	ratingContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: 10,
		justifyContent: 'center',
	},
	ratingText: {
		marginLeft: 5,
		fontSize: 16,
		color: COLORS.gray800,
	},
	restaurantAddress: {
		fontSize: 14,
		color: COLORS.gray600,
		marginBottom: 5,
	},
	restaurantDetails: {
		fontSize: 14,
		color: COLORS.gray600,
		marginBottom: 5,
	},
	tableNumber: {
		fontSize: 16,
		color: COLORS.black,
		fontWeight: 'bold',
	},
	tablesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	reserveButton: {
		backgroundColor: COLORS.secondary,
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 5,
	},
	reserveButtonContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	reserveButtonText: {
		color: COLORS.lightModeText,
		fontSize: 14,
		fontWeight: 'bold',
		marginRight: 5,
	},
	reserveButtonIcon: {
		marginRight: 10,
	},
	loadingText: {
		color: COLORS.lightModeText,
		textAlign: 'center',
		marginTop: 20,
	},
	menuTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: COLORS.lightModeText,
		marginBottom: 10,
	},
	menuCategory: {
		marginBottom: 20,
	},
	menuCategoryTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.lightModeText,
		marginBottom: 10,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	menuItemImage: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginRight: 10,
	},
	menuItemDetails: {
		flex: 1,
	},
	menuItemName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: COLORS.lightModeText,
		marginBottom: 5,
	},
	menuItemDescription: {
		fontSize: 14,
		color: COLORS.gray600,
		marginBottom: 5,
	},
	menuItemPrice: {
		fontSize: 14,
		color: COLORS.secondary,
		fontWeight: 'bold',
	},
});