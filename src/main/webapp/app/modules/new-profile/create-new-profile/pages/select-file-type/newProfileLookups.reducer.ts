import { getVerifiedRequest } from 'app/config/network-server-reducer';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import {
    getAllCaseTypesAPI,
    getAllCourtsAPI,
    getAllEmployeesAPI,
    getAllJudgesAPI,
    getAllPersonsAPI,
    getAllRequestTypesAPI
}
    from 'app/config/constants';

const initialState = {
    errorMessage: null,
    loading: false,
    employeesList: null,
    personsList: null,
    courtsList: null,
    judgesList: null,
    caseTypesList: null,
    requestTypesList: null
};

export type ICreateProfileLookupsState = Readonly<typeof initialState>;

// Actions
export const getAllEmployees = createAsyncThunk('LOOKUPS/GET_ALL_EMPLOYEES',
    async () => getVerifiedRequest(getAllEmployeesAPI), {
    serializeError: serializeAxiosError,
});

export const getAllPersons = createAsyncThunk('LOOKUPS/GET_ALL_PERSONS',
    async () => getVerifiedRequest(getAllPersonsAPI), {
    serializeError: serializeAxiosError,
});

export const getAllCourts = createAsyncThunk('LOOKUPS/GET_ALL_COURTS',
    async () => getVerifiedRequest(getAllCourtsAPI), {
    serializeError: serializeAxiosError,
});

export const getAllJudges = createAsyncThunk('LOOKUPS/GET_ALL_JUDGES',
    async () => getVerifiedRequest(getAllJudgesAPI), {
    serializeError: serializeAxiosError,
});

export const getAllCaseTypes = createAsyncThunk('LOOKUPS/GET_ALL_CASE_TYPES',
    async () => getVerifiedRequest(getAllCaseTypesAPI), {
    serializeError: serializeAxiosError,
});

export const getAllRequestTypes = createAsyncThunk('LOOKUPS/GET_ALL_REQUEST_TYPES',
    async () => getVerifiedRequest(getAllRequestTypesAPI), {
    serializeError: serializeAxiosError,
});

export const CreateProfileLookups = createSlice({
    name: 'createProfileLookups',
    initialState: initialState as ICreateProfileLookupsState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employeesList = action.payload.data;
            })
            .addCase(getAllPersons.fulfilled, (state, action) => {
                state.loading = false;
                state.personsList = action.payload.data;
            })
            .addCase(getAllCourts.fulfilled, (state, action) => {
                state.loading = false;
                state.courtsList = action.payload.data;
            })
            .addCase(getAllJudges.fulfilled, (state, action) => {
                state.loading = false;
                state.judgesList = action.payload.data;
            })
            .addCase(getAllCaseTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.caseTypesList = action.payload.data;
            })
            .addCase(getAllRequestTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.requestTypesList = action.payload.data;
            })
            .addMatcher(
                isPending(getAllEmployees, getAllPersons, getAllCourts, getAllJudges, getAllCaseTypes, getAllRequestTypes),
                (state) => {
                    state.loading = true;
                    state.errorMessage = null;
                })
            .addMatcher(
                isRejected(getAllEmployees, getAllPersons, getAllCourts, getAllJudges, getAllCaseTypes, getAllRequestTypes),
                (state, action) => {
                    state.loading = false;
                    state.errorMessage = action.error.message;
                },
            );
    },
});

export const { reset } = CreateProfileLookups.actions;

// Reducer
export default CreateProfileLookups.reducer;

