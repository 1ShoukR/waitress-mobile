import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';
import { Divider } from '../Divider';
import { useAppSelector } from 'redux/hooks';

const ViewOrderComponent = (): React.JSX.Element => {
	const userOrder = useAppSelector((state) => state?.orders?.order[0]);
	const user = useAppSelector((state) => state?.auth);

	const restaurantName = userOrder?.restaurant?.Name || 'Unknown Restaurant';

	console.log('user', user);

	return (
		<>
		<View style={styles.checkoutContainer}>
			<View style={styles.infoHeader}>
				<Text style={styles.infoText}>{`${restaurantName}`}</Text>
				<TouchableOpacity onPress={() => console.log('add more items')}>
					<Text style={styles.infoAddMoreText}>Add more items</Text>
				</TouchableOpacity>
			</View>
		<Divider color={COLORS.black} />
		</View>
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
		paddingBottom: 10
	},
	infoText: {
		fontSize: 24,
		fontWeight: '700',
		paddingLeft: 10
	},
	infoAddMoreText: {
		marginTop: 7,
		color: COLORS.secondary,
		fontSize: 15,
		paddingRight: 10
	},
	infoTextConfirm: {
		fontSize: 18,
	},
});
