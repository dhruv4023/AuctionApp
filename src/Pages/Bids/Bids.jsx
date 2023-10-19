import { Refresh } from "@mui/icons-material";
import MyTitle from "Components/MyCompoenents/MyTitle";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { get_bid_list_data } from "./BidsAPI";
import FlexBetween from "Components/FlexBetween";
import { Box, IconButton, Tooltip } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import BasicTable from "./BidTable";
import Loading from "Components/Loader/Loading";

// Define the limit for the number of bids to retrieve at a time
const limit = 7;

const Bids = ({ AID, bidList, setBidList }) => {
  const [endOdList, setEndOdList] = useState(false);
  const [startIndex, setStartIndex] = useState(limit);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch the initial batch of bids for the specified auction
    !bidList &&
      get_bid_list_data(AID, 0, limit)
        .then((dt) => {
          setBidList(dt);
          setLoading(false);
        })
        .catch((e) => setLoading(false));
  }, []);

  const refresh = () => {
    setLoading(true);
    // Fetch more bids for the specified auction, starting from the current startIndex
    get_bid_list_data(AID, startIndex, limit)
      .then((dt) => {
        setBidList([...bidList, ...dt]);
        setStartIndex(startIndex + limit);
        // If the number of retrieved bids is less than the limit, it means all bids have been retrieved
        dt.length !== limit && setEndOdList(true);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  return (
    <WidgetWrapper>
      <FlexBetween>
        <MyTitle txt={"Bids"} />
        {endOdList && (
          <>
            <div style={{ width: "100%" }}></div>
            <b style={{"width":"12rem", margin: "0.2rem 0.5rem" }}>All Bids retrieved</b>
          </>
        )}
        {/* Button to refresh and retrieve more bids */}
        <Tooltip title="Retrieve more bids data">
          <IconButton onClick={refresh} disabled={endOdList}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </FlexBetween>
      {loading ? (
        // Display a loading indicator while data is being fetched
        <Loading />
      ) : (
        <>
          {/* Render the list of bids using the PrintList component */}
          <PrintList data={bidList} />
        </>
      )}
    </WidgetWrapper>
  );
};

export default Bids;

const PrintList = ({ data }) => {
  return <Box my={2}>{data && <BasicTable rows={data} />}</Box>;
};
