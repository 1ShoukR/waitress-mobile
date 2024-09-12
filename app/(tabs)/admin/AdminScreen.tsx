import React, { useEffect, useState, useCallback } from "react";
import { View, Text, SafeAreaView, RefreshControl, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useAppSelector } from "redux/hooks";
import { WelcomeHeader } from "@components/AdminScreenComponents/WelcomeHeader";
import { RestaurantListComponent } from "@components/AdminScreenComponents/RestaurantListComponent";
import client from "api/client";
import { COLORS } from "../../../constants";
import { Restaurant } from "types/types";

const AdminScreen = (): React.JSX.Element => {
    const token = useAppSelector((state) => state?.auth?.apiToken);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<Restaurant[]>([]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: { restaurants: Restaurant[] } = await client.post('/api/users/get-admin-data', token);
            setData(response.restaurants);
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchData();
        setIsRefreshing(false);
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderHeader = () => (
        <>
            <WelcomeHeader isRefreshing={isRefreshing} />
            <Text style={styles.sectionTitle}>Your Restaurants</Text>
        </>
    );

    const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
        <RestaurantListComponent restaurant={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.secondary} />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderRestaurantItem}
                    keyExtractor={(item) => item.RestaurantId.toString()}
                    ListHeaderComponent={renderHeader}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
        margin: 20,
    },
});

export default AdminScreen;