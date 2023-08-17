import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer as reduxFormReducer } from 'redux-form';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from './auth';
import userReducer from "./userReducer";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["authReducer"]
}

// Combine your reducers into a single reducer
const reducer = combineReducers({
  //auth: authReducer
  authReducer,
  userReducer,
  form: reduxFormReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer)


// Configure and export your Redux store using configureStore
const store = configureStore({
  reducer : persistedReducer
});

export const persistor = persistStore(store);

export default store;
