import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import utensiles from '../assets/utensiles.png';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { COLORS, FONT, SIZES } from '../constants/theme';
import Platter from '../assets/platter.svg';
import { router } from 'expo-router';

const HomepageButtons = () => {
	return (
		<View style={styles.columnsContainer}>
			<View style={styles.column}>
				<TouchableOpacity onPress={() => router.push('/home/BookingScreen')} style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Reserve a Table</Text>
						<Platter style={{ left: 15,  }} height={26} width={26} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={[styles.buttonText, { fontSize: 14, marginRight: 20 }]}>Favorites</Text>
						<Fontisto style={{ left: 15, color: COLORS.lightModeText }} name="favorite" size={24} color="black" />
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.column}>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Your Orders</Text>
						<FontAwesomeIcon style={{ left: 15, color: COLORS.lightModeText }} size={22} icon={faReceipt} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Support</Text>
						<FontAwesomeIcon style={{ left: 15, color: COLORS.lightModeText }} size={22} icon={faCircleInfo} />
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
		borderRadius: 5,
		marginBottom: 10,
		width: 180,
		height: 60,
		borderWidth: 3,
		borderColor: 'rgba(255, 255, 255, 0.6)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonText: {
		color: COLORS.lightModeText,
		fontFamily: FONT.branding,
		fontSize: SIZES.medium,
	},
});
