import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import postsReducer from "../features/posts/postsSlice";
import subredditsReducer from "../features/subreddits/subredditsSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        posts: postsReducer,
        subreddits: subredditsReducer,
    }
});