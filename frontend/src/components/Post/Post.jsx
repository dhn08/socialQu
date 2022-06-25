import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./post.css";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import {
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
} from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  isProfile = false,
}) => {
  const [liked, setliked] = useState(false);
  const [likess, setlikess] = useState(false);
  const [commentsOpen, setcommentsOpen] = useState(false);
  const [commentValue, setcommentValue] = useState("");
  const [captionOpen, setCaptionOpen] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const handleLike = async () => {
    setliked(!liked);
    await dispatch(likePost(postId));
    if (isAccount) {
      dispatch(getMyPosts());
    }
    if (isProfile) {
      dispatch(getUserPosts(params.id));
    } else {
      dispatch(getFollowingPosts());
    }
  };
  const addCommentHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(postId, commentValue));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };
  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(postId, captionValue));
    dispatch(getMyPosts());
  };
  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
  };
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setliked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionOpen(!captionOpen)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="Post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        className="border-none bg-white cursor-pointer m-5"
        onClick={() => setlikess(!likess)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{`${likes.length} likes`}</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite className="text-red-600" /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setcommentsOpen(!commentsOpen)}>
          <ChatBubbleOutline />
        </Button>
        {isDelete && (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        )}
      </div>
      <Dialog open={likess} onClose={() => setlikess(!likess)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {likes
            .slice(0)
            .reverse()
            .map((like) => (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />
            ))}
        </div>
      </Dialog>
      <Dialog open={captionOpen} onClose={() => setCaptionOpen(!captionOpen)}>
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>
          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="New Caption"
              required
            />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
      <Dialog
        open={commentsOpen}
        onClose={() => setcommentsOpen(!commentsOpen)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>
          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setcommentValue(e.target.value)}
              placeholder="Comment here"
              required
            />
            <Button type="submit" variant="contained">
              Add Comment
            </Button>
          </form>
          {comments.length > 0 ? (
            comments
              .slice(0)
              .reverse()
              .map((item) => (
                <CommentCard
                  key={item._id}
                  userId={item.user._id}
                  name={item.user.name}
                  avatar={item.user.avatar.url}
                  comment={item.comment}
                  commentId={item._id}
                  postId={postId}
                  isAccount={isAccount}
                />
              ))
          ) : (
            <Typography>No comments yet</Typography>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
