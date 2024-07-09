import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const ViewOrderComponent = () => {
	const userOrder = useSelector((state) => state?.orders?.order?.[0]);
	const user = useSelector((state) => state?.auth);

	// Extract restaurant name safely
	const restaurantName = userOrder?.restaurant?.Name || 'Unknown Restaurant';

	console.log('user', user);
	console.log('userOrder', userOrder);

	return (
		<View style={styles.checkoutHeader}>
			<Text>{`${user.firstName},`}</Text>
			<Text>{`your order for ${restaurantName}`}</Text>
		</View>
	);
};

export default ViewOrderComponent;

const styles = StyleSheet.create({
	checkoutHeader: {
		flexDirection: 'column',
		// justifyContent: 'space-between',
		padding: 16,
		// backgroundColor: '#f8f8f8',
	},
});
