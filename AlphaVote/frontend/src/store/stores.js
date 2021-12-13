import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducers";

let initialState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    })
});
export default store;
