import React from "react";
import { Circles } from "react-loader-spinner";
import "./loader.css";
const Loader = () => {
  return (
    <div className="loadingPage">
      <Circles color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default Loader;
