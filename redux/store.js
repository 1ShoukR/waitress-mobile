import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

// Import your slices (reducers) here
// For example, if you have a userSlice, you would import it like this:
// import userReducer from '../features/user/userSlice';

const store = configureStore({
	reducer: {
		auth: authSlice
		// Add your slices (reducers) here
		// For example: user: userReducer,
	},
	// You can add middleware and devTools configuration here if needed
});

export default store;
