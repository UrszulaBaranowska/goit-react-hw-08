import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "../redux/contactsSlice";
import filtersReducer from "../redux/filtersSlice";
import authReducer from "../redux/authSlice";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "contacts"]
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    })
});

export const persistor = persistStore(store);
export default store;
