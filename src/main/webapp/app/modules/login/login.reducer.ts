// import { authenticate } from 'app/config/network-server-reducer';
// import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
// import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

// const initialState = {
//     errorMessage: null,
//     token: null,
//     loading: false
// };

// export type ILoginState = Readonly<typeof initialState>;

// // Actions

// export const loginAndgenerateToken = createAsyncThunk('COMMON/GENERATE_UMS_ACCESS_TOKEN',
//     async (nationalId: any, channelCode: any) => authenticate(nationalId, channelCode), {
//     serializeError: serializeAxiosError,
// });


// export const LoginSlice = createSlice({
//     name: 'login',
//     initialState: initialState as ILoginState,
//     reducers: {
//         reset() {
//             return initialState;
//         },
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(loginAndgenerateToken.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.token = action.payload.data;
//             })
//             .addMatcher(isPending(loginAndgenerateToken), state => {
//                 state.loading = true;
//                 state.errorMessage = null;
//             })
//             .addMatcher(
//                 isRejected(loginAndgenerateToken),
//                 (state, action) => {
//                     state.loading = false;
//                     state.errorMessage = action.error.message;
//                 },
//             );
//     },
// });

// export const { reset } = LoginSlice.actions;

// // Reducer
// export default LoginSlice.reducer;










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
