import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  card: [],
};

export const bremodSilce = createSlice({
  name: "bremod",
  initialState,
  reducers: {
    ADD_CARD: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const selectCard = (state) => state.bremod?.card;

export const { ADD_CARD } = bremodSilce.actions;

export default bremodSilce.reducer;
