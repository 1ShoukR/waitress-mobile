import { Text, View, Pressable, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { TextInput, Title } from 'react-native-paper';
import styles from '../styles/SignIn/signIn.styles';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants';
import SvgVersion from '../assets/svgVersion.svg'
import PressableButton from './PressableButton';
import { doLogin } from '../redux/thunk';
import * as Device from 'expo-device';

const SignIn = () => {
	//useState Hooks
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Redux Hooks
	const dispatch = useDispatch();
	const authStatus = useSelector((state: any) => state.auth.loginStatus);
	const userEmail = useSelector((state: any) => state.auth.email);

	// Local Functions
	const handleLogin = useCallback(() => {
		if (authStatus !== 'loading') {
			// Ensure no multiple dispatches
			console.log('email', email);
			dispatch(doLogin({ email: email, password: password, userAgent: Device.osName }));
		}
	}, [email, password, dispatch, authStatus]);

	useEffect(() => {
		if (authStatus === 'failed') {
			Alert.alert('Login failed. Please try again.');
		} else if (authStatus === 'succeeded') {
			router.push('/home/HomeTab');
			setEmail('');
			setPassword('');
		}
	}, [authStatus, userEmail]);

	const navigateToCreateAccount = () => {
		router.push('/account/CreateAccountScreen');
	};

	return (
		<View style={[styles.container, { backgroundColor: COLORS.primary }]}>
			<View style={styles.headerContainer}>
				<Title style={styles.branding}>Waitress</Title>
				<View style={styles.brandingContainer}>
					<SvgVersion style={{ top: 10, marginLeft: -5 }} />
				</View>
			</View>
			<Title style={styles.title}>Login</Title>
			<View style={styles.inputContainer}>
				<TextInput
					label="Email"
					placeholder="Enter your email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					mode="flat"
					activeOutlineColor={COLORS.secondary}
					outlineColor={COLORS.lightModeText}
					textColor={COLORS.lightModeText}
					style={styles.input}
					keyboardType="email-address"
				/>
				<TextInput
					label="Password"
					value={password}
					placeholder="Enter your password"
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
					right={<TextInput.Icon name="eye" />}
					mode="flat"
					autoCapitalize="none"
					activeOutlineColor={COLORS.primary}
					outlineColor={COLORS.gray800}
					textColor={COLORS.tertiary}
					style={styles.input}
					onSubmitEditing={handleLogin}
					returnKeyType="go"
				/>
			</View>
			<PressableButton
				onPress={handleLogin}
				title="Sign in"
				fontSize={18}
				theme="danger"
				loadingDelay={1000}
				shadowStyle={{ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 2.41, elevation: 2 }} status={undefined} icon={undefined} appendIcon={undefined} disabled={undefined}			/>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Text style={styles.footerText}>Don't have an account?</Text>
				<Pressable
					onPress={navigateToCreateAccount}
					style={(props) => ({
						backgroundColor: props.pressed ? 'rgb(210, 230, 255)' : undefined,
						padding: 5,
						bottom: 6,
					})}>
					<Text style={{ textDecorationLine: 'underline', fontStyle: 'italic', color: COLORS.lightModeText }}>Sign up</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default SignIn;
