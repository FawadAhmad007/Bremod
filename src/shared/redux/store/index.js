import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bremodSilce from "../reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  bremod: bremodSilce,
});

const PersistReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: {
    root: PersistReducer,
  },
  middleware: (getDefaultMiddware) =>
    getDefaultMiddware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);
