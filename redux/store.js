import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import restaurantSlice from './restaurantSlice';


const store = configureStore({
	reducer: {
		auth: authSlice,
		restaurant: restaurantSlice
	},
});

export default store;
