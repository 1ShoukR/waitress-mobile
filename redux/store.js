import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import restaurantSlice from './restaurantSlice';
import routesSlice from './routesSlice';


const store = configureStore({
	reducer: {
		auth: authSlice,
		restaurant: restaurantSlice,
		routes: routesSlice
	},
});

export default store;
