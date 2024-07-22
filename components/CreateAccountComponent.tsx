import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { createUserAccountThunk } from '../redux/thunk';
import { router } from 'expo-router';
import { COLORS, FONT, SIZES } from '../constants';
import PressableButton from './PressableButton';

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

const CreateAccountComponent: React.FC = () => {
	const dispatch = useDispatch();
	const userObject = useSelector((state: any) => state?.auth);
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		address: '',
		city: '',
		state: '',
		zip: '',
	});
	const [step, setStep] = useState(1);
	const [errors, setErrors] = useState<any>({});

	const handleInputChange = (field: string, value: string) => {
		setForm({ ...form, [field]: value });
	};

	const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const validatePassword = (password: string) => {
		const capitalLetterRegex = /[A-Z]/;
		const lowercaseLetterRegex = /[a-z]/;
		const numberRegex = /\d/;
		const specialCharRegex = /[!@#$%^&*]/;
		return capitalLetterRegex.test(password) && lowercaseLetterRegex.test(password) && numberRegex.test(password) && specialCharRegex.test(password);
	};

	const validateState = (state: string) => stateInitials.includes(state.toUpperCase());

	const goToNextStep = () => {
		let validationErrors: any = {};
		if (step === 1) {
			if (!form.firstName) validationErrors.firstName = 'First name is required.';
			if (!form.lastName) validationErrors.lastName = 'Last name is required.';
		} else if (step === 2) {
			if (!validateEmail(form.email)) validationErrors.email = 'Please enter a valid email address.';
			if (form.password !== form.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match.';
			if (!validatePassword(form.password)) validationErrors.password = 'Password must meet the required criteria.';
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setErrors({});
			setStep(step + 1);
		}
	};

	const handleSubmit = async () => {
		let validationErrors: any = {};
		if (!validateState(form.state)) validationErrors.state = 'Please enter a valid state abbreviation.';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setErrors({});
			let results = await Location.geocodeAsync(form.address);
			if (results.length > 0) {
				const userAddress = {
					latitude: results[0].latitude,
					longitude: results[0].longitude,
					address: form.address,
					city: form.city,
					state: form.state,
					zip: form.zip,
				};
				dispatch(createUserAccountThunk({ ...form, userType: 'customer', userAddress }));
				if (userObject && userObject.userId) {
					router.push('/home/HomeTab');
				}
			} else {
				setErrors({ address: 'Please enter a valid address' });
			}
		}
	};

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 200 }}>
			<KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={2} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					{step === 1 && (
						<View style={styles.inputContainer}>
							<Text style={styles.branding}>First, we're going to need your first and last name.</Text>
							<TextInput
								autoFocus
								placeholder="Enter your First Name"
								value={form.firstName}
								onChangeText={(text) => handleInputChange('firstName', text)}
								style={styles.input}
								error={!!errors.firstName}
							/>
							{errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
							<TextInput placeholder="Enter your last name" value={form.lastName} onChangeText={(text) => handleInputChange('lastName', text)} style={styles.input} error={!!errors.lastName} />
							{errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
							<PressableButton
								onPress={goToNextStep}
								title="Next"
								icon="arrow-right-bold"
								appendIcon
								theme="secondary"
								loadingDelay={1000}
								shadowStyle={{ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 2.41, elevation: 2 }}
							/>
						</View>
					)}

					{step === 2 && (
						<View style={styles.inputContainer}>
							<Text style={styles.branding}>Now, let's set up your email and password</Text>
							<TextInput
								label="Email"
								value={form.email}
								placeholder="Enter your email"
								onChangeText={(text) => handleInputChange('email', text)}
								mode="flat"
								activeOutlineColor={COLORS.secondary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.gray800}
								style={styles.input}
								error={!!errors.email}
							/>
							{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
							<TextInput
								label="Password"
								value={form.password}
								placeholder="Enter your password"
								onChangeText={(text) => handleInputChange('password', text)}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={styles.input}
								returnKeyType="go"
								secureTextEntry
								error={!!errors.password}
							/>
							<TextInput
								label="Confirm Password"
								value={form.confirmPassword}
								placeholder="Confirm your password"
								onChangeText={(text) => handleInputChange('confirmPassword', text)}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={styles.input}
								returnKeyType="go"
								secureTextEntry
								error={!!errors.confirmPassword}
							/>
							{errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
							{errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
							<PressableButton
								onPress={goToNextStep}
								title="Next"
								icon="arrow-right-bold"
								appendIcon
								theme="secondary"
								loadingDelay={1000}
								shadowStyle={{ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 2.41, elevation: 2 }}
							/>
						</View>
					)}

					{step === 3 && (
						<View style={styles.inputContainer}>
							<TextInput
								label="Address"
								value={form.address}
								placeholder="Enter your address"
								onChangeText={(text) => handleInputChange('address', text)}
								mode="flat"
								activeOutlineColor={COLORS.secondary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.gray800}
								style={styles.input}
								error={!!errors.address}
							/>
							<TextInput
								label="City"
								value={form.city}
								placeholder="Enter your city"
								onChangeText={(text) => handleInputChange('city', text)}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={styles.input}
								error={!!errors.city}
							/>
							<TextInput
								label="State"
								value={form.state}
								placeholder="Enter your state initials (e.g., NY)"
								onChangeText={(text) => handleInputChange('state', text)}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={styles.input}
								error={!!errors.state}
							/>
							{errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
							<TextInput
								label="Zip Code"
								value={form.zip}
								placeholder="Enter your zip code"
								onChangeText={(text) => handleInputChange('zip', text)}
								mode="flat"
								activeOutlineColor={COLORS.primary}
								outlineColor={COLORS.gray800}
								textColor={COLORS.tertiary}
								style={styles.input}
								error={!!errors.zip}
							/>
							<PressableButton
								onPress={goToNextStep}
								title="Next"
								icon="arrow-right-bold"
								appendIcon
								theme="secondary"
								loadingDelay={1000}
								shadowStyle={{ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 2.41, elevation: 2 }}
							/>
						</View>
					)}
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default CreateAccountComponent;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 96,
		width: 400,
	},
	branding: {
		color: COLORS.lightModeText,
		fontFamily: FONT.branding,
		fontSize: 36,
		marginBottom: SIZES.xxLarge,
		paddingTop: 0,
		textAlign: 'center',
		top: 5,
	},
	headerContainer: {
		flexDirection: 'row', // Aligns children side by side
		alignItems: 'center', // Vertically centers the items
		justifyContent: 'flex-start', // Aligns items to the start of the container
		marginBottom: SIZES.xxLarge,
		marginLeft: 90,
	},
	brandingContainer: {
		justifyContent: 'center', // Centers the title vertically
		marginRight: 20,
		paddingRight: 20,
		paddingLeft: 5,
		paddingBottom: 10,
	},
	title: {
		color: COLORS.primary,
		fontSize: SIZES.xLarge,
		fontWeight: '600',
		marginBottom: SIZES.medium,
	},
	inputContainer: {
		marginBottom: SIZES.medium,
	},
	input: {
		//color: COLORS.gray800,
		marginBottom: SIZES.small,
		//outlineColor: COLORS.primary,
		overflow: 'hidden',
		backgroundColor: COLORS.gray100,
	},
	button: {
		marginBottom: 16,
		paddingVertical: 8,
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
});