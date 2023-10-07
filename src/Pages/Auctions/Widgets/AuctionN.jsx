import { Box, Divider } from "@mui/material";
import MyTitle from "Components/MyCompoenents/MyTitle";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "state/globalFunctions";

const AuctionN = ({ data }) => {
  // Get the `navigate` function from React Router to handle navigation
  const navigate = useNavigate();

  return (
    <WidgetWrapper
      // Add an `onClick` handler to navigate to the auction details page when clicked
      onClick={() => {
        navigate(`/auction/${data._id}`);
      }}
      style={{ cursor: "pointer" }}
    >
      {/* Render the title of the auction using `MyTitle` component */}
      <MyTitle txt={data.item_name} />
      <Box>
        {/* Display the start price of the auction */}
        <b>Start Price :</b>
        {data.start_price}
      </Box>
      <Divider />
      <Box>
        {/* Display the start date and time of the auction */}
        <b>Start Date Time</b>
        <Box>Date: {formatTimestamp(data.start_time).date}</Box>
        <Box>Time: {formatTimestamp(data.start_time).time}</Box>
      </Box>
      <Divider />
      <Box>
        {/* Display the end date and time of the auction */}
        <b>End Date Time</b>
        <Box>Date: {formatTimestamp(data.end_time).date}</Box>
        <Box>Time: {formatTimestamp(data.end_time).time}</Box>
      </Box>
      <Divider />
      <Box>
        {/* Display the name of the user who created the auction */}
        <b>Created By:</b> {data.created_by.name}
      </Box>
      {/* Check if there is a winner for the auction and display their name */}
      {data.winner !== "" && (
        <>
          <Divider />
          <Box>
            <b>WINNER:</b> {data.winner?.name}
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default AuctionN;
