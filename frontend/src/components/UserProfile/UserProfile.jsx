import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getUserPosts,
  getUserProfile,
  loadUser,
} from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useAlert } from "react-alert";

import { useParams } from "react-router-dom";
import User from "../User/User";
const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, posts, error } = useSelector((state) => state.userPosts);

  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);
  const {
    user,
    loading: userloading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const [followerOpen, setfollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myprofile, setMyprofile] = useState(false);
  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followUser(params.id));
    dispatch(getUserProfile(params.id));
    await dispatch(loadUser());
  };
  const params = useParams();
  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyprofile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }
    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
    }
  }, [error, alert, message, dispatch, followError, userError]);

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
              isDelete={myprofile}
              isAccount={myprofile}
              isProfile={true}
            />
          ))
        ) : (
          <Typography>User has not made any posts </Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
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
            {myprofile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? "red" : "" }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}
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
export default UserProfile;
