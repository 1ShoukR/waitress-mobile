import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import NumericInput from 'react-native-numeric-input';
import { COLORS } from '../../constants';

const IndividualMenuItem = ({ menuItem }) => {
	const placeholderImage = 'https://via.placeholder.com/150';
	const screenWidth = Dimensions.get('window').width;
	const [quantity, setQuantity] = useState(0);

	console.log('menuItem', menuItem);
	return (
		<ScrollView >
			<View style={styles.cardContainer}>
				{menuItem.ImageURL ? (
					<Image
						// source={{ uri: menuItem.ImageURL }}
						source={{
							uri: 'https://www.allrecipes.com/thmb/QSsjryxShEx1L6o0HLer1Nn4jwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/54165-balsamic-bruschetta-DDMFS-4x3-e2b55b5ca39b4c1783e524a2461634ea.jpg',
						}}
						style={[styles.image, { width: screenWidth, height: screenWidth / 1.8 }]}
					/>
				) : null}
				<View style={styles.textContainer}>
					<Text style={styles.itemName}>{menuItem.NameOfItem}</Text>
					<Text style={styles.itemPrice}>${menuItem.Price}</Text>
				</View>
				<Text style={styles.itemDescription}>{menuItem.Description}</Text>
				<View style={styles.quantityContainer}>
					<Text style={{ marginTop: 12, fontSize: 15 }}>How many would you like?</Text>
					<NumericInput
						value={quantity}
						onChange={(value) => setQuantity(value)}
						totalWidth={110}
						rounded
						type="plus-minus"
						rightButtonBackgroundColor={COLORS.secondary}
						leftButtonBackgroundColor={COLORS.secondary}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default IndividualMenuItem;

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: COLORS.primary,
	},
	image: {
		marginTop: -10,
	},
	textContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '96%',
		paddingTop: 10,
	},
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.secondary,
	},
	itemPrice: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.secondary,
	},
	itemDescription: {
		fontSize: 15,
		paddingTop: 3,
		marginRight: 43,
		color: COLORS.gray600,
	},
	quantityContainer: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
