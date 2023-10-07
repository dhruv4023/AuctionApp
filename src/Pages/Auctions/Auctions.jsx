import FlexBetween from "Components/FlexBetween";
import FlexEvenly from "Components/FlexEvenly";
import Loading from "Components/Loader/Loading";

import React, { useEffect, useState } from "react";
import {
  getAuctionEndedData,
  getAuctionOnGoingData,
  getAuctionUpcomingData,
  get_auctions_by_user,
} from "./auctionApi";
import AuctionN from "./Widgets/AuctionN";
import { useSelector } from "react-redux";
import { Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
const limit = 6;
const Auctions = ({ displayIndex }) => {
  const [data, setData] = useState();
  const token = useSelector((s) => s.token);
  const [endOdList, setEndOdList] = useState(false);
  const [startIndex, setStartIndex] = useState(limit);
  const [loading, setLoading] = useState(false);
  const [indChg, setIndChg] = useState(-1);
  const get_data = (s, l) => {
    setEndOdList(false);

    if (displayIndex === 1) {
      return getAuctionOnGoingData(s, l);
    } else if (displayIndex === 2) {
      return getAuctionUpcomingData(s, l);
    } else if (displayIndex === 3) {
      return getAuctionEndedData(s, l);
    } else if (displayIndex === 4) {
      return get_auctions_by_user(token);
    }
  };
  useEffect(() => {
    setLoading(true);
    if (displayIndex != indChg) {
      setIndChg(displayIndex);
      // console.log(indChg);
      get_data(0, limit)
        .then((dt) => {
          setData(dt);
          setLoading(false);
        })
        .catch((e) => setLoading(false));
    }
  }, [displayIndex]);
  const refresh = () => {
    setLoading(true);
    console.log(startIndex, limit);
    get_data(startIndex, limit)
      .then((dt) => {
        console.log(data, dt);
        setData([...data, ...dt]);
        setStartIndex(startIndex + limit);
        dt.length !== limit && setEndOdList(true);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };
  // console.log(data);

  return (
    <>
      <FlexBetween my={3}>
        <Box></Box>
        <Tooltip title="Retrive more Auction data">
          <IconButton onClick={refresh}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </FlexBetween>
      <FlexEvenly gap={1} flexWrap={"wrap"}>
        {loading && (
          <>
            <Loading />
          </>
        )}
        {data ? (
          <>
            {data.map((m, i) => (
              // <AuctionN key={i} data={m} />
              <AuctionN key={m._id} data={m} />
            ))}
          </>
        ) : (
          <>No auctions</>
        )}
      </FlexEvenly>
      <FlexEvenly my={5}>
        {endOdList && <b>All Auction Data retrived</b>}
      </FlexEvenly>
    </>
  );
};

export default Auctions;
