import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Subreddit } from "./Subreddit";
import "./Subreddits.css";
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

  return (
    <div className="card subreddit-card">
      <h2>Subreddits</h2>
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
