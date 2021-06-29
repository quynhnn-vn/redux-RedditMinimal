import React from "react";
import "./Comment.css";
import moment from "moment";
import ReactMarkdown from "react-markdown";

export const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-metadata">
        <img
          className="avatar-profile-image"
          src={`https://api.adorable.io/avatars/10/${comment.author}`}
          alt=""
        />
        <p className="comment-author">{comment.author}</p>
        <p className="comment-created-time">
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <ReactMarkdown>{comment.body}</ReactMarkdown>
    </div>
  );
};
