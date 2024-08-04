import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { createUserAccountThunk } from '../redux/thunk';
import { router } from 'expo-router';
import { COLORS, FONT, SIZES } from '../constants';
import PressableButton from './PressableButton';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { InitialStateForm } from 'types/types';

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

const initialFormState: InitialStateForm = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	address: '',
	city: '',
	state: '',
	zip: '',
};

const CreateAccountComponent = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const userObject = useAppSelector(state => state?.auth);
	const [form, setForm] = useState(initialFormState);
	const [step, setStep] = useState(1);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleInputChange = (field: string, value: string) => setForm({ ...form, [field]: value });

	const validateFields = (fields: string[]): boolean => {
		const validationErrors: { [key: string]: string } = {};
		fields.forEach((field) => {
			switch (field) {
				case 'firstName':
				case 'lastName':
					if (!form[field]) validationErrors[field] = `${field.replace(/^\w/, (c) => c.toUpperCase())} is required.`;
					break;
				case 'email':
					if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) validationErrors.email = 'Please enter a valid email address.';
					break;
				case 'password':
					if (form.password !== form.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match.';
					if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/\d/.test(form.password) || !/[!@#$%^&*]/.test(form.password))
						validationErrors.password = 'Password must meet the required criteria.';
					break;
				case 'state':
					if (!stateInitials.includes(form.state.toUpperCase())) validationErrors.state = 'Please enter a valid state abbreviation.';
					break;
				default:
					break;
			}
		});
		setErrors(validationErrors);
		return Object.keys(validationErrors).length === 0;
	};

	const goToNextStep = (): void => {
		const fieldsToValidate = step === 1 ? ['firstName', 'lastName'] : ['email', 'password'];
		if (validateFields(fieldsToValidate)) setStep(step + 1);
	};

	const handleSubmit = async (): Promise<void> => {
		if (validateFields(['state'])) {
			console.log('Form:', form);
			const addr = `${form.address}, ${form.city}, ${form.state} ${form.zip}`;
			const results = await Location.geocodeAsync(addr);
			console.log('Results:', results);
			if (results.length > 0) {
				const userAddress = { latitude: results[0].latitude, longitude: results[0].longitude, ...form };
				dispatch(createUserAccountThunk({ ...form, userType: 'customer', userAddress: userAddress }));
				if (userObject?.userId) router.push('/home/HomeTab');
			} else {
				setErrors({ address: 'Please enter a valid address' });
			}
		}
	};

	const renderStepContent = (): React.JSX.Element | null => {
		switch (step) {
			case 1:
				return (
					<>
						<Text style={styles.branding}>First, we're going to need your first and last name.</Text>
						<TextInput placeholder="Enter your First Name" value={form.firstName} onChangeText={(text) => handleInputChange('firstName', text)} style={styles.input} error={!!errors.firstName} />
						{errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
						<TextInput placeholder="Enter your Last Name" value={form.lastName} onChangeText={(text) => handleInputChange('lastName', text)} style={styles.input} error={!!errors.lastName} />
						{errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
					</>
				);
			case 2:
				return (
					<>
						<Text style={styles.branding}>Now, let's set up your email and password</Text>
						<TextInput
							label="Email"
							value={form.email}
							placeholder="Enter your email"
							onChangeText={(text) => handleInputChange('email', text)}
							mode="flat"
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
							style={styles.input}
							secureTextEntry
							error={!!errors.password}
						/>
						<TextInput
							label="Confirm Password"
							value={form.confirmPassword}
							placeholder="Confirm your password"
							onChangeText={(text) => handleInputChange('confirmPassword', text)}
							mode="flat"
							style={styles.input}
							secureTextEntry
							error={!!errors.confirmPassword}
						/>
						{errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
						{errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
					</>
				);
			case 3:
				return (
					<>
						<View style={[styles.inputContainer, { width: 400 }]}>
							<TextInput
								label="Address"
								value={form.address}
								placeholder="Enter your address"
								onChangeText={(text) => handleInputChange('address', text)}
								mode="flat"
								style={styles.input}
								error={!!errors.address}
							/>
							<TextInput label="City" value={form.city} placeholder="Enter your city" onChangeText={(text) => handleInputChange('city', text)} mode="flat" style={styles.input} error={!!errors.city} />
							<TextInput
								label="State"
								value={form.state}
								placeholder="Enter your state initials (e.g., NY)"
								onChangeText={(text) => handleInputChange('state', text)}
								mode="flat"
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
								style={styles.input}
								error={!!errors.zip}
							/>
						</View>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 200 }}>
			<KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={2} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<View style={styles.inputContainer}>
						{renderStepContent()}
						<PressableButton
							onPress={step === 3 ? handleSubmit : goToNextStep}
							title={step === 3 ? 'Create Account' : 'Next'}
							icon={step === 3 ? 'check' : 'arrow-right'}
							appendIcon
							theme="secondary"
							loadingDelay={1000}
							shadowStyle={{ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 2.41, elevation: 2 }}
						/>
					</View>
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
		textAlign: 'center',
	},
	inputContainer: {
		marginBottom: SIZES.medium,
	},
	input: {
		marginBottom: SIZES.small,
		backgroundColor: COLORS.gray100,
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
});
