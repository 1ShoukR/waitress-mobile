import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { COLORS } from '../../../../../constants';

const ConfirmOrderScreen = (): React.JSX.Element => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choose Payment Method</Text>

			<View style={styles.paymentOption}>
				<Text style={styles.paymentOptionText}>Credit Card</Text>
			</View>
			<View style={styles.paymentOption}>
				<Text style={styles.paymentOptionText}>PayPal</Text>
			</View>
			<View style={styles.paymentOption}>
				<Text style={styles.paymentOptionText}>Apple Pay</Text>
			</View>

			<Button title="Confirm Order" onPress={() => alert('Order Confirmed!')} />
		</View>
	);
};

export default ConfirmOrderScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primary,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333333',
		marginBottom: 30,
	},
	paymentOption: {
		backgroundColor: '#ffffff',
		padding: 15,
		borderRadius: 10,
		marginBottom: 20,
		width: '100%',
		alignItems: 'center',
	},
	paymentOptionText: {
		fontSize: 16,
		color: '#333333',
	},
});
