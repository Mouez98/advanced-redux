import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      )
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
    },
     removeItem(state,action) {
      const id = action.payload;
      const existingItem = state.items.find((item)=> item.id === id)
      state.totalQuantity--;
      if(existingItem.quantity === 1){
          state.items = state.items.filter(item => item.id !== id);
      }else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      
    }
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartVisibilty: false,
  },
  reducers: {
    showCart(state) {
      state.cartVisibilty = !state.cartVisibilty;
    },
  },
});

export const uiActions = uiSlice.actions;
export const cartActions = cartSlice.actions;

export const uiReducer = uiSlice.reducer;
export const cartReducer = cartSlice.reducer;
