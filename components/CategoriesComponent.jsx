import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react'
import { COLORS } from '../constants';

const CategoriesComponent = ({foodCategories}) => {
  return (
		<>
			<Text style={styles.header}>Category</Text>
			<ScrollView horizontal={true}>
				<View style={styles.genreWrapper}>
					{foodCategories.map((category, index) => (
						<Text key={index} style={styles.genre}>
							{category}
						</Text>
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
		color: COLORS.white
	},
	genreWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	genre: {
		margin: 5,
		padding: 5,
		backgroundColor: '#eee',
		borderRadius: 5,
	},
});