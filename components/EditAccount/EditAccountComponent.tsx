import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { COLORS } from '../../constants';
import { resetUpdateUserAccountStatus, updateUserAccount } from '../../redux/thunk';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const EditAccountComponent = (): React.JSX.Element => {
	const dispatch = useAppDispatch()
	const signedInUser = useAppSelector((state) => state?.auth);
	const updateUserStatus = useAppSelector((state) => state?.auth?.updateUserAccountStatus);

	const initialAddress = '123 Broadway St, New York, NY 10006';
	const [street, setStreet] = useState<string>('');
	const [streetPlaceholder, setStreetPlaceholder] = useState<string>('123 Broadway St, New York, NY 10006');
	const [city, setCity] = useState<string>('');
	const [cityPlaceholder, setCityPlaceholder] = useState<string>('');
	const [zip, setZip] = useState<string>('');
	const [zipPlaceholder, setZipPlaceholder] = useState<string>('');
	const [state, setState] = useState<string>('');
	const [statePlaceholder, setStatePlaceholder] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');

  useEffect((): void => {
		if (signedInUser) {
			const initialAddress: string = signedInUser?.address || '123 Broadway St, New York, NY 10006';
			const addressParts: string[] = initialAddress.split(',');
			setStreetPlaceholder(addressParts[0].trim());
			setCityPlaceholder(addressParts[1].trim());
			const stateZip: string[] = addressParts[2].trim().split(' ');
			setStatePlaceholder(stateZip[0].trim());
			setZipPlaceholder(stateZip[1].trim());
		}
	}, [signedInUser]);

  useEffect((): void => {
		if (updateUserStatus === 'succeeded') {
			Alert.alert('User account updated successfully', '', [
				{
					text: 'OK',
					onPress: async () => dispatch(resetUpdateUserAccountStatus()),
				},
			]);
		}
	}, [updateUserStatus]);


const handleSaveChanges = async (): Promise<void> => {
	let nameParts: string[] | null;
	let firstName: string | null;
	let lastName: string | null;

	if (name) {
		nameParts = name.split(' ');
		firstName = nameParts[0];
		lastName = nameParts.slice(1).join(' ');
	} else {
		firstName = signedInUser?.firstName;
		lastName = signedInUser?.lastName;
	}

	const finalEmail: string | null = email || signedInUser?.email;
	const finalPhone: string | null = phone || '555-555-5555';
	const finalAddress: string | null = street || streetPlaceholder;
	const finalCity: string | null = city || cityPlaceholder;
	const finalZip: string | null = zip || zipPlaceholder;
	const finalState: string | null = state || statePlaceholder;
	console.log('signedInUser', signedInUser.userId);

	dispatch(
		updateUserAccount({
			firstName: firstName,
			lastName: lastName,
			email: finalEmail,
			phone: finalPhone,
			address: finalAddress,
			city: finalCity,
			zip: finalZip,
			state: finalState,
			userId: signedInUser.userId,
		})
	);
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
									<TextInput style={styles.userInfoInput} placeholder={`${signedInUser?.firstName} ${signedInUser.lastName}`} placeholderTextColor={COLORS.gray} value={name} onChangeText={setName} />
								</View>
								<View style={styles.userInfo}>
									<Text style={styles.userInfoLabel}>Email:</Text>
									<TextInput
										style={styles.userInfoInput}
										placeholder={`${signedInUser?.email}`}
										placeholderTextColor={COLORS.gray}
										keyboardType="email-address"
										value={email}
										onChangeText={setEmail}
									/>
								</View>
								<View style={styles.userInfo}>
									<Text style={styles.userInfoLabel}>Street:</Text>
									<TextInput style={styles.userInfoInput} placeholder={`${streetPlaceholder}`} placeholderTextColor={COLORS.gray} value={street} onChangeText={setStreet} />
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
											placeholder={`${cityPlaceholder}`}
											placeholderTextColor={COLORS.gray}
											keyboardType="default"
											value={city}
											onChangeText={setCity}
										/>
										<Text style={[styles.userInfoLabel, { top: 5, marginRight: 5 }]}>Zip:</Text>
										<TextInput style={[styles.userInfoInput]} placeholder={`${zipPlaceholder}`} placeholderTextColor={COLORS.gray} keyboardType="phone-pad" value={zip} onChangeText={setZip} />
										<Text style={[styles.userInfoLabel, { top: 5, marginLeft: 5 }]}>State: </Text>
										<TextInput style={[styles.userInfoInput, { width: 80 }]} placeholder={`${statePlaceholder}`} placeholderTextColor={COLORS.gray} value={state} onChangeText={setState} />
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
