import { getVerifiedRequest, postVerifiedRequest } from 'app/config/network-server-reducer';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { addEditPersonAPI, editMasterFileAPI, getBoxesDataAPI, getChartsDataAPI, getFilesTableDataAPI, getMasterFileCountersAPI, getMasterFileDetailsAPI, getTableTabsDataAPI } from 'app/config/constants';

const initialState: any = {
    errorMessage: null,
    loading: false,
    boxesData: null,
    completedChartsData: null,
    closedChartsData: null,
    tableTabsData: null,
    tableFilesData: null,
    masterFileDetails: null,
    masterFileAttachments: null,
    masterFileCounters: null,
    editMasterFileResponse: null,
    editPersonResponse: null,
};

export type IDashboardState = Readonly<typeof initialState>;

// Actions
export const getBoxesData = createAsyncThunk('DASHBOARD/GET_BOXES_DATA',
    async () => getVerifiedRequest(getBoxesDataAPI), {
    serializeError: serializeAxiosError,
});

export const getCompletedChartsData = createAsyncThunk('DASHBOARD/GET_COMPLETED_CHARTS_DATA',
    async () => getVerifiedRequest(getChartsDataAPI + 'COMPLETED'), {
    serializeError: serializeAxiosError,
});

export const getClosedChartsData = createAsyncThunk('DASHBOARD/GET_CLOSED_CHARTS_DATA',
    async () => getVerifiedRequest(getChartsDataAPI + 'CLOSED'), {
    serializeError: serializeAxiosError,
});

export const getTableTabsData = createAsyncThunk('DASHBOARD/GET_TABLE_TABS_DATA',
    async () => getVerifiedRequest(getTableTabsDataAPI), {
    serializeError: serializeAxiosError,
});

export const getFilesTableData = createAsyncThunk('DASHBOARD/GET_FILES_TABLE_DATA',
    async (data: any) => postVerifiedRequest(getFilesTableDataAPI, data), {
    serializeError: serializeAxiosError,
});

export const getMasterFileDetails = createAsyncThunk('DASHBOARD/GET_MASTER_FILE_DETAILS',
    async (id: any) => getVerifiedRequest(getMasterFileDetailsAPI + id), {
    serializeError: serializeAxiosError,
});

export const getMasterFileAttachments = createAsyncThunk('DASHBOARD/GET_MASTER_FILE_ATTACHMENTS',
    async (id: any) => getVerifiedRequest(getMasterFileDetailsAPI + id), {
    serializeError: serializeAxiosError,
});

export const getMasterFileCounters = createAsyncThunk('DASHBOARD/GET_MASTER_FILE_COUNTERS',
    async (data: any) => postVerifiedRequest(getMasterFileCountersAPI, data), {
    serializeError: serializeAxiosError,
});

export const editMasterFile = createAsyncThunk('DASHBOARD/EDIT_MASTER_FILE',
    async (data: any) => postVerifiedRequest(editMasterFileAPI, data), {
    serializeError: serializeAxiosError,
});

export const editPerson = createAsyncThunk('DASHBOARD/EDIT_PERSON',
    async (data: any) => postVerifiedRequest(addEditPersonAPI, data), {
    serializeError: serializeAxiosError,
});

export const DashboardState = createSlice({
    name: 'dashboard',
    initialState: initialState as IDashboardState,
    reducers: {
        reset() {
            return initialState;
        },
        handleResetMasterFileDetails() {
            return {
                ...initialState,
                masterFileDetails: null
            };
        },
        handleResetMasterFileAttachments() {
            return {
                ...initialState,
                masterFileAttachments: null
            };
        },
        handleResetEditMasterFile() {
            return {
                ...initialState,
                editMasterFileResponse: null
            };
        },
        handleResetEditPerson() {
            return {
                ...initialState,
                editPersonResponse: null
            };
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getBoxesData.fulfilled, (state, action) => {
                state.loading = false;
                state.boxesData = action.payload.data;
            })
            .addCase(getCompletedChartsData.fulfilled, (state, action) => {
                state.loading = false;
                state.completedChartsData = action.payload.data;
            })
            .addCase(getClosedChartsData.fulfilled, (state, action) => {
                state.loading = false;
                state.closedChartsData = action.payload.data;
            })
            .addCase(getTableTabsData.fulfilled, (state, action) => {
                state.loading = false;
                state.tableTabsData = action.payload.data;
            })
            .addCase(getFilesTableData.fulfilled, (state, action) => {
                state.loading = false;
                state.tableFilesData = action.payload.data;
            })
            .addCase(getMasterFileDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.masterFileDetails = action.payload.data;
            })
            .addCase(getMasterFileAttachments.fulfilled, (state, action) => {
                state.loading = false;
                state.masterFileAttachments = action.payload.data;
            })
            .addCase(getMasterFileCounters.fulfilled, (state, action) => {
                state.loading = false;
                state.masterFileCounters = action.payload.data;
            })
            .addCase(editMasterFile.fulfilled, (state, action) => {
                state.loading = false;
                state.editMasterFileResponse = action.payload;
            })
            .addCase(editPerson.fulfilled, (state, action) => {
                state.loading = false;
                state.editPersonResponse = action.payload;
            })
            .addMatcher(
                isPending(
                    getBoxesData,
                    getCompletedChartsData,
                    getClosedChartsData,
                    getTableTabsData,
                    getFilesTableData,
                    getMasterFileDetails,
                    getMasterFileAttachments,
                    getMasterFileCounters,
                    editMasterFile,
                    editPerson
                ),
                (state) => {
                    state.loading = true;
                    state.errorMessage = null;
                })
            .addMatcher(
                isRejected(
                    getBoxesData,
                    getCompletedChartsData,
                    getClosedChartsData,
                    getTableTabsData,
                    getFilesTableData,
                    getMasterFileDetails,
                    getMasterFileAttachments,
                    getMasterFileCounters,
                    editMasterFile,
                    editPerson
                ),
                (state, action) => {
                    state.loading = false;
                    state.errorMessage = action.error.message;
                },
            );
    },
});

export const {
    reset,
    handleResetMasterFileDetails,
    handleResetMasterFileAttachments,
    handleResetEditMasterFile,
    handleResetEditPerson
} = DashboardState.actions;

// Reducer
export default DashboardState.reducer;

