import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../api/client';
import { 
	EnhancedTable, 
	TableFilterParams, 
	TableLockState, 
	TableAvailabilityRequest,
	TableLockRequest,
	TableLockResponse,
	AvailableTablesResponse
} from 'types/types';

// Async Thunks
export const getAvailableTables = createAsyncThunk<
	AvailableTablesResponse, 
	TableAvailabilityRequest
>('tables/getAvailableTables', async (requestData: TableAvailabilityRequest) => {
	const params = new URLSearchParams();
	
	if (requestData.filters?.zone) params.append('zone', requestData.filters.zone);
	if (requestData.filters?.tableType) params.append('tableType', requestData.filters.tableType);
	if (requestData.filters?.view) params.append('view', requestData.filters.view);
	if (requestData.filters?.minCapacity) params.append('minCapacity', requestData.filters.minCapacity.toString());
	if (requestData.filters?.maxCapacity) params.append('maxCapacity', requestData.filters.maxCapacity.toString());
	if (requestData.requestedTime) params.append('requestedTime', requestData.requestedTime);

	const queryString = params.toString();
	const endpoint = `/api/restaurant/${requestData.restaurantId}/tables/available${queryString ? `?${queryString}` : ''}`;
	
	const data = await client.get<AvailableTablesResponse>(endpoint);
	return data;
});

export const lockTable = createAsyncThunk<
	TableLockResponse,
	TableLockRequest
>('tables/lockTable', async (requestData: TableLockRequest) => {
	const body = {
		lockDurationMinutes: requestData.lockDurationMinutes || 5
	};

	const data = await client.post<TableLockResponse>(
		`/api/restaurant/${requestData.restaurantId}/tables/${requestData.tableId}/lock`,
		JSON.stringify(body),
		null,
		{ headers: { 'Content-Type': 'application/json' } }
	);
	return data;
});

export const extendTableLock = createAsyncThunk<
	TableLockResponse,
	{ lockId: string; restaurantId: number; tableId: number; additionalMinutes?: number }
>('tables/extendTableLock', async (requestData) => {
	const body = {
		additionalMinutes: requestData.additionalMinutes || 5
	};

	const data = await client.put<TableLockResponse>(
		`/api/restaurant/${requestData.restaurantId}/tables/${requestData.tableId}/lock/${requestData.lockId}/extend`,
		JSON.stringify(body),
		null,
		{ headers: { 'Content-Type': 'application/json' } }
	);
	return data;
});

export const releaseTableLock = createAsyncThunk<
	{ success: boolean },
	{ lockId: string; restaurantId: number; tableId: number }
>('tables/releaseTableLock', async (requestData) => {
	const data = await client.delete<{ success: boolean }>(
		`/api/restaurant/${requestData.restaurantId}/tables/${requestData.tableId}/lock/${requestData.lockId}`
	);
	return data;
});

interface TableSliceState {
	availableTables: EnhancedTable[];
	selectedTable: EnhancedTable | null;
	lockStatus: TableLockState;
	filters: TableFilterParams;
	lockTimeRemaining: number;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	totalCount: number;
	availableCount: number;
}

const initialState: TableSliceState = {
	availableTables: [],
	selectedTable: null,
	lockStatus: {
		status: 'unlocked'
	},
	filters: {},
	lockTimeRemaining: 0,
	status: 'idle',
	error: null,
	totalCount: 0,
	availableCount: 0,
};

const tableSlice = createSlice({
	name: 'tables',
	initialState,
	reducers: {
		setSelectedTable: (state, action: PayloadAction<EnhancedTable | null>) => {
			state.selectedTable = action.payload;
		},
		updateFilters: (state, action: PayloadAction<TableFilterParams>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		clearFilters: (state) => {
			state.filters = {};
		},
		updateLockTimeRemaining: (state, action: PayloadAction<number>) => {
			state.lockTimeRemaining = action.payload;
			if (action.payload <= 0 && state.lockStatus.status === 'locked') {
				state.lockStatus.status = 'expired';
				state.selectedTable = null;
			}
		},
		resetTableState: (state) => {
			state.availableTables = [];
			state.selectedTable = null;
			state.lockStatus = { status: 'unlocked' };
			state.filters = {};
			state.lockTimeRemaining = 0;
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Get Available Tables
			.addCase(getAvailableTables.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getAvailableTables.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.availableTables = action.payload.tables;
				state.totalCount = action.payload.totalCount;
				state.availableCount = action.payload.availableCount;
				state.filters = action.payload.filters;
			})
			.addCase(getAvailableTables.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Failed to fetch available tables';
			})

			// Lock Table
			.addCase(lockTable.pending, (state) => {
				state.lockStatus.status = 'locking';
				state.error = null;
			})
			.addCase(lockTable.fulfilled, (state, action) => {
				state.lockStatus = {
					status: 'locked',
					timeRemaining: action.payload.timeRemaining,
					lockExpiration: action.payload.expiresAt,
					lockId: action.payload.lockId
				};
				state.lockTimeRemaining = action.payload.timeRemaining;
			})
			.addCase(lockTable.rejected, (state, action) => {
				state.lockStatus.status = 'unlocked';
				state.error = action.error.message ?? 'Failed to lock table';
				state.selectedTable = null;
			})

			// Extend Table Lock
			.addCase(extendTableLock.pending, (state) => {
				state.lockStatus.status = 'extending';
			})
			.addCase(extendTableLock.fulfilled, (state, action) => {
				state.lockStatus = {
					status: 'locked',
					timeRemaining: action.payload.timeRemaining,
					lockExpiration: action.payload.expiresAt,
					lockId: action.payload.lockId
				};
				state.lockTimeRemaining = action.payload.timeRemaining;
			})
			.addCase(extendTableLock.rejected, (state, action) => {
				state.lockStatus.status = 'expired';
				state.error = action.error.message ?? 'Failed to extend table lock';
				state.selectedTable = null;
			})

			// Release Table Lock
			.addCase(releaseTableLock.pending, (_state) => {
				// Keep current status during release
			})
			.addCase(releaseTableLock.fulfilled, (state) => {
				state.lockStatus = { status: 'unlocked' };
				state.lockTimeRemaining = 0;
				state.selectedTable = null;
			})
			.addCase(releaseTableLock.rejected, (state, action) => {
				state.error = action.error.message ?? 'Failed to release table lock';
			});
	},
});

export const { 
	setSelectedTable, 
	updateFilters, 
	clearFilters, 
	updateLockTimeRemaining, 
	resetTableState 
} = tableSlice.actions;

export default tableSlice.reducer; 