/*
This is the entry point of the app. This file is corresponding 
to the routing of "/". Expo-Router allows you to use
a file-based routing system, rather than a traditional
URL-based routing system. This allows you to create
a folder structure that is more intuitive and easier
to navigate and scale later in development.
All files located within the folder "app"
are automatically added to routing based on their names.
*/

import React from 'react';
import { View, ScrollView, LogBox, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import SignIn from '../components/SignIn';

LogBox.ignoreAllLogs(); // Ignore all log notifications for testing/demo purposes

/*
The design idea for now would be to impliment a modal that pops up when a user clicks on "sign in"
The modal will have a form that will allow the user to enter their credentials
The modal will have a button that will allow the user to submit their credentials
The modal will have a button that will allow the user to close the modal


There is another button that lets a user bypass the sign up process and go straight to ordering/reserving
if that is the case, then they will not be able to access their account/see previous orders
*/


const App = () => {
	const router = useRouter()
	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					headerTitle: '',
					headerRight: () => <Button onPress={() => router.push('/signUp')} title="Sign Up" />,
					headerShadowVisible: false,
				}}
			/>
			<View style={{ flex: 1, padding: 16 }}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 500 }}>
					<Button icon="account" mode="outlined" onPress={() => router.push('/signUp')} style={styles.button} labelStyle={styles.buttonLabel} contentStyle={{flexDirection: 'row-reverse'}}>
						Sign In
					</Button>
					<Button icon="near-me" title="Search Nearby" mode="outlined" onPress={() => console.log('Search Nearby Pressed')} style={styles.button} labelStyle={styles.buttonLabel} contentStyle={{flexDirection: 'row-reverse'}} >
						Search Nearby
					</Button>
				</View>
			</View>
		</>
	);
};
export default App;


const styles = StyleSheet.create({
	button: {
		width: '80%', // Stretched width
		borderRadius: 30, // Rounded edges
		paddingVertical: 8, // Vertical padding
		marginVertical: 10, // Space between buttons
		// Add other styling as needed
	},
	buttonLabel: {
		fontSize: 16, // Adjust font size as needed
	},
});