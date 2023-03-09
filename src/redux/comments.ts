import { createSlice } from '@reduxjs/toolkit'
import { Comment } from '../libs/types/stories';

export interface CommentsState {
  ids: number[];
  objects: { [storyId: number]: Comment };
}

const initialState: CommentsState = {
  ids: [],
  objects: {},
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.objects = {};
    },
    setCommentToRedux: (state, action) => {
      const comment = action.payload;
      state.objects[comment.id] = comment;
      
      if (!state.ids.includes(comment.id)) {
        state.ids = [...state.ids, comment.id];
      }
    }
  }
})

export const { setCommentToRedux, clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;