import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	order: [],
	status: 'idle',
	error: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrders: (state, action) => {
			state.order = action.payload;
		},
		setOrderStatus: (state, action) => {
			state.status = action.payload;
		},
		setOrderError: (state, action) => {
			state.error = action.payload;
		},
		updateOrderItem: (state, action) => {
			const { itemName, quantity, price } = action.payload;
			const existingItem = state.order.find((order) => order.itemName === itemName);
			if (existingItem) {
				existingItem.quantity = quantity;
				existingItem.price = price;
			} else {
				state.order.push({ itemName, quantity, price });
			}
		},
	},
});

export const { setOrders, setOrderStatus, setOrderError, updateOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
