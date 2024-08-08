import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';
import { router } from 'expo-router';
import { setPlaceOrderScreenHeaderIcon } from 'redux/miscSlice';
import { useAppDispatch } from 'redux/hooks';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const CheckoutButton = ({ totalPrice }: { totalPrice: number }) => {
	const dispatch = useAppDispatch()
    const handleNavigation = async () => {
			await dispatch(setPlaceOrderScreenHeaderIcon(faArrowLeft));
			router.push('/home/restaurant/modal/PlaceOrderScreen');
		};
	
	return (
		<>
			<View style={[styles.checkoutButtonContainer]}>
				<TouchableOpacity style={styles.checkoutButton} onPress={handleNavigation}>
					<Text style={styles.checkoutText}>Proceed to Checkout</Text>
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
