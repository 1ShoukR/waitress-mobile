/**
 * Route slice
 */
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    showAccountTabBackButton: false,
    showAdminTabBackButton: false,
}

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setShowAccountTabBackButton: (state, action) => {
            state.showAccountTabBackButton = action.payload
        },
        setShowAdminTabBackButton: (state, action) => {
            state.showAdminTabBackButton = action.payload
        }
    }
})

export const { setShowAccountTabBackButton, setShowAdminTabBackButton } = routesSlice.actions

export default routesSlice.reducer

