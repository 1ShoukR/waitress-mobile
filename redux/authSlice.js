/**
 * Auth slice
 */
import { createSlice } from '@reduxjs/toolkit';
import { createUserAccountThunk, doLogin, setDarkMode, updateUserAccount, updateUserLocation } from './thunk';

const initialState = {
	apiToken: null,
	authType: null,
	userId: null,
	firstName: null,
	lastName: null,
	email: null,
	userType: null,
	loginStatus: 'idle', // Renamed from status to loginStatus for clarity
	updateLocationStatus: 'idle', // Added separate status for location updates
	error: null,
	lastTab: 'HomeTab',
	latitude: null,
	longitude: null,
	address: null,
	createdAt: null,
	darkMode: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loggedOut: (state) => {
			// Reset all fields appropriately
			Object.assign(state, initialState);
		},
		setLastTab: (state, action) => {
			state.lastTab = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(doLogin.pending, (state) => {
				state.loginStatus = 'loading';
			})
			.addCase(doLogin.fulfilled, (state, action) => {
				const payload = action.payload;
				if (payload && payload.token) {
					// Update login-related fields
					state.apiToken = payload.token;
					state.userId = payload.user.userId;
					state.firstName = payload.user.firstName;
					state.lastName = payload.user.lastName;
					state.email = payload.user.email;
					state.authType = payload.user.authType;
					state.latitude = payload.user.latitude;
					state.longitude = payload.user.longitude;
					state.address = payload.user.address;
					state.userType = payload.user.authType;
					state.createdAt = payload.user.createdAt;
					state.loginStatus = 'succeeded';
				} else {
					state.loginStatus = 'failed';
					state.error = 'Login failed. Please try again.';
				}
			})
			.addCase(doLogin.rejected, (state, action) => {
				state.loginStatus = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateUserLocation.pending, (state) => {
				state.updateLocationStatus = 'loading';
			})
			.addCase(updateUserLocation.fulfilled, (state, action) => {
				const payload = action.payload;
				if (payload && payload.latitude) {
					// Update location-related fields
					state.latitude = payload.latitude;
					state.longitude = payload.longitude;
					state.address = payload.address;
					state.updateLocationStatus = 'succeeded';
				} else {
					state.updateLocationStatus = 'failed';
					state.error = 'Update location failed. Please try again.';
				}
			})
			.addCase(updateUserLocation.rejected, (state, action) => {
				state.updateLocationStatus = 'failed';
				state.error = action.error.message;
			})
			.addCase(createUserAccountThunk.pending, (state) => { 
				state.loginStatus = 'loading';
			})
			.addCase(createUserAccountThunk.fulfilled, (state, action) => {
				const payload = action.payload;
				if (payload && payload.token) {
                    state.apiToken = payload.token;
                    state.userId = payload.user.UserID;
                    state.firstName = payload.user.Entity.FirstName;
                    state.lastName = payload.user.Entity.LastName;
                    state.email = payload.user.Email;
                    state.authType = payload.user.AuthType;
                    state.latitude = payload.user.Latitude;
                    state.longitude = payload.user.Longitude;
                    state.address = payload.user.Address;
                    state.userType = payload.user.AuthType;
                    state.createdAt = payload.user.Entity.CreatedAt;
                    state.updatedAt = payload.user.Entity.UpdatedAt;
                    state.accessRevoked = payload.user.AccessRevoked;
                    state.profileImage = payload.user.ProfileImage;
                    state.ratings = payload.user.Ratings;
                    state.reservations = payload.user.Reservations;
                    state.loginStatus = 'succeeded';
				} else {
					state.loginStatus = 'failed';
					state.error = 'Login failed. Please try again.';
				}
			})
			.addCase(createUserAccountThunk.rejected, (state, action) => {
				state.loginStatus = 'failed';
				state.error = action.error.message;
			})
			.addCase(setDarkMode.pending, (state) => {
				state.darkMode = !state.darkMode;
			}
			)
			.addCase(setDarkMode.fulfilled, (state, action) => {
				state.darkMode = action.payload;
			})
			.addCase(setDarkMode.rejected, (state, action) => {
				state.darkMode = !state.darkMode;
			})
			.addCase(updateUserAccount.pending, (state) => {
				state.loginStatus = 'loading';
			})
			.addCase(updateUserAccount.fulfilled, (state, action) => {
				const payload = action.payload;
				if (payload && payload.token) {
					state.userId = payload.user.userId;
					state.firstName = payload.user.firstName;
					state.lastName = payload.user.lastName;
					state.email = payload.user.email;
					state.authType = payload.user.authType;
					state.latitude = payload.user.latitude;
					state.longitude = payload.user.longitude;
					state.address = payload.user.address;
					state.userType = payload.user.authType;
					state.createdAt = payload.user.createdAt;
					state.loginStatus = 'succeeded';
				} else {
					state.loginStatus = 'failed';
					state.error = 'Login failed. Please try again.';
				}
			})
			.addCase(updateUserAccount.rejected, (state, action) => {
				state.loginStatus = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { loggedOut, setLastTab } = authSlice.actions;
export default authSlice.reducer;

export const selectApiToken = (state) => state.auth.apiToken;
// TODO: Add more selectors for new state fields like firstName, lastName, etc.

