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
export interface LocationData {
	latitude: number;
	longitude: number;
	apiToken: string;
}

export interface LoginRequestData {
	email: string;
	password: string;
	userAgent: string | null;
}

export interface UserLocation {
    latitude: number;
    longitude: number;
    address: string | null;
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

export interface LocalRestaurantsResponse {
	restaurants: Restaurant[];
}

export interface TopRestaurantResponse {
    restaurants: Restaurant[];
}

export interface Category {
	categoryId: number;
	categoryName: string;
    imageURL: string;
}

export interface Receipt {
	receiptId: number;
    assignedWaiterId: number;
    assignedUserId: number;
    restaurantId: number;
    restaurant: Restaurant
}

export interface Reservation {
	reservationId: number;
    restaurantId: number;
    userId: number;
    tableId: number;
    time: string;
    restaurant: Restaurant;
}

export interface MenuItem {
	menuItemId: number;
    restaurantId: number;
    nameOfItem: string;
    price: number;
    isAvailable: boolean;
    category: Category;
    imageUrl: string;
    description: string;
    restaurant: Restaurant;
}

export interface Rating {
	ratingId: number;
	comment: string;
	rating: number;
	restaurantId: number;
	userId: number;
    restaurant: Restaurant;
}

export interface Restaurant {
	RestaurantId: number;
	OwnerID: number;
	Name: string;
	Address: string;
	Phone: string;
	Email: string;
	Website?: string;
	Categories: Category[];
	NumberOfTables?: number;
	Latitude?: number;
	Longitude?: number;
	Receipts: Receipt[];
	Reservations?: Reservation[];
	MenuItems?: MenuItem[];
	Owner: User;
	Ratings?: Rating[];
	ImageURL?: string;
	AverageRating: number;
	ReviewCount?: number;
}

export interface AllCategoriesResponse {
	categories: Category[];
}

export type ApiKey = {
    apiKey?: string;
    apiToken?: string;
}