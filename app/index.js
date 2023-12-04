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
import { View, ScrollView, LogBox } from 'react-native';
import { Stack } from 'expo-router';
import SignIn from '../components/SignIn';

LogBox.ignoreAllLogs(); // Ignore all log notifications for testing/demo purposes

const App = () => {
	return (
		<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
			<Stack.Screen options={{ headerShown: false }} />
			<View style={{ flex: 1, padding: 16 }}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<SignIn />
				</View>
			</View>
		</ScrollView>
	);
};

export default App;
