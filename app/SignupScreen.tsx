import React from 'react';
import { View, ScrollView,  Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faX } from '@fortawesome/free-solid-svg-icons';
import { Stack, router } from 'expo-router';
import SignIn from '../components/SignIn';
import { COLORS } from '../constants';
import { useAppSelector } from 'redux/hooks';

const signUp = (): React.JSX.Element => {
    const isPresented = router.canGoBack();
	const globalDarkmode = useAppSelector((state) => state.auth.darkMode);
    return (
			<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.primary }}>
				<Stack.Screen
					options={{
						headerShown: true,
						headerTitle: 'Sign In',
						headerTitleStyle: {
							color: globalDarkmode ? COLORS.white : COLORS.black,
						},
						headerShadowVisible: false,
						headerStyle: {
							backgroundColor: COLORS.primary,
						},
						headerLeft: () => (
							<Pressable
								style={({ pressed }) => [
									{
										backgroundColor: COLORS.primary,
										padding: 10,
									},
								]}
								onPress={(): void => router.back()}>
								<FontAwesomeIcon color={globalDarkmode ? COLORS.white : COLORS.black} icon={faArrowLeft} />
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
