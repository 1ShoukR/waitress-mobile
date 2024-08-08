import React from 'react';
import { Stack } from 'expo-router/stack';
import { Pressable, TouchableOpacity } from 'react-native';
import { faArrowLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router } from 'expo-router';
import { COLORS } from '../../../../../constants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setPlaceOrderScreenHeaderIcon } from 'redux/miscSlice';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'ViewOrderScreen',
};

export default function Layout() {
	const dispatch = useAppDispatch()
	const icon = useAppSelector((state) => state.misc.PlaceOrderScreenHeaderIcon);
	const handleIconChange = async () => {
		await dispatch(setPlaceOrderScreenHeaderIcon(faChevronDown));
		router.back();
	}
	return (
		<Stack>
			{/* <Stack.Screen name="modal-screen-1" />
			<Stack.Screen name="modal-screen-2" /> */}
			<Stack.Screen name="ViewOrderScreen" options={{ headerShown: false }} />
			<Stack.Screen name="PlaceOrderScreen" options={{ 
				headerShown: false,
				title: 'Confirm Your Order', 
				headerLeft: () => {
					return (
						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: COLORS.primary,
									// padding: 10,
								},
							]}
							onPress={handleIconChange}>
							{/* <FontAwesomeIcon color={globalDarkmode ? COLORS.white : COLORS.black} icon={faArrowLeft} /> */}
							<FontAwesomeIcon size={25} color={COLORS.black} icon={icon} />
						</Pressable>
					);
				}
				}} />
		</Stack>
	);
}
