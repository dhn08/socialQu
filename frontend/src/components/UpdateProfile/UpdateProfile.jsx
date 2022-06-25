import { Avatar, Button, Typography } from "@mui/material";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./updateprofile.css";
import { loadUser, updateUserProfile } from "../../Actions/User";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile(name, email, avatar));
    await dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
    }
  }, [dispatch, updateError, error, alert, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" component="h4" style={{ padding: "2vmax" }}>
          Update Profile
        </Typography>
        <Avatar
          src={avatarPrev}
          alt="useravatar"
          style={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="updateProfileInputs"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="updateProfileInputs"
        />

        <Button disabled={updateLoading} variant="contained" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
