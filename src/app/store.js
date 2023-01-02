import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { productApi } from "../features/api/apiSlice";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";


const store = configureStore({
    // devTools:false,
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        cart: cartSlice,
        filter: filterSlice,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)
})

export default store;