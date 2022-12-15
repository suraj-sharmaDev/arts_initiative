import {createSlice} from '@reduxjs/toolkit';
import { initUser, syncUser, generateNotionAccessToken } from './thunk';

const INITIAL_STATE = Object.freeze({
  isLoggedIn: false,
  token: null,
  email: null,
  userData: {},
  responseStatus: null,
});

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.token = action?.payload?.token;
      state.email = action?.payload?.email;
      state.userData = action?.payload?.userData;
      state.responseStatus = "fulfilled";
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
      state.userData = {};
      state.responseStatus = "fulfilled";
    }
  },
  extraReducers: {
    [initUser.pending]: state => {
      state.responseStatus = "pending";
    },
    [initUser.fulfilled]: (state, {payload}) => {
      state.isLoggedIn = true;
      state.userData = payload.response.data;
      state.email = payload.email;
      state.responseStatus = "fulfilled";
    },
    [syncUser.pending]: state => {
      state.responseStatus = "pending";
    },
    [syncUser.fulfilled]: (state, {payload}) => {
      state.userData = payload.response.data;
      state.responseStatus = "fulfilled";
    },
    [generateNotionAccessToken.pending]: state => {
      state.responseStatus = "pending";
    },
    [generateNotionAccessToken.fulfilled]: state => {
      state.responseStatus = "fulfilled";
    }
  },
});

export const {loginUser, logoutUser} = authSlice.actions;

export default authSlice.reducer;
