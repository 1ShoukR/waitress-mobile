import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';

const EditAccountComponent = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

    const handleSaveGhanges = () => {
        console.log('Save changes')
    
    }

	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.cardContainer}>
					<View style={styles.card}>
						<View style={styles.profilePictureContainer}>
							<TouchableOpacity onPress={() => console.log('Create future Image Upload Screen')}>
								<Image source={{ uri: 'https://avatar.iran.liara.run/public/8' }} style={styles.userImage} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => console.log('handle image change')}>
								<Text style={styles.profilePictureText}>Change Picture</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.userInfoContainer}>
							<View style={styles.userInfo}>
								<Text style={styles.userInfoLabel}>Name:</Text>
								<TextInput style={styles.userInfoInput} placeholder="John Doe" placeholderTextColor={COLORS.gray} value={name} onChangeText={setName} />
							</View>
							<View style={styles.userInfo}>
								<Text style={styles.userInfoLabel}>Email:</Text>
								<TextInput style={styles.userInfoInput} placeholder="johndoe@example.com" placeholderTextColor={COLORS.gray} keyboardType="email-address" value={email} onChangeText={setEmail} />
							</View>
							<View style={styles.userInfo}>
								<Text style={styles.userInfoLabel}>Phone:</Text>
								<TextInput style={styles.userInfoInput} placeholder="123-456-7890" placeholderTextColor={COLORS.gray} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
							</View>
							<View style={styles.userInfo}>
								<View style={{ flexDirection: 'row' }}>
									<Text style={[styles.userInfoLabel, { top: 5, marginRight: 5 }]}>Street:</Text>
									<TextInput style={[styles.userInfoInput, {marginRight: 10}]} placeholder="123 Main St" placeholderTextColor={COLORS.gray} keyboardType="phone-pad" />
									<Text style={[styles.userInfoLabel, { top: 5, marginRight: 5 }]}>Zip:</Text>
									<TextInput style={[styles.userInfoInput]} placeholder="123 Main St" placeholderTextColor={COLORS.gray} keyboardType="phone-pad" />
								</View>
							</View>
						</View>
					</View>
					<TouchableOpacity style={styles.saveButton} onPress={() => console.log('Save changes')}>
						<Text style={styles.saveButtonText}>Save Changes</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
};

export default EditAccountComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primary,
	},
	cardContainer: {
		flex: 1,
		margin: 20,
		borderRadius: 10,
		backgroundColor: COLORS.cardBackground,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 12,
		padding: 20,
	},
	card: {
		borderRadius: 10,
		overflow: 'hidden',
		flex: 1,
		padding: 20,
		backgroundColor: COLORS.primary,
	},
	profilePictureContainer: {
		alignItems: 'center',
		marginBottom: 30,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	profilePictureText: {
		color: COLORS.gray,
		textAlign: 'center',
		fontStyle: 'italic',
		fontSize: 12,
	},
	userInfoContainer: {
		flex: 1,
	},
	userInfo: {
		marginBottom: 20,
	},
	userInfoLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		color: COLORS.black,
		marginBottom: 5,
	},
	userInfoInput: {
		fontSize: 16,
		color: COLORS.black,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.gray,
		paddingVertical: 5,
	},
	saveButton: {
		backgroundColor: COLORS.secondary,
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 20,
	},
	saveButtonText: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: 'bold',
	},
});
