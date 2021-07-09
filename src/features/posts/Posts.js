import React from "react";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "./Post";
import { selectFilteredPosts } from "./postsSlice";
import { selectSearchTerm } from "../search/searchSlice";
import { useEffect } from "react";
import { loadPosts, selectHasError, selectIsLoading } from "./postsSlice";
import { selectSelectedSubreddit } from "../subreddits/subredditsSlice";

export const Posts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);
  const posts = useSelector(selectFilteredPosts);
  const searchTerm = useSelector(selectSearchTerm);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  useEffect(() => {
    dispatch(loadPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const handleTryAgain = () => {
    dispatch(loadPosts(selectedSubreddit));
  };

  if (isLoading) {
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );
  }

  if (hasError) {
    return (
      <main>
        <h1>An error has occurred while getting the data.</h1>
        <button onClick={handleTryAgain}>Try again</button>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="error">
        <h2>No post matching "{searchTerm}"</h2>
      </div>
    );
  }

  return posts.map((post) => <Post post={post} />);
};
