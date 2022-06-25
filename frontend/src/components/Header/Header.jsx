import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
const Header = () => {
  const [tab, settab] = useState(window.location.pathname);
  return (
    <div className="flex justify-center items-center">
      <Link
        className="w-16 h-8 mt-4 mb-8 mr-10 ml-10 sm:w-8 sm:h-4 "
        to="/"
        onClick={() => settab("/")}
      >
        {tab === "/" ? (
          <Home className="text-5xl text-black  transition-all hover:text-black hover:scale-125  " />
        ) : (
          <HomeOutlined className="text-5xl text-gray-400  transition-all hover:text-black hover:scale-125  " />
        )}
      </Link>
      <Link
        className="w-16 h-8 mt-4 mb-8 mr-10 ml-10 sm:w-8 sm:h-4 "
        to="/newpost"
        onClick={() => settab("/newpost")}
      >
        {tab === "/newpost" ? (
          <Add className="text-5xl  text-black  transition-all hover:text-black hover:scale-125  " />
        ) : (
          <AddOutlined className="text-5xl text-gray-400  transition-all hover:text-black hover:scale-125  " />
        )}
      </Link>
      <Link
        className="w-16 h-8 mt-4 mb-8 mr-10 ml-10 sm:w-8 sm:h-4 "
        to="/search"
        onClick={() => settab("/search")}
      >
        {tab === "/search" ? (
          <Search className="text-5xl text-black   transition-all hover:text-black hover:scale-125  " />
        ) : (
          <SearchOutlined className="text-5xl text-gray-400  transition-all hover:text-black hover:scale-125  " />
        )}
      </Link>
      <Link
        className="w-16 h-8 mt-4 mb-8 mr-10 ml-10 sm:w-8 sm:h-4 "
        to="/account"
        onClick={() => settab("/account")}
      >
        {tab === "/account" ? (
          <AccountCircle className="text-5xl text-black transition-all hover:text-black hover:scale-125  " />
        ) : (
          <AccountCircleOutlined className="text-5xl text-gray-400  transition-all hover:text-black hover:scale-125  " />
        )}
      </Link>
    </div>
  );
};

export default Header;
