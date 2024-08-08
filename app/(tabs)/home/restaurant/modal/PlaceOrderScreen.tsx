import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import { useAppSelector } from 'redux/hooks';
import { COLORS } from '../../../../../constants';

const fakeWaiter = {
	name: 'John Doe',
	image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', // Example image URL
};

const ConfirmOrderScreen = () => {
	const userOrders = useAppSelector((state) => state.orders.order);
	const restaurant = userOrders[0]?.restaurant;
	const [customTip, setCustomTip] = useState<string>('');
	const [selectedTip, setSelectedTip] = useState<number>();

	const handleAddressPress = () => {
		// Implement the logic to open maps or copy the address
		alert(`Opening maps or copying address: ${restaurant?.Address}`);
	};

	const handleTipSelection = (tip: number) => {
    console.log(tip);
		setSelectedTip(tip);
		setCustomTip('');
	};

	return (
		<ScrollView style={styles.container}>
			{restaurant && (
				<View>
					<Image source={{ uri: restaurant.ImageURL }} style={styles.restaurantImage} />
					<View style={styles.restaurantInfo}>
						<View style={styles.restaurantInfoHeader}>
							<Text style={styles.restaurantName}>{restaurant.Name}</Text>
							<TouchableOpacity style={styles.addressPill} onPress={handleAddressPress}>
								<Text style={styles.addressPillText}>{restaurant.Address}</Text>
								<FontAwesomeIcon icon={faLocationArrow} style={styles.addressPillIcon} />
							</TouchableOpacity>
						</View>
						<Text style={styles.restaurantPhone}>{restaurant.Phone}</Text>
					</View>
				</View>
			)}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Assigned Waiter</Text>
				<View style={styles.waiterContainer}>
					<Image source={{ uri: fakeWaiter.image }} style={styles.waiterImage} />
					<Text style={styles.waiterName}>{fakeWaiter.name}</Text>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Your Order</Text>
				{userOrders.map((order, index) => (
					<View key={index} style={styles.orderContainer}>
						<Image source={{ uri: order.imageUrl }} style={styles.orderImage} />
						<View style={styles.orderDetails}>
							<Text style={styles.orderItemName}>{order.itemName}</Text>
							<Text style={styles.orderItemPrice}>${order.price.toFixed(2)}</Text>
							<Text style={styles.orderItemQuantity}>Quantity: {order.quantity}</Text>
						</View>
					</View>
				))}
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Tip Amount</Text>
				<View style={styles.tipContainer}>
					{[10, 15, 20].map((tip) => (
						<TouchableOpacity key={tip} style={[styles.tipButton, selectedTip === tip && styles.selectedTipButton]} onPress={() => handleTipSelection(tip)}>
							<Text style={styles.tipButtonText}>{tip}%</Text>
						</TouchableOpacity>
					))}
					<TextInput
						style={styles.customTipInput}
						placeholder="Custom Tip"
						value={customTip}
						keyboardType="numeric"
						onChangeText={(text) => {
							setCustomTip(text);
							setSelectedTip(undefined);
						}}
					/>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Payment Options</Text>
				<View style={styles.paymentOption}>
					<Text style={styles.paymentOptionText}>Credit Card</Text>
				</View>
				<View style={styles.paymentOption}>
					<Text style={styles.paymentOptionText}>PayPal</Text>
				</View>
				<View style={styles.paymentOption}>
					<Text style={styles.paymentOptionText}>Apple Pay</Text>
				</View>
			</View>
			<Button title="Confirm Order" onPress={() => alert('Order Confirmed!')} />
		</ScrollView>
	);
};

export default ConfirmOrderScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primary,
	},
	restaurantImage: {
		width: '100%',
		height: 200,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	restaurantInfo: {
		padding: 16,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	restaurantInfoHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	restaurantName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333333',
	},
	addressPill: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#ADD8E6', // Light blue background
		borderColor: '#0000FF', // Solid blue border
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
	},
	addressPillIcon: {
		color: '#0000FF', // Solid blue color
		marginLeft: 5,
	},
	addressPillText: {
		color: '#0000FF', // Solid blue text
		fontSize: 14,
	},
	restaurantPhone: {
		fontSize: 16,
		color: '#666666',
		marginTop: 10,
	},
	section: {
		marginVertical: 20,
		paddingHorizontal: 16,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333333',
		marginBottom: 10,
	},
	waiterContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	waiterImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 10,
	},
	waiterName: {
		fontSize: 16,
		color: '#333333',
	},
	orderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		marginBottom: 10,
		borderColor: COLORS.black,
		borderWidth: 1,
	},
	orderImage: {
		width: 75,
		height: 75,
		borderRadius: 9,
		marginRight: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
	},
	orderDetails: {
		flex: 1,
	},
	orderItemName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333333',
	},
	orderItemPrice: {
		fontSize: 16,
		color: '#666666',
	},
	orderItemQuantity: {
		fontSize: 14,
		color: '#666666',
	},
	tipContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	tipButton: {
		backgroundColor: COLORS.primary, 
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	selectedTipButton: {
		backgroundColor: '#ADD8E6', // Solid blue background for selected tip
	},
	tipButtonText: {
		color: '#0000FF', // Solid blue text
		fontSize: 16,
	},
	customTipInput: {
		backgroundColor: '#ffffff',
		padding: 10,
		borderRadius: 10,
		borderColor: '#0000FF',
		borderWidth: 1,
		width: 100,
		textAlign: 'center',
	},
	paymentOption: {
		backgroundColor: '#ffffff',
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	paymentOptionText: {
		fontSize: 16,
		color: '#333333',
	},
});
