import { createSlice } from '@reduxjs/toolkit';
import { getLocalRestaurants } from './thunk';

const initialState = {
	restaurants: [],
	status: 'idle', 
	error: null,
};

const restaurantSlice = createSlice({
	name: 'restaurant',
	initialState,
	reducers: {
		resetState: (state) => {
			state.restaurants = [];
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
				state.restaurants = action.payload;
			})
			.addCase(getLocalRestaurants.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message; 
			});
	},
});

export const { resetState } = restaurantSlice.actions;

export default restaurantSlice.reducer;
