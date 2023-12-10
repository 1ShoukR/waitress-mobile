import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { TextInput, Button, Title } from 'react-native-paper';
import styles from '../styles/SignIn/signIn.styles';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants';
import logo from '../assets/logo.png'
import PressableButton from './PressableButton';
import { doLogin } from '../redux/thunk';
const SignIn = () => {
	//useState Hooks
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	//Expo Router Navigation

	// // Redux Hooks
	const dispatch = useDispatch();
	const authStatus = useSelector((state) => state?.auth?.status);

	// Local Functions
	const handleLogin = useCallback(() => {
		dispatch(doLogin({ email: email, password: password }));
	}, [email, password, dispatch]);

	useEffect(() => {
		if (authStatus === 'failed') {
			// TODO: Implement form validation
			alert('Login failed. Please try again.');
		} else if (authStatus === 'succeeded') {
			router.push('/home');
			setEmail('');
			setPassword('');
		}
	}, [authStatus]);
	const navigateToCreateAccount = () => {
		router.back();
		setTimeout(() => {
			router.push('/account/create');
		}, 100); 
	};

	return (
		<View style={[styles.container, { backgroundColor: COLORS.primary }]}>
			<View style={styles.headerContainer}>
				<Title style={styles.branding}>Waitress</Title>
				<View style={styles.brandingContainer}>
					<Image style={{ width: 35, height: 35, top: 10, marginLeft: 5 }} source={logo} />
				</View>
			</View>
			<Title style={styles.title}>Login</Title>
			<View style={styles.inputContainer}>
				<TextInput
					label="Email"
					placeholder='Enter your email'
					value={email}
					onChangeText={(text) => setEmail(text)}
					mode="flat"
					activeOutlineColor={COLORS.secondary}
					outlineColor={COLORS.gray800}
					textColor={COLORS.gray800}
					style={styles.input}
					keyboardType="email-address"
				/>
				<TextInput
					label="Password"
					value={password}
					placeholder='Enter your password'
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
					right={<TextInput.Icon name="eye" />}
					mode="flat"
					activeOutlineColor={COLORS.primary}
					outlineColor={COLORS.gray800}
					textColor={COLORS.tertiary}
					style={styles.input}
					onSubmitEditing={handleLogin}
					returnKeyType="go"
				/>
			</View>
			<PressableButton onPress={() => console.log('sign in')} title="sign in" fontSize={18} theme="primary" loadingDelay={1000} shadowStyle={{shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.4,shadowRadius: 2.41,elevation: 2}} />
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Text style={styles.footerText}>Don't have an account?</Text>
				<Pressable
					onPress={navigateToCreateAccount}
					style={({ pressed }) => [
						{
							backgroundColor: pressed ? 'rgb(210, 230, 255)' : COLORS.primary,
							padding: 5,
							bottom: 6,
						},
					]}>
					<Text style={{ textDecorationLine: 'underline', fontStyle: 'italic' }}>Sign up</Text>
				</Pressable>
			</View>
		</View>
	);
};


export default SignIn
