/*
  Handle API fetching and Redux logic of Posts
*/
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search/searchSlice";

// Fetch posts data by subreddit
export const fetchPosts = async (subreddit) => {
  try {
    const response = await fetch(`https://www.reddit.com${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
  } catch (err) {
    console.log(err);
  }
};

// Fetch comments data by permalink of post
export const fetchComments = async (permalink) => {
  try {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    const json = await response.json();
    return json[1].data.children.map((subreddit) => subreddit.data);
  } catch (err) {
    console.log(err);
  }
};

export const loadPosts = createAsyncThunk("posts/loadPosts", fetchPosts);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadPosts.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectPosts = (state) => state.posts.posts;

export const selectFilteredPosts = (state) => {
  const posts = selectPosts(state);
  const searchTerm = selectSearchTerm(state);
  return posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectHasError = (state) => state.posts.hasError;

export default postsSlice.reducer;
