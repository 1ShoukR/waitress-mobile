import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import restaurantSlice from './restaurantSlice';
import routesSlice from './routesSlice';
import orderSlice from './orderSlice';
import miscSlice from './miscSlice';
import tableSlice from './tableSlice';


const store = configureStore({
	reducer: {
		auth: authSlice,
		restaurant: restaurantSlice,
		routes: routesSlice,
		orders: orderSlice,
		misc: miscSlice,
		tables: tableSlice,
	},
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store;
