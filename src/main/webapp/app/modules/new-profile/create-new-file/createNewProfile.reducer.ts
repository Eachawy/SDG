import { postVerifiedRequest } from 'app/config/network-server-reducer';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { masterFilesAPI } from 'app/config/constants';

const initialState = {
    errorMessage: null,
    loading: false,
    masterFile: null
};

export type ICreateProfileState = Readonly<typeof initialState>;

// Actions

export const CreateNewProfile = createAsyncThunk('CREATE-FILE/CREATE_NEW_PROFILE',
    async (data: any) => postVerifiedRequest(masterFilesAPI, data), {
    serializeError: serializeAxiosError,
});

export const CreateProfileSlice = createSlice({
    name: 'createProfile',
    initialState: initialState as ICreateProfileState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(CreateNewProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.masterFile = action.payload.data;
            })
            .addMatcher(isPending(CreateNewProfile), state => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addMatcher(
                isRejected(CreateNewProfile),
                (state, action) => {
                    state.loading = false;
                    state.errorMessage = action.error.message;
                },
            );
    },
});

export const { reset } = CreateProfileSlice.actions;

// Reducer
export default CreateProfileSlice.reducer;










// export const updateOrgLoginMode = createAsyncThunk('COMMON/UPDATE_ORG_LOGIN_MODE',
//     async (data: any) => postVerifiedRequest(API_UPDATE_ORG_LOGIN_MODE, data), {
//     serializeError: serializeAxiosError,
// });

// export const updateCorporateLastLoginDate = createAsyncThunk('COMMON/UPDATE_USER_LAST_LOGIN_DATE',
//     async (profileId: any) => postVerifiedRequest(API_UPDATE_ORG_LAST_LOGIN_DATE + profileId, null), {
//     serializeError: serializeAxiosError,
// });

// export const updatePersonLoginMode = createAsyncThunk('COMMON/UPDATE_PERSON_LOGIN_MODE',
//     async (data: any) => postVerifiedRequest(API_UPDATE_PERSON_LOGIN_MODE, data), {
//     serializeError: serializeAxiosError,
// });


// export const generateOTPInformation = createAsyncThunk('COMMON/GENERATE_OTP_INFO',
//     async (request: any) => postVerifiedRequest(API_GENERATE_OTP, request), {
//     serializeError: serializeAxiosError,
// });

// export const verifyOTPInformation = createAsyncThunk('COMMON/VERIFY_OTP_INFO',
//     async (request: any) => postVerifiedRequest(API_VERIFY_OTP, request), {
//     serializeError: serializeAxiosError,
// });
