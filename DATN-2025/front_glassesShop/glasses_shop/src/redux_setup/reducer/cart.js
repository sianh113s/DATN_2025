import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
}

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let isProductExist = false;
      state.items.map((item) => {
        if (item._id === action.payload._id) {
          item.quantity += action.payload.quantity;
          isProductExist = true;
        }
        return item;
      })
      if (!isProductExist) state.items.push(action.payload);
    },
    updateItemCart: (state, action) => {
      state.items.map((item) => {
        if (item._id === action.payload._id) {
          item.quantity = Number(action.payload.quantity)
        }
        return item;
      })
    },
    deleteItemCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload._id);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
})

export const { addToCart, updateItemCart, deleteItemCart, clearCart } = cartReducer.actions
export default cartReducer.reducer;