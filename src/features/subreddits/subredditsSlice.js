import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubreddits = async () => {
  try {
    const response = await fetch("https://www.reddit.com/subreddits.json");
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
  } catch (error) {
    console.log(error);
  }
};

export const loadSubreddits = createAsyncThunk(
  "subreddits/loadSubreddits",
  fetchSubreddits
);

export const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    subreddits: [],
    isLoading: false,
    hasError: false,
    selectedSubreddit: "/r/pics/",
  },
  reducers: {
    setSelectedSubreddit: (state, action) => {
        state.selectedSubreddit = action.payload;
    }
  },
  extraReducers: {
    [loadSubreddits.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadSubreddits.fulfilled]: (state, action) => {
      state.subreddits = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadSubreddits.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});
export const { setSelectedSubreddit } = subredditsSlice.actions;
export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectSelectedSubreddit = (state) => state.subreddits.selectedSubreddit;
export const selectIsLoading = (state) => state.subreddits.isLoading;
export const selectHasError = (state) => state.subreddits.hasError;
export default subredditsSlice.reducer;
