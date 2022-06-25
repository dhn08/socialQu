import React, { useEffect, useState } from "react";
import "./account.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useAlert } from "react-alert";

import { Link } from "react-router-dom";
import User from "../User/User";
const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, posts } = useSelector((state) => state.myPost);
  const {
    error: errorlike,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);
  const { user, loading: userloading } = useSelector((state) => state.user);
  const [followerOpen, setfollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logout succesfull");
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  useEffect(() => {
    if (errorlike) {
      alert.error(errorlike);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
    }
  }, [alert, message, dispatch, errorlike]);
  const profileDeleteHandler = () => {
    dispatch(deleteUserProfile());
    dispatch(logoutHandler());
  };
  return loading === true || userloading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isDelete={true}
              isAccount={true}
            />
          ))
        ) : (
          <Typography>No posts yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user?.avatar?.url}
          style={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h6">{user.name}</Typography>
        <div>
          <button onClick={() => setfollowerOpen(!followerOpen)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingOpen(!followingOpen)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>

          <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
        <Link to="/update/profile">Edit profile</Link>
        <Link to="/update/password">Change Password</Link>
        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={profileDeleteHandler}
          disabled={deleteLoading}
        >
          Delete My profile
        </Button>
        <Dialog
          open={followerOpen}
          onClose={() => setfollowerOpen(!followerOpen)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                No Followers yet
              </Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingOpen}
          onClose={() => setFollowingOpen(!followingOpen)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((f) => (
                <User
                  key={f._id}
                  userId={f._id}
                  name={f.name}
                  avatar={f.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                No Following yet
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
