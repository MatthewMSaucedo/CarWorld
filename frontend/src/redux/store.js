// Redux
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// Local Imports
import { cwShoppingCartReducer } from "./shoppingCartSlice"
import { cwUserReducer } from "./userSlice"

// Group Reducers
const rootReducer = combineReducers({
  cwUser: cwUserReducer,
  cwShoppingCart: cwShoppingCartReducer
})

// Signals to use LocalStorage for persistance
const persistConfig = {
  key: 'root',
  storage,
}

// Persist the Reducers
const persistedReducers = persistReducer(persistConfig, rootReducer)

// Configure the Redux Store with the Reducers
export const store = configureStore({
  reducer: persistedReducers,
  // Required with Persisted Reducers to prevent a browser error
  middleware: [thunk]
})


export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
