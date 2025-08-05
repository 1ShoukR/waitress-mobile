import { View, Text,  StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { getAllCategories, getLocalRestaurants, getTopRestaurants, updateUserLocation } from '../redux/thunk';
import * as Location from 'expo-location';
import HomepageButtons from './HomepageButtons';
import CategoriesComponent from './CategoriesComponent';
import TopRestaurantsComponent from './TopRestaurantsComponent';
import LocalRestaurantsComponent from './LocalRestaurantsComponent';
import { COLORS } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const HomePageComponent = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state?.auth);
	const restaurantState = useAppSelector((state) => state?.restaurant);
	const localRestaurants = useAppSelector((state) => state?.restaurant?.localRestaurants)
	const topRestaurants = useAppSelector((state) => state?.restaurant?.topRestaurants)
	const apiToken = useAppSelector((state) => state?.auth?.apiToken);
	const foodCategories = useAppSelector((state) => state?.restaurant?.categories);

	console.log('🏠 HomePageComponent Redux state:', {
		'restaurant status': restaurantState?.status,
		'restaurant error': restaurantState?.error,
		'localRestaurants type': typeof localRestaurants,
		'localRestaurants isArray': Array.isArray(localRestaurants),
		'localRestaurants length': localRestaurants?.length,
		'topRestaurants type': typeof topRestaurants,
		'topRestaurants isArray': Array.isArray(topRestaurants),
		'topRestaurants length': topRestaurants?.length,
		'isLoading': isLoading,
		'first local restaurant': localRestaurants?.[0]?.Name,
		'first top restaurant': topRestaurants?.[0]?.Name
	});

	React.useEffect((): (() => void) => {
		let isMounted: boolean = true;
		
		const requestLocationAndFetchData = async (): Promise<void> => {
			setIsLoading(true);
			
			try {
				// Step 1: Check if user already has location in Redux
				if (!user.latitude || !user.longitude) {
					console.log('🗺️ No location found in Redux, requesting location permission...');
					
					// Request location permission
					const { status } = await Location.requestForegroundPermissionsAsync();
					if (status !== 'granted') {
						console.log('❌ Location permission denied');
						// Continue with just top restaurants and categories (no local restaurants)
						await fetchDataWithoutLocation();
						return;
					}
					
					console.log('✅ Location permission granted, getting current location...');
					
					// Get current location
					const location = await Location.getCurrentPositionAsync({
						accuracy: Location.Accuracy.Balanced,
						timeInterval: 5000,
					});
					
					console.log('📍 Current location obtained:', {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude
					});
					
					// Update Redux with current location
					await dispatch(updateUserLocation({
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						address: user.address || 'Current Location',
						userId: user.userId!
					}));
					
					console.log('✅ Location saved to Redux, now fetching all data...');
					
					// Now fetch all data with location
					await fetchAllData(location.coords.latitude, location.coords.longitude);
				} else {
					console.log('✅ User already has location, fetching data with existing coords');
					await fetchAllData(user.latitude, user.longitude);
				}
			} catch (error) {
				console.error('❌ Error getting location:', error);
				// Fallback: fetch data without location (only top restaurants and categories)
				await fetchDataWithoutLocation();
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};
		
		const fetchAllData = async (latitude: number, longitude: number): Promise<void> => {
			const promises = [
				dispatch(getLocalRestaurants({ latitude, longitude, apiToken: user.apiToken! })),
				dispatch(getTopRestaurants({ apiToken: user.apiToken! })),
				dispatch(getAllCategories({ apiToken: user.apiToken! })),
			] as const;
			await Promise.all(promises);
		};
		
		const fetchDataWithoutLocation = async (): Promise<void> => {
			console.log('⚠️ Fetching data without location (no local restaurants)');
			const promises = [
				dispatch(getTopRestaurants({ apiToken: user.apiToken! })),
				dispatch(getAllCategories({ apiToken: user.apiToken! })),
			] as const;
			await Promise.all(promises);
		};

		// Debug: Check user location data
		console.log('🗺️ User location data:', {
			hasLatitude: !!user.latitude,
			hasLongitude: !!user.longitude,
			latitude: user.latitude,
			longitude: user.longitude,
			hasApiToken: !!user.apiToken
		});

		requestLocationAndFetchData();
		return (): void => {
			isMounted = false;
		};
	}, [user.latitude, user.longitude, useAppDispatch, apiToken]);

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: -30 }}>
				<Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.black }}>Waitress</Text>
			</View>
			<HomepageButtons />
			<CategoriesComponent foodCategories={foodCategories} />
			<TopRestaurantsComponent isLoading={isLoading} topRestaurants={topRestaurants} />
			<LocalRestaurantsComponent isLoading={isLoading} localRestaurants={localRestaurants} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	categoryContainer: {
		flex: 1,
		marginBottom: 10,
	},
	columnsContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	column: {
		flexDirection: 'column',
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: 2,
	},
	button: {
		padding: 15,
		backgroundColor: '#eee',
		borderRadius: 5,
		marginBottom: 0,
		width: 180,
		borderWidth: 1,
		borderColor: 'black',
	},
});



export default HomePageComponent;
