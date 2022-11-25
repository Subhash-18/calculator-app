import React from "react";
import "./Screen.css";

const Screen = ({ value }) => {
  return (
    <div className="screen">
      {value > 9999999999999999 ? value.toExponential() : value}
    </div>
  );
};

export default Screen;
