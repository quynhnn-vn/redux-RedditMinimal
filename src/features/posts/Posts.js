/*
  Dispatch loading posts
  and pass this data to Post component
*/
import "./Post.css";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { loadPosts, selectHasError, selectIsLoading, selectFilteredPosts } from "./postsSlice";
import { selectSearchTerm } from "../search/searchSlice";
import { selectSelectedSubreddit } from "../subreddits/subredditsSlice";
import { Post } from "./Post";

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
      <div>
        <SkeletonTheme color="#444444">
          <Skeleton count={3}/>
        </SkeletonTheme>
      </div>
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
