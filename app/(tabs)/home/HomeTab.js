import React, { useCallback, useState, useRef } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, Animated, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants';
import { Tabs, Stack } from 'expo-router';
import HomePageComponent from '../../../components/HomePageComponent';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const HomeIndex = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [userLocation, setUserLocation] = useState(null);
	const [userAddress, setUserAddress] = useState('');
	const [showAddressInput, setShowAddressInput] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const opacityAnim = useRef(new Animated.Value(1)).current;

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1500);
	}, []);

	const toggleInput = () => {
		Animated.timing(opacityAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setShowAddressInput(!showAddressInput);
			opacityAnim.setValue(0);
			Animated.timing(opacityAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		});
	};

	const handleAddressSubmit = async () => {
		// In the future, we will hit a route to update the user's location in the database.
		// We will update their address string, as well as their lat and long coordinates.
		setIsLoaded(true); // Start loading
		if (userAddress) {
			let results = await Location.geocodeAsync(userAddress);
			if (results.length > 0) {
				console.log('Location found:', results[0]);
				setUserLocation(results[0]); // Assuming the first result is the desired one
				setShowAddressInput(false);
				setIsLoaded(false); // Stop loading
			} else {
				console.log('No locations found for the address:', userAddress);
				setIsLoaded(false); // Stop loading
			}
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#2A2C3B' }}>
			<Tabs.Screen
				options={{
					headerShown: true,
					title: '',
					headerBackground: () => <View style={{ backgroundColor: '#2A2C3B', height: 100 }} />,
					headerRight: () => (
						<TouchableOpacity onPress={toggleInput}>
							<Animated.View style={{ flexDirection: 'row', alignItems: 'center', opacity: opacityAnim }}>
								{showAddressInput ? (
									<>
										<TextInput
											style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: COLORS.white, width: 200 }}
											onChangeText={setUserAddress}
											value={userAddress}
											placeholder="Enter Address"
											placeholderTextColor="grey"
										/>
										<TouchableOpacity style={{ backgroundColor: COLORS.primary, padding: 10, borderRadius: 5, marginLeft: 5 }} onPress={handleAddressSubmit}>
											<Ionicons name="checkmark" size={24} color="black" />
										</TouchableOpacity>
									</>
								) : (
									<>
										{isLoaded ? (
											<ActivityIndicator size="small" color={COLORS.primary} />
										) : (
											<Text style={{ color: COLORS.white, fontStyle: 'italic', fontSize: 11 }}>
												{userLocation ? `Lat: ${userLocation.latitude}, Long: ${userLocation.longitude}` : 'No address has been set.'}
											</Text>
										)}
										<AntDesign name="enviromento" size={25} color={COLORS.white} />
									</>
								)}
							</Animated.View>
						</TouchableOpacity>
					),
				}}
			/>
			<ScrollView style={{ backgroundColor: '#2A2C3B' }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<View style={{ flex: 1, paddingVertical: 32, paddingHorizontal: 16 }}>
					<HomePageComponent refreshing={refreshing} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeIndex;
