import React, { useCallback, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { COLORS } from '../../../constants';
import { Tabs, Stack } from 'expo-router';
import HomePageComponent from '../../../components/HomePageComponent';




const HomeIndex = () => {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1500);
	}, []);
    return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#2A2C3B' }}>
				<Tabs.Screen
					options={{
						headerShown: false,
					}}
				/>
				<ScrollView style={{ backgroundColor: '#2A2C3B' }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
					<View style={{ flex: 1, paddingVertical: 32, paddingHorizontal: 16 }}>
						<View style={{ flex: 1 }}>
							<HomePageComponent refreshing={refreshing} />
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
}


export default HomeIndex