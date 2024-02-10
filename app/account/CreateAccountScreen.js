import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';
import CreateAccountComponent from '../../components/CreateAccountComponent';

const createScreen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: 'Create Your Account',
					headerShown: true,
					headerTintColor: COLORS.white,
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: COLORS.primary,
					},
				}}
			/>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<CreateAccountComponent />
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

export default createScreen;
