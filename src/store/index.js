import { configureStore } from "@reduxjs/toolkit";

import {cartReducer, uiReducer} from './cart';
import cartsReducer from './products'

const store = configureStore({
    reducer: {cart: cartReducer, products: cartsReducer, ui: uiReducer}
})

export default store;