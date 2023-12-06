import React from 'react';
import { View, ScrollView, LogBox, Button, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Stack, router } from 'expo-router';
import SignIn from '../components/SignIn';
import CreateAccount from '../components/CreateAccount';

const createAccount = () => {
	const isPresented = router.canGoBack();
	return (
		<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
			<Stack.Screen
				options={{
					headerShown: true,
					headerTitle: 'Create Account',
					headerShadowVisible: false,
					headerLeft: () => (
						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
									padding: 10,
								},
							]}
							onPress={() => router.back()}>
							<FontAwesomeIcon icon={faX} />
						</Pressable>
					),
				}}
			/>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<CreateAccount />
			</View>
		</ScrollView>
	);
};

export default createAccount;
