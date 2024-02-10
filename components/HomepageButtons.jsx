import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const HomepageButtons = () => {
  return (
		<View style={styles.columnsContainer}>
			<View style={styles.column}>
				<TouchableOpacity style={styles.button}>
					<Text>Search Restaurant</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text>Button 2</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text>Button 3</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.column}>
				<TouchableOpacity style={styles.button}>
					<Text>Button 1</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text>Button 2</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text>Button 3</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default HomepageButtons

const styles = StyleSheet.create({
	columnsContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	column: {
		flexDirection: 'column',
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: 2,
	},
	button: {
		padding: 15,
		backgroundColor: '#eee',
		borderRadius: 5,
		marginBottom: 0,
		width: 180,
		borderWidth: 1, // This sets the border width
		borderColor: 'black', // This sets the border color
	},
});
