import React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
// import AccountScreenUserHeader from '../../../components/AccountScreenUserHeader';




const BookingScreen = () => {
    const navigation = useNavigation()
    return (
        <>
        <View style={styles.container}>
            {/* <AccountScreenUserHeader />  */}
            <Text>Reserve</Text>
        </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BookingScreen;