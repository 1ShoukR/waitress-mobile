/**
 * Auth slice
 */
import { createSlice } from '@reduxjs/toolkit';
import { doLogin } from './thunk';

const initialState = {
	apiToken: null,
	authType: null,
	userId: null,
	firstName: null,
	lastName: null,
	email: null,
	userType: null,
	status: 'idle',
	error: null,
	lastTab: 'HomeTab',
	latitude: null,
	longitude: null
};

const authSlice = createSlice({
    name: 'auth',
	initialState,
	reducers: {
        loggedOut: (state) => {
			state.status = 'idle';
			state.apiToken = null;
			state.userId = null;
			state.firstName = null;
			state.lastName = null;
			state.email = null;
			state.userType = null;
			state.authType = null;
			state.longitude = null;
			state.latitude = null;
		},
		setLastTab: (state, action) => {
			state.lastTab = action.payload
		}
        /*
        In theory, this is how we will determine what 
        tab is active when we switch between tabs.
        That way we can make sure the user stays on the 
        same tab when they refresh the page.
        -------------------------------------------------
        someTabButton: (state) => {
                state.lastTab = 'some tab name';
            },
            someTabButton: (state) => {
                    state.lastTab = 'some tab name';
                },
         */
	},
	extraReducers(builder) {
		builder
			.addCase(doLogin.pending, (state, action) => {
				console.log('loading')
				state.status = 'loading';
			})
			.addCase(doLogin.fulfilled, (state, action) => {
				const payload = action.payload;
				if (payload && payload.token && payload.user) {
					state.apiToken = payload.token;
					state.userId = payload.user.user_id;
					state.firstName = payload.user.first_name;
					state.lastName = payload.user.last_name;
					state.email = payload.user.email;
					state.userType = payload.user.type;
					state.authType = payload.user.auth_type;
					state.status = 'succeeded';
					state.latitude = payload.user.latitude
					state.longitude = payload.user.longitude
					console.log('teaaaaaa')
					// Add additional logic if needed for authgroup based on userType or authType
				} else {
					state.status = 'failed';
					state.error = 'Login failed. Please try again.';
					console.log('NOOOO')
				}
			})
			.addCase(doLogin.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
				console.error(action.error.message)
			})
	},
});

export const { loggedOut, setLastTab } = authSlice.actions;
export default authSlice.reducer;

export const selectApiToken = (state) => state.auth.apiToken;
// TODO: Add more selectors for new state fields like firstName, lastName, etc.

