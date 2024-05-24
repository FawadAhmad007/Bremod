/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  card: [],
  product: [],
  userData: {},
  category: [],
  cover: [],
  color: [],
};

export const bremodSilce = createSlice({
  name: "bremod",
  initialState,
  reducers: {
    ADD_CARD: (state, action) => {
      console.log("response in state", action.payload);
      state.card = [...state.card, action.payload]; // Append the new item to the array
    },
    ADD_PRODUCTS: (state, action) => {
      state.product =
        action.payload.page === 1
          ? action.payload.data
          : [...state.product, ...action.payload.data];
    },
    ADD_USERDATA: (state, action) => {
      console.log("response in redux", action.payload);
      state.userData = action.payload;
    },
    ADD_CATEGORY: (state, action) => {
      state.category = action.payload;
    },
    UPDATE_PRODUCTS: (state, action) => {
      state.product = action.payload;
    },
    REMOVE_PRODUCTS: (state, action) => {
      state.product = [];
    },
    ADD_COVER: (state, action) => {
      state.cover = action.payload;
    },
    ADD_COLOR: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const selectCard = (state) => state.bremod?.card;

export const {
  ADD_CARD,
  ADD_PRODUCTS,
  UPDATE_PRODUCTS,
  ADD_CATEGORY,
  ADD_COVER,
  ADD_COLOR,
  ADD_USERDATA
} = bremodSilce.actions;

export default bremodSilce.reducer;
