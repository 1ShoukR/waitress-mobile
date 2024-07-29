import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { COLORS } from '../constants';
import { router } from 'expo-router';
import { Category } from 'types/types';

const CategoriesComponent = ({ foodCategories }: { foodCategories: Category[]}) => {
	return (
		<>
			<Text style={styles.header}>Category</Text>
			<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
				<View style={styles.genreWrapper}>
					{foodCategories?.map((category, index) => (
						<TouchableOpacity onPress={() => router.push(`/home/category/${category.CategoryID}`)} key={index} style={styles.genre}>
							{/* Need to add SVG images of categories, 
							then remove background color and have 
							just the image and text 
							*/}
							<Image source={{ uri: category.ImageURL ?? 'default_image_url_here' }} />
							<Text style={{ fontWeight: 'bold' }}>{category.CategoryName}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</>
	);
};

export default CategoriesComponent

const styles = StyleSheet.create({
	header: {
		fontSize: 20,
		marginLeft: 11,
		fontWeight: 'bold',
		marginBottom: 5,
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