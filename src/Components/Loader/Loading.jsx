import "./load.css";
import "./load2.css";
import React from "react";

import FlexEvenly from "Components/FlexEvenly";
import { Box } from "@mui/system";

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
      {/* <Box height={"10rem"} className="lds-hourglass"></Box> */}
    </FlexEvenly>
  );
};

export default Loading;
