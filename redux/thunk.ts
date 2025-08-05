/**
 * Async thunks for redux
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';
import { AllCategoriesResponse, ApiKey, Category, CreateAccountRequestData, CreateAccountResponse, Darkmoderesponse, LocalRestaurantsResponse, LocationData, LoginRequestData, LoginResponse, Restaurant, SingleRestaurantRequest, SingleRestaurantResponse, TopRestaurantResponse, UpdateUserAccountRequest, UpdateUserAccountResponse, UpdateUserLocationRequest, UserLocation } from 'types/types';

export const doLogin = createAsyncThunk<LoginResponse, LoginRequestData>('auth/doLogin', async (requestData: LoginRequestData) => {
	const body = {
		email: requestData.email,
		password: requestData.password,
		userAgent: requestData.userAgent,
	};
		const data = await client.post<LoginResponse>('/api/auth/login', JSON.stringify(body), null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
		return data;
});

export const createUserAccountThunk = createAsyncThunk<CreateAccountResponse, CreateAccountRequestData>('auth/createUserAccountThunk', async (requestData) => {
	const data = {
		firstName: requestData.firstName,
		lastName: requestData.lastName,
		email: requestData.email,
		userType: requestData.userType,
		password: requestData.password,
		latitude: requestData.userAddress.latitude,
		longitude: requestData.userAddress.longitude,
		address: requestData.userAddress.address,
		city: requestData.userAddress.city,
		state: requestData.userAddress.state,
		zip: requestData.userAddress.zip,
	};

	const response = await client.post<CreateAccountResponse>('/api/users/create', JSON.stringify(data), null, {
		headers: { 'Content-Type': 'application/json', redirect: 'follow', referrerPolicy: 'no-referrer' },
	});

	return response;
});

export const getLocalRestaurants = createAsyncThunk<Restaurant[], LocationData>('restaurant/getLocalRestaurants', async (locationData: LocationData) => {
	const body = {
		latitude: locationData.latitude,
		longitude: locationData.longitude,
	};
	console.log('🔍 Fetching local restaurants with body:', body);
	console.log('🔑 Using JWT token:', locationData.apiToken);
	const data = await client.post<{restaurants: Restaurant[]}>('/api/restaurant/local', JSON.stringify(body), locationData.apiToken, { headers: { 'Content-Type': 'application/json' } });
	console.log('📡 API Response for local restaurants:', data);
	console.log('📊 Data type:', typeof data, 'Has restaurants array:', Array.isArray(data.restaurants));
	// Extract the restaurants array from the response object
	return data.restaurants || [];
});

export const getTopRestaurants = createAsyncThunk<Restaurant[], ApiKey>('restaurant/getTopRestaurants', async (requestData) => {
	const body = {};
	console.log('🔍 Fetching top restaurants');
	console.log('🔑 Using JWT token:', requestData.apiToken);
	const data = await client.post<{restaurants: Restaurant[]}>('/api/restaurant/top10restaurants/', JSON.stringify(body), requestData.apiToken, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	console.log('📡 API Response for top restaurants:', data);
	console.log('📊 Data type:', typeof data, 'Has restaurants array:', Array.isArray(data.restaurants));
	// Extract the restaurants array from the response object
	return data.restaurants || [];
});

export const getAllCategories = createAsyncThunk<Category[], ApiKey>('restaurant/getAllCategories', async (requestData) => {
	const body = {};
	console.log('🔍 Fetching categories');
	console.log('🔑 Using JWT token:', requestData.apiToken);
	const data = await client.post<Category[]>('/api/restaurant/categories/get-all', JSON.stringify(body), requestData.apiToken, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	console.log('📡 API Response for categories:', data);
	return data;
});

export const updateUserLocation = createAsyncThunk<UserLocation, UpdateUserLocationRequest>('user/updateUserLocation', async (requestData) => {
	const body = {
		latitude: requestData.latitude,
		longitude: requestData.longitude,
		userId: requestData.userId,
		address: requestData.address,
	};
	const data = await client.post<UserLocation>('/api/users/update-user-location', JSON.stringify(body), null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});

export const getSingleRestaurant = createAsyncThunk<Restaurant, SingleRestaurantRequest>('restaurant/getSingleRestaurant', async (requestData) => {
	console.log('🔍 Fetching single restaurant with ID:', requestData.restaurantId);
	console.log('🔑 Using JWT token:', requestData.apiToken);
	const data = await client.post<{restaurant: Restaurant}>(`/api/restaurant/${requestData.restaurantId}/get`, null, requestData.apiToken, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	console.log('📡 API Response for single restaurant:', data);
	console.log('📊 Data type:', typeof data, 'Has restaurant object:', !!data.restaurant);
	// Extract the restaurant object from the response
	return data.restaurant;
});

export const setDarkMode = createAsyncThunk<Darkmoderesponse, Darkmoderesponse>('auth/setDarkMode', async (darkMode) => {
	return darkMode;
});

export const updateUserAccount = createAsyncThunk<UpdateUserAccountResponse, UpdateUserAccountRequest>('auth/updateUserAccount', async (requestData) => {
	const data = {
		firstName: requestData.firstName,
		lastName: requestData.lastName,
		email: requestData.email,
		phone: requestData.phone,
		street: requestData.address,
		city: requestData.city,
		state: requestData.state,
		zip: requestData.zip,
		userId: requestData.userId,
	};
	const response = await client.post<UpdateUserAccountResponse>('/api/users/update-account-info', JSON.stringify(data), null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return response;
});

export const resetUpdateUserAccountStatus = createAsyncThunk('auth/resetUpdateUserAccountStatus', async () => {
	return 'idle';
});