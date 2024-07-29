/**
 * Async thunks for redux
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';
import { AllCategoriesResponse, ApiKey, CreateAccountRequestData, CreateAccountResponse, Darkmoderesponse, LocalRestaurantsResponse, LocationData, LoginRequestData, LoginResponse, Restaurant, SingleRestaurantRequest, SingleRestaurantResponse, TopRestaurantResponse, UpdateUserAccountRequest, UpdateUserAccountResponse, UpdateUserLocationRequest, UserLocation } from 'types/types';

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

export const getLocalRestaurants = createAsyncThunk<LocalRestaurantsResponse, LocationData>('restaurant/getLocalRestaurants', async (locationData: LocationData) => {
	const body = {
		latitude: locationData.latitude,
		longitude: locationData.longitude,
		apiToken: locationData.apiToken,
	};
	const data = await client.post<LocalRestaurantsResponse>('/api/restaurant/local', JSON.stringify(body), null, { headers: { 'Content-Type': 'application/json' } });
	return data;
});

export const getTopRestaurants = createAsyncThunk<TopRestaurantResponse, ApiKey>('restaurant/getTopRestaurants', async (requestData) => {
	const body = {
		apiToken: requestData.apiToken,
	};
	const data = await client.post<TopRestaurantResponse>('/api/restaurant/top10restaurants/', JSON.stringify(body), null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});

export const getAllCategories = createAsyncThunk<AllCategoriesResponse, ApiKey>('restaurant/getAllCategories', async (requestData) => {
	const body = {
		apiToken: requestData.apiToken,
	};
	const data = await client.post<AllCategoriesResponse>('/api/restaurant/categories/get-all', JSON.stringify(body), null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
})

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

export const getSingleRestaurant = createAsyncThunk<SingleRestaurantResponse, SingleRestaurantRequest>('restaurant/getSingleRestaurant', async (requestData) => {
	const data = await client.post<SingleRestaurantResponse>(`/api/restaurant/${requestData.restaurantId}/get`, null, requestData.apiToken, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
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