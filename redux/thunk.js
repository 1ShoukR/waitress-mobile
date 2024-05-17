/**
 * Async thunks for redux
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

export const doLogin = createAsyncThunk('auth/doLogin', async (requestData) => {
	const formData = new FormData();
	formData.append('email', requestData.email);
	formData.append('password', requestData.password);
	formData.append('userAgent', requestData.userAgent)
	const data = await client.post('/api/auth/login', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});

export const createUserAccountThunk = createAsyncThunk('user/createUserAccountThunk', async (requestData) => {
	const formData = new FormData()
	formData.append('firstName', requestData.firstName)
	formData.append('lastName', requestData.lastName)
	formData.append('email', requestData.email)
	formData.append('userType', requestData.userType)
	formData.append('password', requestData.password)
	formData.append('latitude', requestData.userAddress.latitude);
	formData.append('longitude', requestData.userAddress.longitude);
	formData.append('address', requestData.userAddress.address);
	formData.append('city', requestData.userAddress.city);
	formData.append('state', requestData.userAddress.state);
	formData.append('zip', requestData.userAddress.zip);
	const data = await client.post('/api/users/create', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data
});


export const getLocalRestaurants = createAsyncThunk('restaurant/getLocal', async (requestData) => {
	console.log('requestData', requestData)
	const formData = new FormData()
	formData.append('latitude', requestData.latitude);
	formData.append('longitude', requestData.longitude);
	formData.append('apiToken', requestData.apiToken);
	const data = await client.post('/api/restaurant/local', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data
})


export const updateUserLocation = createAsyncThunk('user/updateUserLocation', async (requestData) => {
	const formData = new FormData();
	console.log('requestData', requestData)
	formData.append('latitude', requestData.latitude);
	formData.append('longitude', requestData.longitude);
	formData.append('userId', requestData.userId);
	formData.append('address', requestData.address);
	const data = await client.post('/api/users/update-user-location', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});