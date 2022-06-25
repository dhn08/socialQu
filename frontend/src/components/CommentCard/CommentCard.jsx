import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./commentcard.css";
import { Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";
const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const commentDeleteHandler = async () => {
    await dispatch(deleteComment(postId, commentId));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };
  return (
    <div className="commentUser">
      <Link to={`user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}:</Typography>
      </Link>

      <Typography>{comment}</Typography>
      {isAccount ? (
        <Button onClick={commentDeleteHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={commentDeleteHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
