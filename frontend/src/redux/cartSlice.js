import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    add: (state, action) => {
      const { item, quantity } = action.payload;
      const existingProduct = state.cart.find((p) => p.id === item.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cart.push({ ...item, quantity });
      }
      state.total += item.price * quantity;
    },

    updateProductQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cart.find((p) => p.id === id);
      state.total += (quantity - item.quantity) * item.price;
      item.quantity = quantity;
      item.price = quantity * item.price;
    },
    removeProduct(state, action) {
      const { id } = action.payload;
      const item = state.cart.find((p) => p.id === id);
      state.total -= item.price * item.quantity;
      state.cart = state.cart.filter((p) => p.id !== id);
    },

    removeAllProduct(state) {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const { add, updateProductQuantity, removeProduct, removeAllProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
