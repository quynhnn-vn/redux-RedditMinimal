/*
  Dispatch loading subreddits list
  and pass subreddits data also the selected subreddit to Subreddit component
*/
import "./Subreddits.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Subreddit } from "./Subreddit";
import {
  loadSubreddits,
  selectHasError,
  selectIsLoading,
  selectSelectedSubreddit,
  selectSubreddits,
} from "./subredditsSlice";

export const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    dispatch(loadSubreddits());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(loadSubreddits());
  };

  if (isLoading) {
    return (
      <div>
        <SkeletonTheme color="#444444">
          <Skeleton count={3} />
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

  return (
    <div className="subreddit-card">
      <ul className="subreddits-list">
        {subreddits.map((subreddit) => (
          <Subreddit
            subreddit={subreddit}
            selectedSubreddit={selectedSubreddit}
          />
        ))}
      </ul>
    </div>
  );
};
