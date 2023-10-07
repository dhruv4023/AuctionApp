import { Box, Divider } from "@mui/material";
import MyTitle from "Components/MyCompoenents/MyTitle";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "state/globalFunctions";

const AuctionN = ({ data }) => {
  const navigate = useNavigate();
  // console.log(data)
  return (
    <WidgetWrapper
      onClick={() => {
        navigate(`/auction/${data._id}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <MyTitle txt={data.item_name} />
      <Box>
        <b>Start Price :</b>
        {data.start_price}
      </Box>
      <Divider />
      <Box>
        <b>Start Date Time</b>
        <Box>Date: {formatTimestamp(data.start_time).date}</Box>
        <Box>Time: {formatTimestamp(data.start_time).time}</Box>
      </Box>
      <Divider />
      <Box>
        <b>End Date Time</b>
        <Box>Date: {formatTimestamp(data.end_time).date}</Box>
        <Box>Time: {formatTimestamp(data.end_time).time}</Box>
      </Box>
      <Divider />
      <Box>
        <b>Created By:</b> {data.created_by.name}
      </Box>
      {data.winner !== "" && (
        <>
          <Divider />
          <Box>
            <b>WINNER:</b>{" "}
            {data.winner?.name}
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default AuctionN;
