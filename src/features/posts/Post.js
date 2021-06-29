import React, { useState } from "react";
import moment from "moment";
import "./Post.css";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from "react-icons/ti";
import { Comments } from "../comments/Comments";

export const Post = ({ post }) => {
  const [isShowingComments, setIsShowingComments] = useState(false);
  const [voteValue, setVoteValue] = useState(0);

  const handleOnClick = () => {
    setIsShowingComments(!isShowingComments);
  };

  const handleVote = (newValue) => {
    if (newValue === voteValue) {
      setVoteValue(0);
    } else if (newValue === 1) {
      setVoteValue(1);
    } else {
      setVoteValue(-1);
    }
  };

  const getVoteType = () => {
    if (voteValue === 1) {
      return "up-vote";
    }
    if (voteValue === -1) {
      return "down-vote";
    }
    return "";
  };

  const formatNumber = (number) => {
    return Math.abs(number) > 999
      ? Math.sign(number) * (Math.abs(number) / 1000).toFixed(1) + "k"
      : Math.sign(number) * Math.abs(number);
  };

  return (
    <article>
      <div className="card">
        <div className="post-wrapper">
          <div className="post-votes-container">
            <button
              className={`icon-action-button up-vote ${
                voteValue === 1 && "active"
              }`}
              type="button"
              onClick={() => handleVote(1)}
            >
              {voteValue === 1 && <TiArrowUpThick className="icon-action" />}
              {voteValue !== 1 && <TiArrowUpOutline className="icon-action" />}
            </button>
            <p className={`post-votes-value ${getVoteType()}`}>
              {formatNumber(post.ups)}
            </p>
            <button
              className={`icon-action-button down-vote ${
                voteValue === -1 && "active"
              }`}
              type="button"
              onClick={() => handleVote(-1)}
            >
              {voteValue === -1 && <TiArrowDownThick className="icon-action" />}
              {voteValue !== -1 && (
                <TiArrowDownOutline className="icon-action" />
              )}
            </button>
          </div>

          <div className="post-container">
            <h3 className="post-title">{post.title}</h3>
            <div className="post-image-container">
              <img className="post-image" src={post.url} alt="" />
            </div>
            <div className="post-details">
              <span className="author-details">
                <img
                  className="avatar-profile-image"
                  src={`https://api.adorable.io/avatars/10/${post.author}`}
                  alt={`${post.author} profile`}
                />
                <span className="author-username">{post.author}</span>
              </span>
              <span>{moment.unix(post.created_utc).fromNow()}</span>
              <span className="post-comments-container">
                <button
                  className={`icon-action-button ${
                    isShowingComments && "showing-comments"
                  }`}
                  type="button"
                  onClick={handleOnClick}
                >
                  <TiMessage className="icon-action" />
                </button>
                {formatNumber(post.num_comments)}
              </span>
            </div>
            {isShowingComments ? <Comments post={post} /> : null}
          </div>
        </div>
      </div>
    </article>
  );
};
