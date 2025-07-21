import { getVerifiedRequest } from 'app/config/network-server-reducer';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { getAllEmployeesAPI, getAllPersonsAPI, getFilteredMasterFilesAPI, getFilteredPersonsAPI } from 'app/config/constants';

const initialState: any = {
    errorMessage: null,
    loading: false,
    masterFilesList: null,
    filteredPersonsList: null,
    allPersonsList: null
};

export type IDashboardLookupsState = Readonly<typeof initialState>;

// Actions
export const getAllMasterFiles = createAsyncThunk('LOOKUPS/GET_ALL_MASTER_FILES',
    async () => getVerifiedRequest(getFilteredMasterFilesAPI), {
    serializeError: serializeAxiosError,
});

export const getAllFilteredPersons = createAsyncThunk('LOOKUPS/GET_ALL_FILTERED_PERSONS',
    async (id: any) => getVerifiedRequest(getFilteredPersonsAPI + id), {
    serializeError: serializeAxiosError,
});

export const getAllPersons = createAsyncThunk('LOOKUPS/GET_ALL_PERSONS',
    async () => getVerifiedRequest(getAllPersonsAPI), {
    serializeError: serializeAxiosError,
});

export const DashboardLookupsState = createSlice({
    name: 'dashboardLookups',
    initialState: initialState as IDashboardLookupsState,
    reducers: {
        reset() {
            return initialState;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllMasterFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.masterFilesList = action.payload.data;
            })
            .addCase(getAllFilteredPersons.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredPersonsList = action.payload.data;
            })
            .addCase(getAllPersons.fulfilled, (state, action) => {
                state.loading = false;
                state.allPersonsList = action.payload.data;
            })

            .addMatcher(
                isPending(getAllMasterFiles, getAllFilteredPersons,getAllPersons),
                (state) => {
                    state.loading = true;
                    state.errorMessage = null;
                })
            .addMatcher(
                isRejected(getAllMasterFiles, getAllFilteredPersons,getAllPersons),
                (state, action) => {
                    state.loading = false;
                    state.errorMessage = action.error.message;
                },
            );
    },
});

export const { reset } = DashboardLookupsState.actions;

// Reducer
export default DashboardLookupsState.reducer;

