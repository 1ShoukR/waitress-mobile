import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../constants';
import styles from '../styles/CreateAccount/createAccount.style';
import React from 'react';
import PressableButton from './PressableButton';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { createUserAccountThunk } from '../redux/thunk';

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
		console.log(firstName);
		console.log(lastName);
		console.log(email);
		console.log(password);
		console.log(userAddress);
		if (userAddress) {
			let results = await Location.geocodeAsync(userAddress.address);
			console.log('results', results);
			if (results.length > 0) {
				setUserAddress({ ...userAddress, latitude: results[0].latitude, longitude: results[0].longitude })
				dispatch(createUserAccountThunk({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password,
						userType: 'customer',
						userAddress: userAddress,
					}));
			} else {
				setPasswordError('Please enter a valid address');
			}
		}
	};

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 200 }}>
				<KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={2} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
				<View style={{ flex: 1, justifyContent: 'center' }}>
					{!nextForm ? (
						<View style={styles.inputContainer}>
							<View style={styles.brandingContainer}>
								<Text style={{ ...styles.branding, marginBottom: 0, textAlign: 'left' }}>First,</Text>
								<Text style={{ ...styles.branding, textAlign: 'left' }}>We're going to need your first and last name.</Text>
							</View>
							<TextInput autoFocus={true} autoCorrect={false} placeholder="Enter your First Name" value={firstName} onChangeText={(text) => setFirstName(text)} style={styles.input} />
							<TextInput placeholder="Enter your last name" value={lastName} onChangeText={(text) => setLastName(text)} style={[styles.input, { width: 400 }]} />
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
								activeOutlineColor={COLORS.secondary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.gray800}
								style={styles.input}
							/>
							{emailError ? <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}
							<TextInput
								label="Password"
								value={password}
								placeholder="Enter your password"
								onChangeText={(text) => setPassword(text)}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={[styles.input, { width: 400 }]}
								returnKeyType="go"
								secureTextEntry={true}
								passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
							/>

							<TextInput
								label="Confirm Password"
								value={confirmPassword}
								placeholder="Confirm your password"
								onChangeText={(text) => setConfirmPassword(text)}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={[styles.input, { width: 400 }]}
								returnKeyType="go"
								secureTextEntry={true}
							/>
							{passwordError ? <Text style={{ color: 'red', marginBottom: 10 }}>{passwordError}</Text> : null}
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
								activeOutlineColor={COLORS.secondary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.gray800}
								style={styles.input}
							/>
							<TextInput
								label="City"
								value={userAddress.city}
								placeholder="Enter your city"
								onChangeText={(text) => setUserAddress({ ...userAddress, city: text })}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={[styles.input, { width: 400 }]}
								returnKeyType="go"
							/>
							<TextInput
								label="State"
								value={userAddress.state}
								placeholder="Enter your state"
								onChangeText={(text) => setUserAddress({ ...userAddress, state: text })}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={[styles.input, { width: 400 }]}
								returnKeyType="go"
							/>
							<TextInput
								label="Zip Code"
								value={userAddress.zip}
								placeholder="Enter your zip code"
								onChangeText={(text) => setUserAddress({ ...userAddress, zip: text })}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={[styles.input, { width: 400 }]}
								returnKeyType="go"
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
