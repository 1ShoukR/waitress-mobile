import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import { COLORS } from '../constants';
import styles from '../styles/CreateAccount/createAccount.style';
import React, { useMemo } from 'react';
import PressableButton from './PressableButton';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { createUserAccountThunk } from '../redux/thunk';
import { router } from 'expo-router';
import RadioGroup from 'react-native-radio-buttons-group';

const stateInitials = [
	'AL',
	'AK',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'FL',
	'GA',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'OH',
	'OK',
	'OR',
	'PA',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY',
];

const CreateAccountComponent = () => {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [userAddress, setUserAddress] = React.useState({
		latitude: null,
		longitude: null,
		address: '',
		state: '',
		city: '',
		zip: '',
	});
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [nextForm, setNextForm] = React.useState(false);
	const [addressForm, setAddressForm] = React.useState(false);
	const [passwordError, setPasswordError] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [stateError, setStateError] = React.useState('');
	const [userType, setUserType] = React.useState('customer');
	const [selectedUserType, setSelectedUserType] = React.useState();

	const radioButtons = useMemo(() => [
		{
			id: '1', // acts as primary key, should be unique and non-empty string
			label: 'Customer',
			value: 'Customer',
		},
		{
			id: '2',
			label: 'Owner',
			value: 'Owner',
		},
		{
			id: '3',
			label: 'Waiter',
			value: 'Staff',
		},
	], []);

	const goNextForm = () => {
		setNextForm(true);
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setEmailError('Please enter a valid email address.');
			return false;
		}
		setEmailError('');
		return true;
	};

	const validatePassword = (password) => {
		const capitalLetterRegex = /[A-Z]/;
		const lowercaseLetterRegex = /[a-z]/;
		const numberRegex = /\d/;
		const specialCharRegex = /[!@#$%^&*]/;

		if (!capitalLetterRegex.test(password)) {
			setPasswordError('Password must contain at least one capital letter.');
			return false;
		}

		if (!lowercaseLetterRegex.test(password)) {
			setPasswordError('Password must contain at least one lowercase letter.');
			return false;
		}

		if (!numberRegex.test(password)) {
			setPasswordError('Password must contain at least one number.');
			return false;
		}

		if (!specialCharRegex.test(password)) {
			setPasswordError('Password must contain at least one special symbol (e.g., !, @, #, $, etc.).');
			return false;
		}

		setPasswordError('');
		return true;
	};

	const validateState = (state) => {
		if (!stateInitials.includes(state.toUpperCase())) {
			setStateError('Please enter a valid state abbreviation.');
			return false;
		}
		setStateError('');
		return true;
	};

	const goAddressForm = () => {
		if (!validateEmail(email)) {
			return;
		}

		if (password !== confirmPassword) {
			setPasswordError('Passwords do not match');
			return;
		}

		if (!validatePassword(password)) {
			return;
		}

		setAddressForm(true);
	};

	const handleSubmit = async () => {
		if (!validateState(userAddress.state)) {
			return;
		}
		let results = await Location.geocodeAsync(userAddress.address);
		if (results.length > 0) {
			const updatedUserAddress = {
				...userAddress,
				latitude: results[0].latitude,
				longitude: results[0].longitude,
			};
			dispatch(
				createUserAccountThunk({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
					userType: userType,
					userAddress: updatedUserAddress,
				})
			);
			const userObject = useSelector((state) => state?.auth);
			if (userObject && userObject.userId) {
				router.push('/home/HomeTab');
			}
			setUserAddress(updatedUserAddress);
		} else {
			setPasswordError('Please enter a valid address');
		}
	};

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 200 }}>
			<KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={2} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					{!nextForm ? (
						<View style={styles.inputContainer}>
							<View style={styles.brandingContainer}>
								<Text style={{ ...styles.branding, marginBottom: 0, textAlign: 'left' }}>First,</Text>
								<Text style={{ ...styles.branding, textAlign: 'left' }}>We're going to need your first and last name.</Text>
							</View>
							<TextInput
								autoFocus={true}
								autoCorrect={false}
								placeholder="Enter your First Name"
								value={firstName}
								onChangeText={(text) => setFirstName(text)}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
							/>
							<TextInput
								placeholder="Enter your last name"
								value={lastName}
								onChangeText={(text) => setLastName(text)}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
							/>
							<PressableButton onPress={goNextForm} title={'Next'} icon="arrow-right-bold" appendIcon={true} />
						</View>
					) : !addressForm ? (
						<View style={styles.inputContainer}>
							<View style={styles.brandingContainer}>
								<Text style={{ ...styles.branding, marginBottom: 0, textAlign: 'left' }}>Now,</Text>
								<Text style={{ ...styles.branding, textAlign: 'left' }}>Let's set up your email and password</Text>
							</View>
							<TextInput
								label="Email"
								value={email}
								placeholder="Enter your email"
								onChangeText={(text) => setEmail(text)}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
							/>
							{emailError ? <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}
							<TextInput
								label="Password"
								value={password}
								placeholder="Enter your password"
								onChangeText={(text) => setPassword(text)}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
								secureTextEntry={true}
							/>
							<TextInput
								label="Confirm Password"
								value={confirmPassword}
								placeholder="Confirm your password"
								onChangeText={(text) => setConfirmPassword(text)}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
								secureTextEntry={true}
							/>
							{passwordError ? <Text style={{ color: 'red', marginBottom: 10 }}>{passwordError}</Text> : null}
							<View style={styles.radioButtonContainer}>
								<Text style={styles.radioButtonLabel}>I am a:</Text>
								<RadioGroup radioButtons={radioButtons} onPress={setSelectedUserType} selectedId={selectedUserType}  />
								{/* <RadioButton.Group onValueChange={(newValue) => setUserType(newValue)} value={userType}>
									<View style={styles.radioButton}>
										<RadioButton value="customer" color={COLORS.secondary} />
										<Text style={styles.radioButtonText}>Customer</Text>
									</View>
									<View style={styles.radioButton}>
										<RadioButton value="owner" color={COLORS.primary} />
										<Text style={styles.radioButtonText}>Restaurant Owner</Text>
									</View>
									<View style={styles.radioButton}>
										<RadioButton value="staff" color={COLORS.primary} />
										<Text style={styles.radioButtonText}>Staff Member</Text>
									</View>
								</RadioButton.Group> */}
							</View>
							<PressableButton onPress={goAddressForm} title={'Next'} icon="arrow-right-bold" appendIcon={true} />
						</View>
					) : (
						<View style={styles.inputContainer}>
							<TextInput
								label="Address"
								value={userAddress.address}
								placeholder="Enter your address"
								onChangeText={(text) => setUserAddress({ ...userAddress, address: text })}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
							/>
							<TextInput
								label="City"
								value={userAddress.city}
								placeholder="Enter your city"
								onChangeText={(text) => setUserAddress({ ...userAddress, city: text })}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
							/>
							<TextInput
								label="State"
								value={userAddress.state}
								placeholder="Enter your state initials (e.g., NY)"
								onChangeText={(text) => {
									setUserAddress({ ...userAddress, state: text });
									validateState(text);
								}}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
							/>
							{stateError ? <Text style={{ color: 'red', marginBottom: 10 }}>{stateError}</Text> : null}
							<TextInput
								label="Zip Code"
								value={userAddress.zip}
								placeholder="Enter your zip code"
								onChangeText={(text) => setUserAddress({ ...userAddress, zip: text })}
								mode="flat"
								activeUnderlineColor={COLORS.primary}
								placeholderTextColor={COLORS.gray500}
								style={styles.input}
							/>
							<PressableButton onPress={handleSubmit} title={'Submit'} icon="account-arrow-right" appendIcon={true} />
						</View>
					)}
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default CreateAccountComponent;
