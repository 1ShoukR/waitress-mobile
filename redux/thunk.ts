/**
 * Async thunks for redux
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

export const doLogin = createAsyncThunk('auth/doLogin', async (requestData) => {
	const body = {
		email: requestData.email,
		password: requestData.password,
		userAgent: requestData.userAgent,
	};
	const data = await client.post('/api/auth/login', body, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});

export const createUserAccountThunk = createAsyncThunk('auth/createUserAccountThunk', async (requestData) => {
	const formData = new FormData();
	formData.append('firstName', requestData.firstName);
	formData.append('lastName', requestData.lastName);
	formData.append('email', requestData.email);
	formData.append('userType', requestData.userType);
	formData.append('password', requestData.password);
	formData.append('latitude', requestData.userAddress.latitude);
	formData.append('longitude', requestData.userAddress.longitude);
	formData.append('address', requestData.userAddress.address);
	formData.append('city', requestData.userAddress.city);
	formData.append('state', requestData.userAddress.state);
	formData.append('zip', requestData.userAddress.zip);
	const data = await client.post('/api/users/create', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});


export const getLocalRestaurants = createAsyncThunk('restaurant/getLocalRestaurants', async (locationData) => {
	const body = {
		latitude: locationData.latitude,
		longitude: locationData.longitude,
		apiToken: locationData.apiToken,
	};
	const data = await client.post('/api/restaurant/local', body, null, { headers: { 'Content-Type': 'application/json' } });
	return data;
});

export const getTopRestaurants = createAsyncThunk('restaurant/getTopRestaurants', async (requestData) => {
	const formData = new FormData();
	formData.append('apiToken', requestData.apiToken);
	const data = await client.post('/api/restaurant/top10restaurants/', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});

export const getAllCategories = createAsyncThunk('restaurant/getAllCategories', async (requestData) => {
	const formData = new FormData();
	formData.append('apiToken', requestData.apiToken);
	const data = await client.post('/api/restaurant/categories/get-all', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
})

export const updateUserLocation = createAsyncThunk('user/updateUserLocation', async (requestData) => {
	const formData = new FormData();
	formData.append('latitude', requestData.latitude);
	formData.append('longitude', requestData.longitude);
	formData.append('userId', requestData.userId);
	formData.append('address', requestData.address);
	const data = await client.post('/api/users/update-user-location', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
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