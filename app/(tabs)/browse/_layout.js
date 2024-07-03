import React from 'react';
import { Provider,  } from 'react-redux';
import {  Stack } from 'expo-router';
import store from '../../../redux/store'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD2LightTheme, PaperProvider } from 'react-native-paper';

const theme = {
	...MD2LightTheme,
	colors: {
		background: '#fff',
		primary: '#4C4ADD',
		tooltip: '#e7e9ef',
	},
};

const BookingScreenLayout = () => {
    return (
        <>
        <Provider store={store}>
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <Stack>
                        <Stack.Screen name='BookingScreen' options={{headerShown: false}}/>
                    </Stack>
                </PaperProvider>
            </SafeAreaProvider>
        </Provider>
        </>
    )
}


export default BookingScreenLayout