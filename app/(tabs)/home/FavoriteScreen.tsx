import React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import { Stack, useNavigation } from 'expo-router';

const FavoriteScreen = (): React.JSX.Element => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View>
                <Text>Favorites</Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoriteScreen;