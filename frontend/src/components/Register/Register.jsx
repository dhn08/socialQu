import { Avatar, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./register.css";
import { registerUser } from "../../Actions/User";
import { useEffect } from "react";
import { useAlert } from "react-alert";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, errorReg } = useSelector((state) => state.user);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(name, email, password, avatar));
  };
  useEffect(() => {
    if (errorReg) {
      alert.error(errorReg);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, errorReg]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" component="h4" style={{ padding: "2vmax" }}>
          Register
        </Typography>
        <Avatar
          src={avatar}
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
          className="registerInputs"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="registerInputs"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="registerInputs"
        />
        <Link to="/">
          <Typography>Already have an account ? Login in</Typography>
        </Link>
        <Button disabled={loading} variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
