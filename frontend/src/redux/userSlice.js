import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    user: null,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLogin = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLogin = false;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isLogin = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    add: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;

export const { add } = cartSlice.actions;
