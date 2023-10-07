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

const limit = 7;
const Bids = ({ AID, bidList, setBidList }) => {
  const [endOdList, setEndOdList] = useState(false);
  const [startIndex, setStartIndex] = useState(limit);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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
    get_bid_list_data(AID, startIndex, limit)
      .then((dt) => {
        setBidList([...bidList, ...dt]);
        setStartIndex(startIndex + limit);
        dt.length !== limit && setEndOdList(true);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };
  //   console.log(bidList);
  return (
    <WidgetWrapper>
      <FlexBetween>
        <MyTitle txt={"Bids"} />
        <Tooltip title="Retrive more bids data">
          <IconButton onClick={refresh}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </FlexBetween>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <PrintList data={bidList} />
        </>
      )}
      <FlexEvenly my={5}>{endOdList && <b>All Bids retrived</b>}</FlexEvenly>
    </WidgetWrapper>
  );
};

export default Bids;

const PrintList = ({ data }) => {
  return <Box my={2}>{data && <BasicTable rows={data} />}</Box>;
};
