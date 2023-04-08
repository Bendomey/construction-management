import {
  configureStore,
  combineReducers,
  MiddlewareArray,
} from '@reduxjs/toolkit';
import logger from 'redux-logger'
import appReducer from './slices/app.slice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(logger),
});

export default store;
