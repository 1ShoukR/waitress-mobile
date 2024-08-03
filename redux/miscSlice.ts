import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// This slice will hold all the miscellaneous data that doesn't fit into any other slice

interface MiscSlice {
    PlaceOrderScreenHeaderIcon: IconDefinition
}

const initialState: MiscSlice = {
    PlaceOrderScreenHeaderIcon: faChevronDown
}


const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setPlaceOrderScreenHeaderIcon: (state, action) => {
            state.PlaceOrderScreenHeaderIcon = action.payload;
        }
    }
})

export const { setPlaceOrderScreenHeaderIcon } = miscSlice.actions;

export default miscSlice.reducer;