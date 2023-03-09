import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Story } from '../libs/types/stories';

export interface StoriesState {
  ids: number[];
  objects: { [storyId: number]: Story };
}

const initialState: StoriesState = {
  ids: [],
  objects: {},
};

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    updateStoriesIds: (state, action: PayloadAction<number[]>) => {
      state.ids = action.payload.slice(0, 101);
    },
    setStoryToRedux: (state, action) => {
      const story = action.payload;
      state.objects[story.id] = story;
    }
  }
})

export const { updateStoriesIds, setStoryToRedux } = storiesSlice.actions;

export default storiesSlice.reducer;