import { deleteVerifiedRequest, getVerifiedRequest, postVerifiedRequest } from 'app/config/network-server-reducer';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { addEditPersonAPI, addLegalBondAPI, createFileAPI, deleteLegalBondAPI, getAllBanksAPI, getFileDetailsAPI, masterFilesAPI } from 'app/config/constants';
import { add } from 'lodash';

const initialState = {
    errorMessage: null,
    loading: false,
    fileDetailsResponse: null,
    addLegalBondResponse: null,
    deleteLegalBondResponse: null,
    banksList: null,
};

export type ILegalBondsSliceState = Readonly<typeof initialState>;

// Actions

export const getFileDetails = createAsyncThunk('LEGAL_BONDS/GET_FILE_DETAILS',
    async (id: any) => getVerifiedRequest(getFileDetailsAPI + id), {
    serializeError: serializeAxiosError,
});

export const addLegalBond = createAsyncThunk('SELECT_FILE_TYPE/ADD_LEGAL_BOND',
    async (data: any) => postVerifiedRequest(addLegalBondAPI, data), {
    serializeError: serializeAxiosError,
});

export const deleteLegalBond = createAsyncThunk('SELECT_FILE_TYPE/DELETE_LEGAL_BOND',
    async (obj: any) => deleteVerifiedRequest(deleteLegalBondAPI, obj), {
    serializeError: serializeAxiosError,
});

export const getAllBanks = createAsyncThunk('LOOKUPS/GET_ALL_BANKS',
    async () => getVerifiedRequest(getAllBanksAPI), {
    serializeError: serializeAxiosError,
});


export const LegalBonds = createSlice({
    name: 'legalBonds',
    initialState: initialState as ILegalBondsSliceState,
    reducers: {
        reset() {
            return initialState;
        },
        resetAddLegalBond() {
            return {
                ...initialState,
                addLegalBondResponse: null
            };
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getFileDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.fileDetailsResponse = action.payload.data;
            })
            .addCase(addLegalBond.fulfilled, (state, action) => {
                state.loading = false;
                state.addLegalBondResponse = action.payload.data;
            })
            .addCase(deleteLegalBond.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteLegalBondResponse = action.payload;
            })
            .addCase(getAllBanks.fulfilled, (state, action) => {
                state.loading = false;
                state.banksList = action.payload.data;
            })
            .addMatcher(isPending(getFileDetails, addLegalBond, getAllBanks,deleteLegalBond), state => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addMatcher(
                isRejected(getFileDetails, addLegalBond, getAllBanks,deleteLegalBond),
                (state, action) => {
                    state.loading = false;
                    state.errorMessage = action.error.message;
                },
            );
    },
});

export const { reset, resetAddLegalBond } = LegalBonds.actions;

// Reducer
export default LegalBonds.reducer;