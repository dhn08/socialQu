import React, { useEffect, useState } from "react";
import "./login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { errormsg } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (errormsg) {
      alert.error(errormsg);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
    }
  }, [errormsg, alert, dispatch, message]);
  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" component="h4" style={{ padding: "2vmax" }}>
          SociallQu
        </Typography>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Link to="/forget/password">
          <Typography>Forgot password ?</Typography>
        </Link>
        <Button type="submit">Login</Button>
        <Link to="/register">
          <Typography>Register</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
