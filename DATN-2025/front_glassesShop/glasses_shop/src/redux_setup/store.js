import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import cartReducer from "./reducer/cart";

const persistConfig = {
  key: "glassesShop",
  storage,
}
const persistedCardReducer = persistReducer(persistConfig, cartReducer)
export const store = configureStore({
  reducer: {
    cart: persistedCardReducer,
  }
})

export const persistor = persistStore(store);