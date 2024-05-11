import React, { useCallback, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import { Tabs, Stack } from 'expo-router';
import HomePageComponent from '../../../components/HomePageComponent';
import { AntDesign, } from '@expo/vector-icons';
import * as Location from 'expo-location';




const HomeIndex = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [location, setLocation] = useState(null);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1500);
	}, []);
	const getLocationFromAddress = async (address) => {
		try {
			const result = await Location.geocodeAsync(address);
			if (result.length > 0) {
				console.log('Latitude:', result[0].latitude, 'Longitude:', result[0].longitude);
			} else {
				console.log('No location found for address:', address);
			}
		} catch (error) {
			console.error('Error getting location:', error);
		}
	}
    return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#2A2C3B' }}>
				<Tabs.Screen
					options={{
						headerShown: true,
						title: '',
						headerBackground: () => <View style={{ backgroundColor: '#2A2C3B', height: 100 }} />,
						headerRight: () => (
							<View style={{ flexDirection: 'row', alignItems: 'center', }}>
								<Text style={{ color: COLORS.white, fontStyle: 'italic', fontSize: 11 }}>{location ? location : 'No address has been set.'}</Text>
								<TouchableOpacity onPress={() => console.log('Choose Location')}>
									<AntDesign name="enviromento" size={25} color={COLORS.white} />
								</TouchableOpacity>
							</View>
						),
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