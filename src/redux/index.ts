import StoriesReducer, { StoriesState } from './stories';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import CommentsReducer, { CommentsState } from './comments';
import thunk from 'redux-thunk'

export interface State {
  stories: StoriesState;
  comments: CommentsState;
}

export const store = configureStore({
  reducer: {
    stories: StoriesReducer,
    comments: CommentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
