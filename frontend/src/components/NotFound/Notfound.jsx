import { ErrorOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";
const Notfound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography variant="h2" style={{ padding: "2vmax" }}>
          Page not found
        </Typography>
        <Link to="/">
          <Typography>Go to home</Typography>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
