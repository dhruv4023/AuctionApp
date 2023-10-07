import FlexBetween from "Components/FlexBetween";
import FlexEvenly from "Components/FlexEvenly";
import Loading from "Components/Loader/Loading";
import React, { useEffect, useState } from "react";
import {
  getAuctionEndedData,
  getAuctionOnGoingData,
  getAuctionUpcomingData,
  get_auctions_by_user,
} from "./auctionApi"; // Imports functions for fetching auction data
import AuctionN from "./Widgets/AuctionN"; // Importing a component to render individual auctions
import { useSelector } from "react-redux"; // Importing useSelector hook from Redux
import { Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

const limit = 6; // Maximum number of auctions to fetch in one request

const Auctions = ({ displayIndex }) => {
  const [data, setData] = useState(); // State to store auction data
  const token = useSelector((s) => s.token); // Retrieve the user's token from Redux state
  const [endOdList, setEndOdList] = useState(false); // State to track if all auction data is retrieved
  const [startIndex, setStartIndex] = useState(limit); // State to track the starting index for fetching auctions
  const [loading, setLoading] = useState(false); // State to track loading state while fetching auctions
  const [indChg, setIndChg] = useState(-1); // State to track changes in displayIndex

  // Function to get auction data based on displayIndex
  const get_data = (s, l) => {
    setEndOdList(false);

    if (displayIndex === 1) {
      return getAuctionOnGoingData(s, l); // Fetch ongoing auctions
    } else if (displayIndex === 2) {
      return getAuctionUpcomingData(s, l); // Fetch upcoming auctions
    } else if (displayIndex === 3) {
      return getAuctionEndedData(s, l); // Fetch ended auctions
    } else if (displayIndex === 4) {
      return get_auctions_by_user(token, s, l); // Fetch auctions by the logged-in user
    }
  };

  // Effect to fetch initial auction data when displayIndex changes
  useEffect(() => {
    setLoading(true);
    if (displayIndex !== indChg) {
      setIndChg(displayIndex);
      setStartIndex(limit);
      get_data(0, limit)
        .then((dt) => {
          setData(dt);
          setLoading(false);
        })
        .catch((e) => setLoading(false));
    }
  }, [displayIndex]);

  // Function to refresh auction data
  const refresh = () => {
    setLoading(true);
    get_data(startIndex, limit)
      .then((dt) => {
        setData([...data, ...dt]);
        setStartIndex(startIndex + limit);
        dt.length !== limit && setEndOdList(true);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  return (
    <>
      <FlexBetween my={3}>
        <Box></Box>
        <Tooltip title="Retrieve more Auction data">
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
              <AuctionN key={m._id} data={m} />
            ))}
          </>
        ) : (
          <>No auctions</>
        )}
      </FlexEvenly>
      <FlexEvenly my={5}>
        {endOdList && <b>All Auction Data retrieved</b>}
      </FlexEvenly>
    </>
  );
};

export default Auctions;
