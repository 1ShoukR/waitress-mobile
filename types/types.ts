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
	Entity?: any;
	Payments: any | null; // Replace with actual type if available
	userType: string;
	createdAt: string;
	darkMode: boolean;
	Reservations: Reservation[] | null;
};
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
	restaurants?: Restaurant[];
	localRestaurants?: Restaurant[];
}
export interface TopRestaurantResponse {
    restaurants: Restaurant[];
}

export interface Category {
	CategoryID: number;
	CategoryName: string;
	ImageURL: string | null;
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
	Rating: number;
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
	Categories?: Category[];
	NumberOfTables?: number;
	Latitude?: number;
	Longitude?: number;
	Receipts?: Receipt[];
	Reservations?: Reservation[];
	MenuItems?: MenuItem[];
	Owner: User;
	Ratings?: Rating[];
	ImageURL?: string;
	AverageRating?: number;
	ReviewCount?: number;
}

export interface MenuItem {
	Category: string;
	Description: string;
	ImageURL: string;
	IsAvailable: boolean;
	MenuID: number;
	NameOfItem: string;
	Price: number;
	Restaurant: RestaurantSummary;
	RestaurantID: number;
}

export interface RestaurantSummary {
	Address: string;
	AverageRating: number;
	Categories: Category[] | null;
	Email: string;
	ImageURL: string | null;
	Latitude: number | null;
	Longitude: number | null;
	MenuItems: MenuItem[] | null;
	Name: string;
	NumberOfTables: number | null;
	Owner: User;
	OwnerID: number;
	Phone: string;
	Ratings: Rating[] | null;
	Receipts: Receipt[] | null;
	Reservations: Reservation[] | null;
	RestaurantId: number;
	ReviewCount: number | null;
	Website: string | null;
}
export interface AllCategoriesResponse {
	categories: Category[];
}

export type ApiKey = {
    apiKey?: string;
    apiToken?: string;
}

export type Order = {
	itemName: string;
	quantity: number;
	price: number;
	restaurant: Restaurant;
}

export interface CreateAccountResponse {
	message: string;
	user: {
		Entity: {
			FirstName: string;
			LastName: string;
			CreatedAt: string;
			UpdatedAt: string;
		};
		UserID: number;
		Email: string;
		AuthType: string;
		Latitude: number;
		Longitude: number;
		Address: string;
		AccessRevoked: boolean;
		ProfileImage: string;
		Ratings: Rating[];
		Reservations: Reservation[];
	};
	token: string;
	apiToken?: string | null;
}

export interface UpdateUserAccountRequest {
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	phone: string | null;
	address: string | null;
	city: string | null;
	state: string | null;
	zip: string | null;
	userId: number | null;
}

export interface UpdateUserAccountResponse {
	message: string;
	user: {
		UserID: number;
		Entity: {
			FirstName: string;
			LastName: string;
			CreatedAt: string;
			UpdatedAt: string;
		};
		Email: string;
		AuthType: string;
		Latitude: number;
		Longitude: number;
		Phone: string | null; 
		Address: string | null; 
		AccessRevoked: boolean;
		ProfileImage: string | null; 
		Ratings: Rating[];
		Reservations: Reservation[];
	};
	token: string;
}

export interface CreateAccountRequestData {
	firstName: string;
	lastName: string;
	email: string;
	userType: string;
	password: string;
	userAddress: {
		latitude: number;
		longitude: number;
		address: string;
		city: string;
		state: string;
		zip: string;
	};
}

export type InitialStateForm = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	address: string;
	city: string;
	state: string;
	zip: string;
}

export interface SingleRestaurantRequest {
	restaurantId: string | string[];
	apiToken: string | null | undefined;
}

export interface SingleRestaurantResponse {
	restaurant: Restaurant;
}

export type Darkmoderesponse = boolean

export type DarkmodeRequest = boolean

export interface MenuItemResponse {
	MenuItem: MenuItem;
};