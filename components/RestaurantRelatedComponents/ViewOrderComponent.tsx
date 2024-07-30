import { StyleSheet,  ScrollView } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';
import { useAppSelector } from 'redux/hooks';
import { CheckoutInfoHeaderComponent } from '@components/CheckoutComponents/CheckoutInfoHeaderComponent';
import { CheckoutTotalComponent } from '@components/CheckoutComponents/CheckoutTotalComponent';

const ViewOrderComponent = (): React.JSX.Element => {
	const userOrders = useAppSelector((state) => state?.orders?.order);
	const restaurantName = useAppSelector((state) => state?.orders?.order[0]!).restaurant?.Name || 'Unknown Restaurant';
	const totalPrice = userOrders.reduce((acc, curr) => acc + curr.price, 0);
	console.log('totalPrice', totalPrice);
	const user = useAppSelector((state) => state?.auth);

	console.log('userOrders', userOrders);

	return (
		<>
		<ScrollView>
			<CheckoutInfoHeaderComponent />
			<CheckoutTotalComponent />
		</ScrollView>
		</>
	);
};

export default ViewOrderComponent;

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
