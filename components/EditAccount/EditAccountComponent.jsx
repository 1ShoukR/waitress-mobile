import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';

const EditAccountComponent = () => {
	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.cardContainer}>
					<View style={styles.card}>
						<View style={styles.profilePictureContainer}>
							<TouchableOpacity onPress={() => console.log('Create future Image Upload Screen')}>
								<Image source={{ uri: 'https://avatar.iran.liara.run/public/8' }} style={styles.userImage} />
							</TouchableOpacity>
                            <Text style={styles.profilePictureText}>Change Picture</Text>
						</View>
						<View style={styles.userInfoContainer}>
							<TouchableOpacity style={styles.userInfo}>
								<Text style={styles.userInfoLabel}>Name:</Text>
								<Text style={styles.userInfoText}>John Doe</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.userInfo}>
								<Text style={styles.userInfoLabel}>Email:</Text>
								<Text style={styles.userInfoText}>johndoe@example.com</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.userInfo}>
								<Text style={styles.userInfoLabel}>Phone:</Text>
								<Text style={styles.userInfoText}>123-456-7890</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

export default EditAccountComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
	},
	userImage: {
		width: 60,
		height: 60,
		borderRadius: 25,
		marginBottom: 10,
	},
	cardContainer: {
		marginBottom: 15,
		borderRadius: 10,
		backgroundColor: COLORS.cardBackground,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 12,
		width: '90%',
	},
	card: {
		borderRadius: 10,
		overflow: 'hidden',
		flexDirection: 'row',
		padding: 20,
		backgroundColor: COLORS.primary,
	},
	profilePictureContainer: {
		width: 100,
		height: 200,
		// backgroundColor: COLORS.secondary,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 20,
	},
	profilePictureText: {
		color: COLORS.gray,
		textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 12,
	},
	userInfoContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	userInfo: {
		marginBottom: 15,
	},
	userInfoLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		color: COLORS.black,
	},
	userInfoText: {
		fontSize: 16,
		color: COLORS.black,
	},
});
