import {
  configureStore,
  combineReducers,
  MiddlewareArray,
} from '@reduxjs/toolkit';
import logger from 'redux-logger'
import appReducer from './slices/app.slice';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: new MiddlewareArray().concat(logger),
});

export const persistor = persistStore(store)
export default store;
