import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories, getLocalRestaurants, getSingleRestaurant, getTopRestaurants } from './thunk';
import { Category, Restaurant } from 'types/types';

interface RestaurantSlice {
	localRestaurants: Restaurant[] ;
	topRestaurants: Restaurant[] ;
	singleRestaurant: Restaurant;
	categories: Category[] ;
	status: string ;
	error: string | null ;
}

const initialState: RestaurantSlice = {
	localRestaurants: [],
	topRestaurants: [],
	singleRestaurant: {} as Restaurant,
	categories: [],
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
				state.localRestaurants = action.payload
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
				state.topRestaurants = action.payload;
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
				state.singleRestaurant = action.payload;
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
				state.categories = action.payload;
			})
			.addCase(getAllCategories.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? null;
			});
	},
});

export const { resetState } = restaurantSlice.actions;

export default restaurantSlice.reducer;
