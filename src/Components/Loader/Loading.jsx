import "./load.css";
import "./load2.css";
import React from "react";
import FlexEvenly from "Components/FlexEvenly";
const Loading = () => {
  return (
    <FlexEvenly padding={"3rem"}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </FlexEvenly>
  );
};

export default Loading;
