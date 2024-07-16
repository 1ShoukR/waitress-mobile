export interface ClientConfig {
    endpoint: string;
    
}

export type User = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    authType: string;
    latitude: number;
    longitude: number;
    address: string;
    userType: string;
    createdAt: string;
    darkMode: boolean;
}
export interface LoginRequestData {
	email: string;
	password: string;
	userAgent: string | null;
}

export interface UserLocation {
    latitude: number;
    longitude: number;
    address: string;
}

export interface UpdateUserLocationRequest {
	latitude: number;
	longitude: number;
	userId: number | null;
	address: string; // Added address field
}

export interface LoginResponse {
    token: string
    apiToken: string
    user: User
}