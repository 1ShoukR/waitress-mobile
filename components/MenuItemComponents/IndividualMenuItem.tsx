import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';
import NumericInput from 'react-native-numeric-input';
import { COLORS } from '../../constants';
import { updateOrderItem } from '../../redux/orderSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { MenuItem } from 'types/types';
const IndividualMenuItem = ({ menuItem }: { menuItem: MenuItem }): React.JSX.Element => {
	const placeholderImage = 'https://via.placeholder.com/150';
	const screenWidth = Dimensions.get('window').width;
	const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
	const slideAnim = useRef<Animated.Value>(new Animated.Value(100)).current; // Initial position below the screen
	const [quantity, setQuantity] = useState<number>(0);
	const dispatch = useAppDispatch();
	const singleRestaurant = useAppSelector((state) => state?.restaurant?.singleRestaurant);
	const orders = useAppSelector((state) => state?.orders.order);
	const toast = useToast();


	useEffect((): void => {
		if (quantity > 0) {
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(slideAnim, {
				toValue: 100, // Slide back down
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [quantity]);

	useEffect((): void => {
		console.log('Current Bag:', orders);
	}, [orders]);

	const handleAddToOrder = (): void => {
		dispatch(
			updateOrderItem({
				itemName: menuItem.NameOfItem,
				quantity: quantity,
				price: Number((quantity * menuItem.Price).toFixed(2)),
				restaurant: singleRestaurant!,
			})
		);
		toast.show('Added to Order!', {
			type: 'success',
			placement: 'bottom',
			duration: 2000,
			icon: <FontAwesomeIcon icon={faCheck} size={20} color="#fff" />,
			style: {
				position: 'absolute',
				bottom: 130,
				borderRadius: 5,
				padding: 10,
				gap: 10,
				flexDirection: 'row-reverse',
			},
		});
	};

	return (
		<>
			<ScrollView>
				<View style={styles.cardContainer}>
					{menuItem.ImageURL ? (
						<Image
							source={{
								uri: 'https://www.allrecipes.com/thmb/QSsjryxShEx1L6o0HLer1Nn4jwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/54165-balsamic-bruschetta-DDMFS-4x3-e2b55b5ca39b4c1783e524a2461634ea.jpg',
							}}
							style={[styles.image, { width: screenWidth, height: screenWidth / 1.8 }]}
						/>
					) : null}
					<View style={styles.textContainer}>
						<Text style={styles.itemName}>{menuItem.NameOfItem}</Text>
						<Text style={styles.itemPrice}>${menuItem.Price}</Text>
					</View>
					<Text style={styles.itemDescription}>{menuItem.Description}</Text>
					<View style={styles.quantityContainer}>
						<Text style={{ marginTop: 12, fontSize: 15, paddingLeft: 10 }}>How many would you like?</Text>
						<View style={{ paddingRight: 10 }}>
							<NumericInput
								value={quantity}
								onChange={(value) => setQuantity(value)}
								totalWidth={110}
								rounded
								separatorWidth={0}
								editable={false}
								type="plus-minus"
								minValue={0}
								rightButtonBackgroundColor={COLORS.primary}
								leftButtonBackgroundColor={COLORS.primary}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
			<Animated.View style={[styles.addToBagContainer, { transform: [{ translateY: slideAnim }] }]}>
				<TouchableOpacity onPress={handleAddToOrder}>
					<View style={styles.addToBagButton}>
						<Text style={styles.addToBagText}>Add to Order</Text>
						<Text style={styles.addToBagTotal}>{`${quantity}x $${(quantity * menuItem.Price).toFixed(2)}`}</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
		</>
	);
};

export default IndividualMenuItem;

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: COLORS.primary,
	},
	image: {
		marginTop: -10,
	},
	textContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '96%',
		paddingTop: 10,
		paddingLeft: 10,
	},
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.secondary,
	},
	itemPrice: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.secondary,
	},
	itemDescription: {
		fontSize: 15,
		paddingTop: 3,
		marginRight: 43,
		color: COLORS.gray600,
		paddingLeft: 10,
	},
	quantityContainer: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	addToBagContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		padding: 20,
	},
	addToBagButton: {
		backgroundColor: COLORS.secondary,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
	},
	addToBagText: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: 'bold',
	},
	addToBagTotal: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: 'bold',
	},
});
