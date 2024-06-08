import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories, getLocalRestaurants, getSingleRestaurant, getTopRestaurants } from './thunk';

const initialState = {
	localRestaurants: [],
	topRestaurants: [],
	singleRestaurant: null,
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
				state.localRestaurants = action.payload;
			})
			.addCase(getLocalRestaurants.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
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
				state.error = action.error.message;
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
				state.error = action.error.message;
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
				state.error = action.error.message;
			});
	},
});

export const { resetState } = restaurantSlice.actions;

export default restaurantSlice.reducer;
