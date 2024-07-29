/**
 * Route slice
 */
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    showAccountTabBackButton: false,
}

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setShowAccountTabBackButton: (state, action) => {
            state.showAccountTabBackButton = action.payload
        },
    }
})

export const { setShowAccountTabBackButton } = routesSlice.actions

export default routesSlice.reducer

