import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useAppSelector } from 'redux/hooks';
import { COLORS } from '../../constants';
import { SERVICE_FEE, TAX_RATE } from 'lib/data';
import { CheckoutInfoHeaderComponent } from '@components/CheckoutComponents/CheckoutInfoHeaderComponent';
import { CheckoutTotalComponent } from '@components/CheckoutComponents/CheckoutTotalComponent';
import { CheckoutButton } from '@components/CheckoutComponents/CheckoutButton'; 

const fakeWaiter = {
	name: 'John Doe',
	image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
};

const ViewOrderComponent = (): React.JSX.Element => {
	const userOrders = useAppSelector((state) => state?.orders?.order);
	const [customTip, setCustomTip] = useState<string>('');
	const [selectedTip, setSelectedTip] = useState<number>();

	const handleTipSelection = (tip: number) => {
		setSelectedTip(tip);
		setCustomTip('');
	};

	const subTotal = userOrders.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
	const salesTax = subTotal * TAX_RATE;
	let tipAmount = 0;
	if (selectedTip) {
		tipAmount = subTotal * (selectedTip / 100);
	} else if (customTip) {
		tipAmount = Number(customTip);
	}
	const totalPrice = subTotal + SERVICE_FEE + salesTax + tipAmount;

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				<CheckoutInfoHeaderComponent />

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Assigned Waiter</Text>
					<View style={styles.waiterContainer}>
						<Image source={{ uri: fakeWaiter.image }} style={styles.waiterImage} />
						<Text style={styles.waiterName}>{fakeWaiter.name}</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Tip Amount</Text>
					<View style={styles.tipContainer}>
						<View style={styles.tipButtonsContainer}>
							{[10, 15, 20].map((tip) => (
								<TouchableOpacity key={tip} style={[styles.tipButton, selectedTip === tip && styles.selectedTipButton]} onPress={() => handleTipSelection(tip)}>
									<Text style={styles.tipButtonText}>{tip}%</Text>
								</TouchableOpacity>
							))}
						</View>
						<View>
							<Text>Custom Tip</Text>
							<TextInput
								style={styles.customTipInput}
								placeholder='0.00'
								value={customTip}
								keyboardType="numeric"
								onChangeText={(text) => {
									setCustomTip(text);
									setSelectedTip(undefined);
								}}
							/>
						</View>
					</View>
				</View>
				<CheckoutTotalComponent customTip={customTip} selectedTip={selectedTip} />
			</ScrollView>
		</View>
	);
};

export default ViewOrderComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primary,
	},
	scrollViewContent: {
		paddingBottom: 100, // Add padding to the bottom to make room for the button
	},
	section: {
		marginVertical: 20,
		paddingHorizontal: 10,
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
	tipContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	tipButtonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	tipButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 10,
		marginRight: 5,
	},
	selectedTipButton: {
		backgroundColor: '#ADD8E6',
	},
	tipButtonText: {
		color: '#0000FF',
		fontSize: 16,
	},
	customTipInput: {
		// backgroundColor: '#ffffff',
		padding: 8,
		borderRadius: 10,
		borderColor: '#0000FF',
		borderWidth: 1,
		width: 80,
		textAlign: 'center',
	},
	totalPriceText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
	},
});
