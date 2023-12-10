import React, { useCallback, useState } from 'react';
import { View, Pressable } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD2LightTheme, PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { Button } from 'react-native';
import store from '../redux/store';
import * as SplashScreen from 'expo-splash-screen';
// import { getLocales } from 'expo-localization';


SplashScreen.preventAutoHideAsync();

const theme = {
	...MD2LightTheme,
	colors: {
		background: '#fff',
		primary: '#4C4ADD',
		tooltip: '#e7e9ef',
	},
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
    'BarlowSemiCondensed-Black': require('../assets/fonts/BarlowSemiCondensed-Black.ttf'),
    'BarlowSemiCondensed-BlackItalic': require('../assets/fonts/BarlowSemiCondensed-BlackItalic.ttf'),
    'BarlowSemiCondensed-Bold': require('../assets/fonts/BarlowSemiCondensed-Bold.ttf'),
    'BarlowSemiCondensed-BoldItalic': require('../assets/fonts/BarlowSemiCondensed-BoldItalic.ttf'),
    'BarlowSemiCondensed-ExtraBold': require('../assets/fonts/BarlowSemiCondensed-ExtraBold.ttf'),
    'BarlowSemiCondensed-ExtraBoldItalic': require('../assets/fonts/BarlowSemiCondensed-ExtraBoldItalic.ttf'),
    'BarlowSemiCondensed-Italic': require('../assets/fonts/BarlowSemiCondensed-Italic.ttf'),
    'BarlowSemiCondensed-Light': require('../assets/fonts/BarlowSemiCondensed-Light.ttf'),
    'BarlowSemiCondensed-LightItalic': require('../assets/fonts/BarlowSemiCondensed-LightItalic.ttf'),
    'BarlowSemiCondensed-Medium': require('../assets/fonts/BarlowSemiCondensed-Medium.ttf'),
    'BarlowSemiCondensed-MediumItalic': require('../assets/fonts/BarlowSemiCondensed-MediumItalic.ttf'),
    'BarlowSemiCondensed-Regular': require('../assets/fonts/BarlowSemiCondensed-Regular.ttf'),
    'BarlowSemiCondensed-SemiBold': require('../assets/fonts/BarlowSemiCondensed-SemiBold.ttf'),
    'BarlowSemiCondensed-SemiBoldItalic': require('../assets/fonts/BarlowSemiCondensed-SemiBoldItalic.ttf'),
    'BarlowSemiCondensed-Thin': require('../assets/fonts/BarlowSemiCondensed-Thin.ttf'),
    'BarlowSemiCondensed-ThinItalic': require('../assets/fonts/BarlowSemiCondensed-ThinItalic.ttf'),
	});
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

    return (
			<Provider store={store}>
				<SafeAreaProvider>
					<PaperProvider theme={theme}>
						<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
							<Stack>
								<Stack.Screen name="index"  />
								<Stack.Screen
									name="signUp"
									options={{
										presentation: 'modal',
										gestureEnabled: false,
									}}
								/>
								<Stack.Screen name="account/create" options={{ headerShown: false }} />
								{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
								{/* <Stack.Screen name="tasks/[id]/noteModal" options={{ presentation: 'modal', headerTitle: '' }} /> */}
							</Stack>
						</View>
					</PaperProvider>
				</SafeAreaProvider>
			</Provider>
		);

}


export default Layout