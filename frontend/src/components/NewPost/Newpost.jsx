import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./newpost.css";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../../Actions/Post";
import { useAlert } from "react-alert";
import { loadUser } from "../../Actions/User";
const Newpost = () => {
  const [image, setimage] = useState("");
  const [caption, setcaption] = useState("");
  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setimage(Reader.result);
      }
    };
  };
  const submithandler = async (e) => {
    e.preventDefault();
    await dispatch(newPost(image, caption));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.info(message);
      dispatch({ type: "clearMessages" });
    }
  }, [dispatch, error, message, alert]);
  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submithandler}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
        />
        <Button disabled={loading} type="submit" variant="contained">
          Post
        </Button>
      </form>
    </div>
  );
};

export default Newpost;
