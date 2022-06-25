import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import Loader from "../Loader/Loader";
import User from "../User/User";

import "./search.css";
const Search = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { loading, users } = useSelector((state) => state.allUsers);
  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={searchHandler}>
        <Typography variant="h3" component="h4" style={{ padding: "2vmax" }}>
          Search
        </Typography>

        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} variant="contained" type="submit">
          Search
        </Button>
        <div className="searchResults">
          {loading ? (
            <Loader />
          ) : users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Typography variant="h5">no User found</Typography>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
