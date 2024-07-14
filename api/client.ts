import { REACT_APP_API_URL } from '@env';
import { Platform } from 'react-native';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : REACT_APP_API_URL;

console.log('env', API_URL);
export async function client(endpoint, { body, ...customConfig } = {}, token = null) {
	const headers = { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'any' };
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const config = {
		method: body ? 'POST' : 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers,
		},
	};

	if (body) {
		config.body = JSON.stringify(body);
	}

	let data;

	try {
		const response = await fetch(`${API_URL}${endpoint}`, config);
		data = await response.json();
		if (response.ok) {
			return data;
		}
		throw new Error(response.statusText);
	} catch (err) {
		return Promise.reject(err.message ? err.message : data);
	}
}

client.get = function (endpoint, token = null, customConfig = {}) {
	return client(endpoint, { ...customConfig, method: 'GET' }, token);
};

client.post = function (endpoint, body, token = null, customConfig = {}) {
	return client(endpoint, { ...customConfig, body: body, method: 'POST' }, token);
};
