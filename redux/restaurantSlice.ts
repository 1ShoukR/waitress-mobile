import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories, getLocalRestaurants, getSingleRestaurant, getTopRestaurants } from './thunk';
import { Category, Restaurant } from 'types/types';

interface RestaurantSlice {
	localRestaurants: Restaurant[] | null;
	topRestaurants: Restaurant[] | null;
	singleRestaurant: Restaurant | null;
	categories: Category[] | null;
	status: string | null;
	error: string | null;
}

const initialState: RestaurantSlice = {
	localRestaurants: null,
	topRestaurants: null,
	singleRestaurant: null,
	categories: null,
	status: 'idle',
	error: null,
};

const restaurantSlice = createSlice({
	name: 'restaurant',
	initialState,
	reducers: {
		resetState: (state) => {
			state.localRestaurants = [];
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getLocalRestaurants.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getLocalRestaurants.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.localRestaurants = action.payload.restaurants || action.payload.localRestaurants || [];
			})
			.addCase(getLocalRestaurants.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? null;
			})
			.addCase(getTopRestaurants.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getTopRestaurants.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.topRestaurants = action.payload.restaurants || [];
			})
			.addCase(getTopRestaurants.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? null;
			})
			.addCase(getSingleRestaurant.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getSingleRestaurant.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.singleRestaurant = action.payload.restaurant;
			})
			.addCase(getSingleRestaurant.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? null;
			})
			.addCase(getAllCategories.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getAllCategories.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.categories = action.payload.categories;
			})
			.addCase(getAllCategories.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? null;
			});
	},
});

export const { resetState } = restaurantSlice.actions;

export default restaurantSlice.reducer;
