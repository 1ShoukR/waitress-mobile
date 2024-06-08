import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react'
import { COLORS } from '../constants';

const CategoriesComponent = ({foodCategories}) => {
  return (
		<>
			<Text style={styles.header}>Category</Text>
			<ScrollView horizontal={true}>
				<View style={styles.genreWrapper}>
					{foodCategories.map((category, index) => (
						<View key={index} style={styles.genre}>
							{/* Need to add SVG images of categories, 
							then remove background color and have 
							just the image and text 
							*/}
							<Image source={{ uri: category.ImageUrl }} />
							<Text style={{fontWeight: 'bold'}}>{category.CategoryName}</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</>
	);
}

export default CategoriesComponent

const styles = StyleSheet.create({
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		color: COLORS.lightModeText,
	},
	genreWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	genre: {
		color: COLORS.lightModeText,
		backgroundColor: COLORS.secondary,
		padding: 10,
		margin: 5,
		borderRadius: 50,
	},
});