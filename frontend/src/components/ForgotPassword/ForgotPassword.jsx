import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../Actions/User";
import "./Forgetpassword.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.like);
  const forgetPasswordHandle = async (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
    }
  }, [error, alert, dispatch, message]);

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={forgetPasswordHandle}>
        <Typography variant="h3" component="h4" style={{ padding: "2vmax" }}>
          Generate Password
        </Typography>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forgotPasswordInputs"
        />

        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
