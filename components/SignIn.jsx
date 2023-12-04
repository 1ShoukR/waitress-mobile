import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { TextInput, Button, Title } from 'react-native-paper';
import styles from '../styles/SignIn/signIn.styles';
// import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants';
import Waiter from '../assets/Waiter.svg';
import PressableButton from './PressableButton';
// import { doLogin } from '../redux/thunks';
const SignIn = () => {
	//useState Hooks
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	//Expo Router Navigation
	const router = useRouter();

	// // Redux Hooks
	// const dispatch = useDispatch();
	// const authStatus = useSelector((state) => state?.auth?.status);

	// Local Functions
	// const handleLogin = useCallback(() => {
	// 	dispatch(doLogin({ email: email, password: password }));
	// }, [email, password, dispatch]);

	// useEffect(() => {
	// 	if (authStatus === 'failed') {
	// 		// TODO: Implement form validation
	// 		// alert('Login failed. Please try again.');
	// 		alert(t('common:login_failed'));
	// 	} else if (authStatus === 'succeeded') {
	// 		router.push('/horses');
	// 		setEmail('');
	// 		setPassword('');
	// 	}
	// }, [authStatus]);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Title style={styles.branding}>Waitress</Title>
				<View style={styles.brandingContainer}>
					<Waiter width={90} height={80} />
				</View>
			</View>
			<Title style={styles.title}>Login</Title>
			<View style={styles.inputContainer}>
				<TextInput
					label="email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					mode="outlined"
					activeOutlineColor={COLORS.primary}
					outlineColor={COLORS.gray800}
					textColor={COLORS.gray800}
					style={styles.input}
					keyboardType="email-address"
				/>
				<TextInput
					label="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
					right={<TextInput.Icon name="eye" />}
					mode="outlined"
					activeOutlineColor={COLORS.primary}
					outlineColor={COLORS.gray800}
					textColor={COLORS.gray800}
					style={styles.input}
					// onSubmitEditing={handleLogin}
					returnKeyType="go"
				/>
			</View>
			<PressableButton title="sign in" fontSize={18} theme="primary" loadingDelay={1000} />
		</View>
	);
};


export default SignIn
