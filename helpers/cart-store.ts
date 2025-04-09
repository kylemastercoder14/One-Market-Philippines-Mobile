import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Configuration for persisting cart data
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Combine reducers
const rootReducer = combineReducers({
  cart: persistReducer(persistConfig, cartReducer),
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor for rehydration
export const persistor = persistStore(store);

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
