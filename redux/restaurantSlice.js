import { createSlice } from '@reduxjs/toolkit';
import { getLocalRestaurants, getTopRestaurants } from './thunk';

const initialState = {
	localRestaurants: [],
	topRestaurants: [],
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
			});
	},
});

export const { resetState } = restaurantSlice.actions;

export default restaurantSlice.reducer;
