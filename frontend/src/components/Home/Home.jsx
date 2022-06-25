import React, { useEffect } from "react";
import User from "../User/User";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, []);
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { loading: usersLoading, users } = useSelector(
    (state) => state.allUsers
  ); // loading pehlesi hi le rakha tha .. : lagane is namm change hogaya
  const { error: errorlike, message } = useSelector((state) => state.like);
  const alert = useAlert();
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
  return loading || usersLoading ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
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
              isDelete={false}
              isAccount={false}
            />
          ))
        ) : (
          <Typography variant="h6">No post exists</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography variant="h5">no Users</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
