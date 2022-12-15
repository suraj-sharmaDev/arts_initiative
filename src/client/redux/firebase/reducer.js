import { createSlice } from "@reduxjs/toolkit";
import { updateToken } from "./thunk";

const INITIAL_STATE = Object.freeze({
  fcmToken: null,
});

const firebaseSlice = createSlice({
  name: "firebaseSlice",
  initialState: INITIAL_STATE,
  reducers: {
    resetFcmToken: (state) => {
      state.fcmToken = null;
    },
  },
  extraReducers: {
    [updateToken.fulfilled]: (state, { payload }) => {
      const { response, token } = payload;
      if (response.error == false) {
        state.fcmToken = token;
      }
    },
  },
});

export const { resetFcmToken } = firebaseSlice.actions;

export default firebaseSlice.reducer;
