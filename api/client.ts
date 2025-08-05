import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL ? process.env.EXPO_PUBLIC_API_URL : 'http://localhost:8080';

console.log('env', API_URL);

interface CustomConfig extends RequestInit {
	headers?: HeadersInit;
	body?: BodyInit | null | undefined;
}

interface ClientOptions extends CustomConfig {
	body?: BodyInit | null | undefined;
}

export async function client<T>(endpoint: string, { body, ...customConfig }: ClientOptions = {}, token: string | null = null): Promise<T> {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		'ngrok-skip-browser-warning': 'any',
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const config: RequestInit = {
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

	if (body && typeof body !== 'string') {
		config.body = JSON.stringify(body);
	} else {
		config.body = body;
	}

	let data: T = {} as T;

	try {
		const response = await fetch(`${API_URL}${endpoint}`, config);
		data = await response.json();
		if (response.ok) {
			return data;
		}
		throw new Error(response.statusText);
	} catch (err) {
		return Promise.reject((err as Error).message ? (err as Error).message : data);
	}
}

client.get = function <T>(endpoint: string, token: string | null = null, customConfig: CustomConfig = {}): Promise<T> {
	return client<T>(endpoint, { ...customConfig, method: 'GET' }, token);
};

client.post = function <T>(endpoint: string, body: BodyInit | null | undefined, token: string | null = null, customConfig: CustomConfig = {}): Promise<T> {
	return client<T>(endpoint, { ...customConfig, body, method: 'POST' }, token);
};

client.put = function <T>(endpoint: string, body: BodyInit | null | undefined, token: string | null = null, customConfig: CustomConfig = {}): Promise<T> {
	return client<T>(endpoint, { ...customConfig, body, method: 'PUT' }, token);
};

client.delete = function <T>(endpoint: string, token: string | null = null, customConfig: CustomConfig = {}): Promise<T> {
	return client<T>(endpoint, { ...customConfig, method: 'DELETE' }, token);
};

export default client;
