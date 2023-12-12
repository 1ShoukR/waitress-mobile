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
