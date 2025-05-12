import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import client from 'api/client';

const FavoriteScreen = (): React.JSX.Element => {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await client.get('/api/favorites');
                setFavorites(response.data as any[]);
            } catch (error) {
                setError(error as string);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFavorites();
    }, []);

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