import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducer/cart";

const persistConfig = {
  key: "glassesShop",
  storage,
};

// tạo persisted reducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // tắt kiểm tra non-serializable
    }),
});

export const persistor = persistStore(store);
