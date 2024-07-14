import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import restaurantSlice from './restaurantSlice';
import routesSlice from './routesSlice';
import orderSlice from './orderSlice';


const store = configureStore({
	reducer: {
		auth: authSlice,
		restaurant: restaurantSlice,
		routes: routesSlice,
		orders: orderSlice
	},
});

export default store;
