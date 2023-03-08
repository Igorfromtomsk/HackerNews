import StoriesReducer, { StoriesState } from './stories';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

export interface State {
  stories: StoriesState;
}

const reducer = combineReducers({ stories: StoriesReducer });
export const store = configureStore({
  reducer: {
    stories: StoriesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
