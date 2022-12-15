import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = Object.freeze({
    showAddOpenAIKey: true,
});

const onboardingSlice = createSlice({
  name: "onboardingSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setOnboarding: (state, action) => {
        state.showAddOpenAIKey = action.payload.showAddOpenAIKey;
    },
    resetOnBoarding: (state) => {
      state.showAddOpenAIKey = true;
    }
  },
});

export const {setOnboarding, resetOnBoarding} = onboardingSlice.actions;

export default onboardingSlice.reducer;
