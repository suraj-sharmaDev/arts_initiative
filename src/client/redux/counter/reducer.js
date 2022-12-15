import {createSlice} from '@reduxjs/toolkit';
import {getPosts} from './thunk';

const INITIAL_STATE = Object.freeze({
  count: 0,
  loading: false,
  entities: null,
});

const counterSlice = createSlice({
  name: 'counter',
  initialState: INITIAL_STATE,
  reducers: {
    updateCounter: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: {
    [getPosts.pending]: state => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.entities = payload;
    },
    [getPosts.rejected]: state => {
      state.loading = false;
    },
  },
});

export const {updateCounter} = counterSlice.actions;

export default counterSlice.reducer;
