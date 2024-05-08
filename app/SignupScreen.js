import React from 'react';
import { View, ScrollView, LogBox, Button, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Stack, router } from 'expo-router';
import { Provider } from 'react-redux';
import SignIn from '../components/SignIn';
import store from '../redux/store';
import { COLORS } from '../constants';

const signUp = () => {
    const isPresented = router.canGoBack();
	
    return (
			<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#2A2C3B' }}>
				<Stack.Screen
					options={{
						headerShown: true,
						headerTitle: 'Sign In',
						headerTitleStyle: {
							color: 'white',
						},
						headerShadowVisible: false,
						headerStyle: {
							backgroundColor: '#2A2C3B',
						},
						headerLeft: () => (
							<Pressable
								style={({ pressed }) => [
									{
										backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#2A2C3B',
										padding: 10,
									},
								]}
								onPress={() => router.back()}>
								<FontAwesomeIcon color="white" icon={faX} />
							</Pressable>
						),
					}}
				/>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<SignIn />
				</View>
			</ScrollView>
		);
};

export default signUp;
