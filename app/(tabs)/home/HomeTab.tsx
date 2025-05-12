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
import SvgVersion from "../../../assets/svgVersion.svg"
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { UserLocation } from 'types/types';

const HomeIndex = (): React.JSX.Element => {
	const [refreshing, setRefreshing] = useState(false);
	const user = useAppSelector((state) => state?.auth);
	const [userLocation, setUserLocation] = useState<UserLocation | null>(user && user.latitude && user.longitude ? { latitude: user.latitude, longitude: user.longitude, address: '' } : null);
	const [userAddress, setUserAddress] = useState<string>(user && user.address ? user.address : '');
	const [showAddressInput, setShowAddressInput] = useState<boolean>(false);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const reduxUser = useAppSelector((state) => state?.auth);
	const globalDarkmode = useAppSelector((state) => state?.auth.darkMode);
	const opacityAnim = useRef<Animated.Value>(new Animated.Value(1)).current;
	const dispatch = useAppDispatch();

	const onRefresh = useCallback((): void => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1500);
	}, []);

	const toggleInput = (value: boolean): void => {
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
			dispatch(
				updateUserLocation({
					latitude: results[0]!.latitude,
					longitude: results[0]!.longitude,
					address: userAddress,
					userId: user.userId, // Ensure userId is available
				})
			);
			setUserLocation({ latitude: results[0]!.latitude, longitude: results[0]!.longitude, address: userAddress });
			setUserAddress(userAddress);
			setShowAddressInput(false);
		} else {
			console.log('No locations found for the address:', userAddress);
			// Handling of loading state should be within Redux if the thunk fails
		}
	}
};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
			<Tabs.Screen
				options={{
					headerShown: true,
					title: '',
					headerBackground: () => <View style={{ backgroundColor: COLORS.primary, height: 100 }} />,
					headerRight: () => (
						<TouchableOpacity onPress={() => toggleInput(true)}>
							<Animated.View style={{ flexDirection: 'row', alignItems: 'center', opacity: opacityAnim }}>
								{showAddressInput ? (
									<>
										<TextInput
											style={{
												height: 40,
												borderColor: 'gray',
												borderWidth: 1,
												color: globalDarkmode ? COLORS.lightModeText : COLORS.black,
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
														? [{ color: globalDarkmode ? COLORS.lightModeText : COLORS.black, fontStyle: 'italic', fontSize: 14, marginRight: 10 }]
														: [{ color: globalDarkmode ? COLORS.lightModeText : COLORS.black, fontStyle: 'italic', fontSize: 11, marginRight: 2 }]
												}>
												{userLocation && userAddress ? `${userAddress}` : reduxUser ? `${reduxUser.address}`  : 'No address has been set.'}
											</Text>
										)}
										<AntDesign name="enviromento" size={25} color={globalDarkmode ? COLORS.lightModeText : COLORS.black} />
									</>
								)}
							</Animated.View>
						</TouchableOpacity>
					),
					headerLeft: () => {
						return (
							<>
								<SvgVersion style={{marginLeft: -15, top: -13}}/>
							</>
						);
					}
				}}
			/>
			<ScrollView style={{  backgroundColor: COLORS.primary }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<View style={{  paddingVertical: 32, }}>
					<HomePageComponent />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeIndex;
