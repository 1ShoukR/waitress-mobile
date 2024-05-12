import React, { useCallback, useState, useRef } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, Animated, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants';
import { Tabs, Stack } from 'expo-router';
import HomePageComponent from '../../../components/HomePageComponent';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { client } from '../../../api/client';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserLocation } from '../../../redux/thunk';

const HomeIndex = () => {
	const [refreshing, setRefreshing] = useState(false);
	const user = useSelector((state) => state?.auth);
	const [userLocation, setUserLocation] = useState(user && user.latitude && user.longitude ? { latitude: user.latitude, longitude: user.longitude } : null);
	const [userAddress, setUserAddress] = useState(user && user.address ? user.address : '');
	const [showAddressInput, setShowAddressInput] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const opacityAnim = useRef(new Animated.Value(1)).current;
	const dispatch = useDispatch();
	console.log("userLocation", userLocation);
	console.log("userAddress", userAddress);

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
    if (userAddress) {
        let results = await Location.geocodeAsync(userAddress);
        if (results.length > 0) {
            dispatch(updateUserLocation({
                latitude: results[0].latitude,
                longitude: results[0].longitude,
                userId: user.userId,
                address: userAddress
            }));
            setUserLocation({ latitude: results[0].latitude, longitude: results[0].longitude });
            setUserAddress(userAddress); 
            setShowAddressInput(false);
        } else {
            console.log('No locations found for the address:', userAddress);
            // Handling of loading state should be within Redux if the thunk fails
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
											style={{
												height: 40,
												borderColor: 'gray',
												borderWidth: 1,
												color: COLORS.white,
												width: 200,
												borderRadius: 20,
												padding: 10,
											}}
											onChangeText={setUserAddress}
											value={userAddress}
											placeholder="Enter Address"
											placeholderTextColor="grey"
											selectionColor={COLORS.primary}
											autoCorrect={false}
											autoCapitalize="none"
										/>
										<TouchableOpacity style={{ borderRadius: 5, marginLeft: 5 }} onPress={handleAddressSubmit}>
											<Ionicons name="checkmark" size={26} color="black" />
										</TouchableOpacity>
									</>
								) : (
									<>
										{isLoaded ? (
											<ActivityIndicator size="small" color={COLORS.primary} />
										) : (
											<Text
												style={
													userLocation && userAddress
														? [{ color: COLORS.white, fontStyle: 'italic', fontSize: 14, marginRight: 10 }]
														: [{ color: COLORS.white, fontStyle: 'italic', fontSize: 11, marginRight: 2 }]
												}>
												{userLocation && userAddress ? `${userAddress}` : 'No address has been set.'}
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
