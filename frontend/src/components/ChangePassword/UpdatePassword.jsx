import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../Actions/User";
import "./updatepassword.css";
const UpdatePassword = () => {
  const [currentPassword, setcurrenrtPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.like);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword(currentPassword, newPassword));
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
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" component="h4" style={{ padding: "2vmax" }}>
          Update Password
        </Typography>
        <input
          type="password"
          placeholder="Current Password"
          required
          value={currentPassword}
          onChange={(e) => setcurrenrtPassword(e.target.value)}
          className="updatePasswordInputs"
        />
        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setnewPassword(e.target.value)}
          className="updatePasswordInputs"
        />

        <Button disabled={loading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
