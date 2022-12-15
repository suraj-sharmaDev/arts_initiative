import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = Object.freeze({
  isInvited: false,
  invitationUrl: null,
});

const invitesSlice = createSlice({
  name: "invitesSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setInvitation: (state, action) => {
      state.isInvited = action.payload?.isInvited || false;
      state.invitationUrl = action.payload?.invitationUrl || null;
    },
  },
});

export default invitesSlice.reducer;
