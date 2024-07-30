import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';
import { router } from 'expo-router';
import { useAppSelector } from 'redux/hooks';


export const CheckoutButton = ({ totalPrice }: { totalPrice: number }) => {
	
	return (
		<>
			<View style={[styles.checkoutButtonContainer]}>
				<TouchableOpacity style={styles.checkoutButton} onPress={(): void => router.push('/modal-stack/modal-screen-1')}>
					<Text style={styles.checkoutText}>Place Your Order</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	checkoutButtonContainer: {
		position: 'absolute',
		top: 200,
		left: 20,
		right: 20,
		alignItems: 'center',
		padding: 20,
		borderRadius: 10,
		elevation: 5,
	},
	checkoutButton: {
		backgroundColor: COLORS.secondary,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	checkoutText: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: 'bold',
	},
});
