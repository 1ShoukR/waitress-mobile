import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import utensiles from '../assets/utensiles.png';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { COLORS, FONT, SIZES } from '../constants/theme';
const HomepageButtons = () => {
	return (
		<View style={styles.columnsContainer}>
			<View style={styles.column}>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Book a Table</Text>
						<Image style={{ height: 30, width: 30, left: 24, color: COLORS.white }} source={utensiles} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={[styles.buttonText, { fontSize: '14' }]}>Favorite Restaurants</Text>
						<Fontisto style={{left: 11, color: COLORS.white}} name="favorite" size={24} color="black" />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Your Orders</Text>
						<FontAwesomeIcon style={{ left: 24, color: COLORS.white }} size={22} icon={faReceipt} />
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.column}>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Support</Text>
						<FontAwesomeIcon style={{ left: 24, color: COLORS.white }} size={22} icon={faCircleInfo} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Account</Text>
						<MaterialCommunityIcons style={{ left: 24 , color: COLORS.white}} name="account" size={25} color="black" />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Set Address</Text>
						<AntDesign style={{ left: 16, color: COLORS.white }} name="enviromento" size={25} color="black" />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HomepageButtons;

const styles = StyleSheet.create({
	columnsContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
	},
	column: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	button: {
		padding: 15,
		// backgroundColor: '#DAA520',
		borderRadius: 5,
		marginBottom: 10,
		width: 200,
		height: 60,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.6)', // Use a light gray border for subtle contrast
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonText: {
		color: COLORS.white, // Ensure text is readable against the primary color
		fontFamily: FONT.branding, // Apply the branding font
		fontSize: SIZES.medium, // Use a medium size for button text
	},
	// Add any specific styles for icons if necessary
});