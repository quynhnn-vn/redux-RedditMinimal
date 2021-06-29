import React, { useState, useEffect } from "react";
import { Comment } from "./Comment";
import { fetchComments } from "../posts/postsSlice";

export const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(post.permalink).then((jsonComments) =>
      setComments(jsonComments.map((comment) => <Comment comment={comment} />))
    );
  }, [post.permalink]);

  return <div>{comments}</div>;
};
