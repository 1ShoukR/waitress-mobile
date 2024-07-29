import React from 'react';
import { COLORS } from '../../constants';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppSelector } from 'redux/hooks';
import { SERVICE_FEE, TAX_RATE } from 'lib/data';
import { Divider } from '@components/Divider';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export const CheckoutTotalComponent = (): React.JSX.Element => {
	const userOrders = useAppSelector((state) => state?.orders?.order);
	const subTotal = userOrders.reduce((acc, curr) => acc + curr.price, 0);
	const salesTax = subTotal * TAX_RATE;
	const totalPrice = subTotal + SERVICE_FEE + salesTax;

	return (
		<View style={styles.container}>
			<View style={styles.lineItem}>
				<Text style={styles.label}>Subtotal</Text>
				<Text style={styles.value}>${subTotal.toFixed(2)}</Text>
			</View>
			<View style={styles.lineItem}>
				<View style={styles.serviceFeeContainer}>
					<Text style={styles.label}>Service Fee</Text>
                    <TouchableOpacity onPress={() => console.log('info')}>
                        <FontAwesomeIcon icon={faCircleInfo} size={17} style={styles.icon} />
                    </TouchableOpacity>
				</View>
				<Text style={styles.value}>${SERVICE_FEE.toFixed(2)}</Text>
			</View>
			<View style={styles.lineItem}>
				<Text style={styles.label}>Sales Tax</Text>
				<Text style={styles.value}>${salesTax.toFixed(2)}</Text>
			</View>
			<Divider color={COLORS.black} />
			<View style={styles.lineItem}>
				<Text style={[styles.label, { fontWeight: 'bold' }]}>Total</Text>
				<Text style={[styles.value, { fontWeight: 'bold' }]}>${totalPrice.toFixed(2)}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: 10,
	},
	lineItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginVertical: 5,
	},
	serviceFeeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
	},
	icon: {
		marginLeft: 5,
		color: COLORS.secondary, 
	},
	value: {
		fontSize: 16,
	},
});
