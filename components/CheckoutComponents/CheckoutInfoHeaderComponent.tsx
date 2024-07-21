import React from 'react';
import { COLORS } from '../../constants';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider } from '@components/Divider';
import { useAppSelector } from 'redux/hooks';

export const CheckoutInfoHeaderComponent = () => {
	const userOrders = useAppSelector((state) => state?.orders?.order);
	const restaurantName = useAppSelector((state) => state?.orders?.order[0]).restaurant?.Name || 'Unknown Restaurant';
	const totalPrice = userOrders.reduce((acc, curr) => acc + curr.price, 0);
	console.log('totalPrice', totalPrice);
	const user = useAppSelector((state) => state?.auth);

	console.log('userOrders', userOrders);
	return (
		<View style={styles.checkoutContainer}>
			<View style={styles.infoHeader}>
				<Text style={styles.infoText}>{`${restaurantName}`}</Text>
				<TouchableOpacity onPress={() => console.log('add more items')}>
					<Text style={styles.infoAddMoreText}>Add more items</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.menuItems}>
				{userOrders.map((order) => (
					<View style={styles.row} key={order.itemName}>
						<View style={styles.itemDetails}>
							<Text style={styles.itemText}>{order.quantity}</Text>
							<Text style={styles.itemText}>{order.itemName}</Text>
						</View>
						<Text style={[styles.itemText, { fontWeight: 'bold' }]}>${order.price}</Text>
					</View>
				))}
			</View>
			<Divider color={COLORS.black} />
		</View>
	);
};

const styles = StyleSheet.create({
	checkoutContainer: {
		flexDirection: 'column',
		flex: 1,
		paddingTop: 20,
	},
	infoHeader: {
		gap: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 10,
	},
	infoText: {
		fontSize: 24,
		fontWeight: '700',
		paddingLeft: 10,
	},
	infoAddMoreText: {
		marginTop: 7,
		color: COLORS.secondary,
		fontSize: 15,
		paddingRight: 10,
	},
	infoTextConfirm: {
		fontSize: 18,
	},
	menuItems: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 5, // Adds vertical padding between rows
		paddingHorizontal: 10, // Adds horizontal padding within a row
	},
	itemDetails: {
		flexDirection: 'row',
	},
	itemText: {
		marginRight: 10, // Adds space between items in a row
		// additional text styles
	},
});
