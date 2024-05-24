import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAccount } from '../../redux/thunk';

const EditAccountComponent = () => {
	const dispatch = useDispatch()
	const signedInUser = useSelector((state) => state.auth);
	console.log(signedInUser);

	const initialAddress = '123 Broadway St, New York, NY 10006';
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [zip, setZip] = useState('');
	const [state, setState] = useState('');
	const [name, setName] = useState(signedInUser.firstName + ' ' + signedInUser.lastName);
	const [email, setEmail] = useState(signedInUser.email);
	const [phone, setPhone] = useState('');

	useEffect(() => {
		const addressParts = initialAddress.split(',');
		setStreet(addressParts[0].trim());
		setCity(addressParts[1].trim());
		const stateZip = addressParts[2].trim().split(' ');
		setState(stateZip[0].trim());
		setZip(stateZip[1].trim());
	}, [signedInUser]);

	const handleSaveChanges = async () => {
		const nameParts = name.split(' ');
		const firstName = nameParts[0];
		const lastName = nameParts.slice(1).join(' ');

		console.log('First Name:', firstName);
		console.log('Last Name:', lastName);
		console.log('Email:', email);
		console.log('Phone:', phone);
		console.log('Street:', street);
		console.log('City:', city);
		console.log('Zip:', zip);
		console.log('State:', state);
		console.log('user id:', signedInUser.userId);
		dispatch(updateUserAccount({
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: phone,
				street: street,
				city: city,
				zip: zip,
				state: state,
				userId: signedInUser.userId,
			}));

	};

	return (
		<>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
					<ScrollView contentContainerStyle={styles.scrollViewContent}>
						<View style={styles.cardContainer}>
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
									<Text style={styles.userInfoLabel}>Street:</Text>
									<TextInput style={styles.userInfoInput} placeholder="123 Main St" placeholderTextColor={COLORS.gray} value={street} onChangeText={setStreet} />
								</View>
								<View style={styles.userInfo}>
									<Text style={styles.userInfoLabel}>Phone:</Text>
									<TextInput style={styles.userInfoInput} placeholder="555-555-5555" placeholderTextColor={COLORS.gray} value={phone} onChangeText={setPhone} />
								</View>
								<View style={styles.userInfo}>
									<View style={{ flexDirection: 'row' }}>
										<Text style={[styles.userInfoLabel, { top: 5, marginRight: 5 }]}>City:</Text>
										<TextInput
											style={[styles.userInfoInput, { marginRight: 10 }]}
											placeholder="Atlanta"
											placeholderTextColor={COLORS.gray}
											keyboardType="default"
											value={city}
											onChangeText={setCity}
										/>
										<Text style={[styles.userInfoLabel, { top: 5, marginRight: 5 }]}>Zip:</Text>
										<TextInput style={[styles.userInfoInput]} placeholder="00000" placeholderTextColor={COLORS.gray} keyboardType="phone-pad" value={zip} onChangeText={setZip} />
										<Text style={[styles.userInfoLabel, { top: 5, marginLeft: 5 }]}>State: </Text>
										<TextInput style={[styles.userInfoInput, { width: 80 }]} placeholder="GA" placeholderTextColor={COLORS.gray} value={state} onChangeText={setState} />
									</View>
								</View>
								<View style={styles.pillButtonContainer}>
									<TouchableOpacity onPress={() => console.log('route to change password screen')} style={styles.pillButtons}>
										<Text style={{ color: COLORS.white, borderRadius: 10 }}>Change Password</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => console.log('route to user receipts page')} style={styles.pillButtons}>
										<Text style={{ color: COLORS.white, borderRadius: 10 }}>Receipts</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => console.log('Idk what this is supposed to be, but for now this is a placeholder')} style={styles.pillButtons}>
										<Text style={{ color: COLORS.white, borderRadius: 10 }}>Delete</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => console.log('Idk what this is supposed to be, but for now this is a placeholder')} style={styles.pillButtons}>
										<Text style={{ color: COLORS.white, borderRadius: 10 }}>Contact</Text>
									</TouchableOpacity>
								</View>
							</View>
							<TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
								<Text style={styles.saveButtonText}>Save Changes</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
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
	pillButtons: {
		backgroundColor: COLORS.secondary,
		width: 160,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	cardContainer: {
		flex: 1,
		margin: 20,
		borderRadius: 10,
		backgroundColor: COLORS.cardBackground,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		elevation: 12,
		padding: 20,
	},
	pillButtonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		gap: 13,
	},
	card: {
		borderRadius: 10,
		overflow: 'hidden',
		flex: 1,
		padding: 20,
		backgroundColor: COLORS.primary,
		width: '100%',
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
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: 'center',
	},
});
