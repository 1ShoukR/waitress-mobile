import React from 'react';
import { Stack } from 'expo-router/stack';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'modal-screen-1',
};

export default function Layout() {
	return (
		<Stack>
			{/* <Stack.Screen name="modal-screen-1" />
			<Stack.Screen name="modal-screen-2" /> */}
			<Stack.Screen name="modal-screen-1" />
			<Stack.Screen name="modal-screen-2" />
			<Stack.Screen name="modal-screen-2" />
		</Stack>
	);
}
