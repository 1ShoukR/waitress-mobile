import React from 'react';
import { COLORS } from '../../constants';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Divider } from '@components/Divider';
import { useAppSelector } from 'redux/hooks';

export const CheckoutInfoHeaderComponent = (): React.JSX.Element => {
	const userOrders = useAppSelector((state) => state?.orders?.order);
	const restaurant = useAppSelector((state) => state?.orders?.order[0]).restaurant;
	const restaurantName = restaurant?.Name || 'Unknown Restaurant';
	const subTotal = userOrders.reduce((acc, curr) => acc + curr.price, 0);
	const menuItems = restaurant?.MenuItems!.slice(0, 5) || []; // Take the first 5 items as an example
	console.log('menuItems', menuItems);

	console.log('subTotal', subTotal);
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
						<Text style={[styles.itemText, { fontWeight: '500', color: COLORS.secondary }]}>${order.price}</Text>
					</View>
				))}
			</View>
			<Divider color={COLORS.black} />
			<View style={styles.youMightAlsoLike}>
				<Text style={{ fontWeight: 'bold', fontSize: 18, padding: 10 }}>You might also like</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{menuItems.map((item) => (
						<TouchableOpacity onPress={() => console.log('add new item')} style={styles.card} key={item.NameOfItem}>
							<Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.cardImage} />
							<View style={styles.cardContent}>
								<Text style={styles.cardTitle}>{item.NameOfItem}</Text>
								<Text style={styles.cardPrice}>${item.Price}</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
			<View style={styles.clearOrderContainer}>
				<Text style={[styles.itemText, { fontWeight: '500' }]}>Clear Order? </Text>
                <TouchableOpacity>
                    <Text style={[styles.itemText, { color: COLORS.secondary, fontWeight: '500' }]}>Clear</Text>
                </TouchableOpacity>
			</View>
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
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	itemDetails: {
		flexDirection: 'row',
	},
	itemText: {
		marginRight: 10,
		fontSize: 18,
	},
	youMightAlsoLike: {
		paddingVertical: 10,
		paddingHorizontal: 5,
	},
	card: {
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		marginRight: 10,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
		alignItems: 'center',
		width: 200,
		borderWidth: 1,
		borderColor: COLORS.white, 
	},
	cardImage: {
		width: '100%',
		height: 100,
		borderTopLeftRadius: 6, 
		borderTopRightRadius: 6, 
	},
	cardContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		padding: 10,
		alignItems: 'center',
	},
	cardTitle: {
		fontSize: 12,
		fontWeight: '600',
	},
	cardPrice: {
		fontSize: 14,
		color: COLORS.secondary,
	},
	clearOrderContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
});
