/**
 * Async thunks for redux
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

export const doLogin = createAsyncThunk('auth/doLogin', async (requestData) => {
	const formData = new FormData();
	formData.append('email', requestData.email);
	formData.append('password', requestData.password);
	formData.append('user_agent', requestData.user_agent)
	const data = await client.post('/auth/login', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data;
});

export const createUserAccountThunk = createAsyncThunk('user/createUserAccountThunk', async (requestData) => {
	const formData = new FormData()
	formData.append('first_name', requestData.firstName)
	formData.append('last_name', requestData.lastName)
	formData.append('email', requestData.email)
	formData.append('user_type', requestData.userType)
	formData.append('password', requestData.password)
	const data = await client.post('/user/create', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } })
	return data
});


export const getLocalRestaurants = createAsyncThunk('restaurant/getLocal', async (requestData) => {
	const formData = new FormData()
	formData.append('latitude', requestData.latitude);
	formData.append('longitude', requestData.longitude);
	const data = await client.post('/restaurant/local', formData, null, { headers: { redirect: 'follow', referrerPolicy: 'no-referrer' } });
	return data
})
