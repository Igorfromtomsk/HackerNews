import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StoriesState {
  ids: number[];
}

const initialState: StoriesState = {
  ids: [],
};

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    updateStoriesIds: (state, action: PayloadAction<number[]>) => {
      state.ids = action.payload.slice(0, 101);
    }
  }
})

export const { updateStoriesIds } = storiesSlice.actions;

export default storiesSlice.reducer;