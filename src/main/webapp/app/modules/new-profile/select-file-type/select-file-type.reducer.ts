import { postVerifiedRequest } from 'app/config/network-server-reducer';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { addEditPersonAPI, createFileAPI } from 'app/config/constants';

const initialState = {
    errorMessage: null,
    loading: false,
    addEditPersonResponse: null,
    createFileResponse: null,
};

export type ISelectFileTypeSliceState = Readonly<typeof initialState>;

// Actions

export const AddEditPerson = createAsyncThunk('SELECT_FILE_TYPE/ADD_EDIT_PERSON',
    async (data: any) => postVerifiedRequest(addEditPersonAPI, data), {
    serializeError: serializeAxiosError,
});

export const CreateFile = createAsyncThunk('SELECT_FILE_TYPE/CREATE_FILE',
    async (data: any) => postVerifiedRequest(createFileAPI, data), {
    serializeError: serializeAxiosError,
});

export const SelectFileTypeSlice = createSlice({
    name: 'selectFileType',
    initialState: initialState as ISelectFileTypeSliceState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(AddEditPerson.fulfilled, (state, action) => {
                state.loading = false;
                state.addEditPersonResponse = action.payload.data;
            })
            .addCase(CreateFile.fulfilled, (state, action) => {
                state.loading = false;
                state.createFileResponse = action.payload.data;
            })
            .addMatcher(isPending(AddEditPerson, CreateFile), state => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addMatcher(
                isRejected(AddEditPerson, CreateFile),
                (state, action) => {
                    state.loading = false;
                    state.errorMessage = action.error.message;
                },
            );
    },
});

export const { reset } = SelectFileTypeSlice.actions;

// Reducer
export default SelectFileTypeSlice.reducer;