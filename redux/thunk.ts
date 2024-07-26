/**
 * Async thunks for redux
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';
import { AllCategoriesResponse, ApiKey, CreateAccountRequestData, CreateAccountResponse, LocalRestaurantsResponse, LocationData, LoginRequestData, LoginResponse, Restaurant, TopRestaurantResponse, UpdateUserLocationRequest, UserLocation } from 'types/types';

export const doLogin = createAsyncThunk<LoginResponse, LoginRequestData, { rejectValue: string }>('auth/doLogin', async (requestData, { rejectWithValue }) => {
	const body = {
		email: requestData.email,
		password: requestData.password,
		userAgent: requestData.userAgent,
	};
	try {
		const data = await client.post('/api/auth/login', body, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
		return data;
	} catch (err: any) {
		return rejectWithValue(err.message || 'Login failed');
	}
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
	const data = await client.post<TopRestaurantResponse>('/api/restaurant/top10restaurants/', body, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});

export const getAllCategories = createAsyncThunk<AllCategoriesResponse, ApiKey>('restaurant/getAllCategories', async (requestData) => {
	const body = {
		apiToken: requestData.apiToken,
	};
	const data = await client.post<AllCategoriesResponse>('/api/restaurant/categories/get-all', body, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
})

export const updateUserLocation = createAsyncThunk<UserLocation, UpdateUserLocationRequest>('user/updateUserLocation', async (requestData) => {
	const body = {
		latitude: requestData.latitude,
		longitude: requestData.longitude,
		userId: requestData.userId,
		address: requestData.address,
	};
	const data = await client.post <UserLocation>('/api/users/update-user-location', body, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});
export const getSingleRestaurant = createAsyncThunk('restaurant/getSingleRestaurant', async (requestData) => {
	const formData = new FormData();
	formData.append('apiToken', requestData.apiToken);
	formData.append('restaurantId', requestData.restaurantId);
	const data = await client.post(`/api/restaurant/${requestData.restaurantId}/get`,  null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});

export const setDarkMode = createAsyncThunk('auth/setDarkMode', async (darkMode) => {
	return darkMode;
});

export const updateUserAccount = createAsyncThunk('auth/updateUserAccount', async (requestData) => {
	const formData = new FormData();
	formData.append('firstName', requestData.firstName);
	formData.append('lastName', requestData.lastName);
	formData.append('email', requestData.email);
	formData.append('phone', requestData.phone);
	formData.append('street', requestData.street);
	formData.append('city', requestData.city);
	formData.append('state', requestData.state);
	formData.append('zip', requestData.zip);
	formData.append('userId', requestData.userId);
	const data = await client.post('/api/users/update-account-info', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data
});

export const resetUpdateUserAccountStatus = createAsyncThunk('auth/resetUpdateUserAccountStatus', async () => {
	return 'idle';
});