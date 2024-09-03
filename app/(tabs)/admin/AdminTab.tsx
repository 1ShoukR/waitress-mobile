import { WelcomeHeader } from "@components/AdminScreenComponents/WelcomeHeader";
import client from "api/client";
import { COLORS } from "../../../constants";
import React, { useEffect, useState, useCallback } from "react";
import { Text, TouchableOpacity, SafeAreaView, RefreshControl, ScrollView, ActivityIndicator } from "react-native";
import { useAppSelector } from "redux/hooks";

const AdminTab = (): React.JSX.Element => {
    const token = useAppSelector((state) => state?.auth?.apiToken);
    const firstName = useAppSelector((state) => state?.auth?.firstName);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<string>("No data fetched yet");

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await client.post('/api/users/get-admin-data', token);
            console.log('data', response);
            setData("Data fetched successfully: " + JSON.stringify(response));
        } catch (error) {
            console.log('error', error);
            setData("Error fetching data");
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

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.primary
        }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
            >
                <WelcomeHeader isRefreshing={isRefreshing} />
                <TouchableOpacity onPress={fetchData} style={{ padding: 10, alignItems: 'center' }}>
                    <Text>Fetch Data</Text>
                </TouchableOpacity>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.secondary} />
                ) : (
                    <Text style={{ padding: 10 }}>{data}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default AdminTab;