import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { Stack, useNavigation } from 'expo-router';




const BookingScreen = () => {
    const navigation = useNavigation()
    return (
        <>
        <View>
            <Text>Booking Screen</Text>
        </View>
        </>
    )

}


export default BookingScreen