import FlexBetween from "Components/FlexBetween";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_auction_data_by_ID } from "./AuctionPageApi";
import WidgetWrapper from "Components/WidgetWrapper";
import { Box, Divider } from "@mui/material";
import Loading from "Components/Loader/Loading";
import MyTitle from "Components/MyCompoenents/MyTitle";
import Bids from "Pages/Bids/Bids";
import { formatTimestamp } from "state/globalFunctions";
import WidgetsOnPage from "Components/WidgetsOnPage";
import AddNewBid from "Pages/Bids/AddNewBid/AddNewBid";
import CountDown from "Components/MyCompoenents/CountDown";
import moment from "moment/moment";
import { useSelector } from "react-redux";

const AuctionPage = () => {
  // Get the auction ID from the URL using the useParams hook
  const { AID } = useParams();

  const user = useSelector((s) => s.user);

  // State to store auction data
  const [auxdata, setAuxdata] = useState();

  // State to store bid list
  const [bidList, setBidList] = useState();

  // State to trigger a refresh when bids are added
  const [refresh, setRefresh] = useState(0);

  // State to control the countdown timer
  const [countDown, setCountDown] = useState(false);

  // Fetch auction data when the component mounts and when the refresh state changes
  useEffect(() => {
    AID &&
      get_auction_data_by_ID(AID).then((dt) => {
        setAuxdata(dt[0]);
        setCountDown(new Date(dt[0]?.start_time) > new Date());
      });
  }, [AID, refresh]);
  // console.log(auxdata);
  return (
    <>
      <WidgetsOnPage
        title={auxdata?.item_name}
        rightComponent={
          <>
            {countDown ? (
              // Display countdown timer if the auction has not started yet
              <CountDown targetTimestamp={auxdata?.start_time} />
            ) : auxdata ? (
              <>
                {new Date(auxdata?.end_time) > new Date() ? (
                  // Display bids component if the auction is ongoing
                  <Bids bidList={bidList} setBidList={setBidList} AID={AID} />
                ) : (
                  // Display auction end information if the auction has ended
                  <>
                    <h2>Auction Ended {moment(auxdata?.end_time).fromNow()}</h2>
                    <>
                      <Divider />
                      <Box>
                        <b>WINNER:</b> {auxdata.winner?.name}
                      </Box>
                    </>
                  </>
                )}
              </>
            ) : (
              // Display loading component while fetching data
              <Loading />
            )}
          </>
        }
        leftComponent={
          <WidgetWrapper>
            {auxdata ? (
              <>
                {/* Display auction details */}
                <DisplayData data={auxdata} />
              </>
            ) : (
              // Display loading component while fetching data
              <>
                <Loading />
              </>
            )}
          </WidgetWrapper>
        }
      />
      {/* Display add new bid component if the auction is ongoing */}
      {auxdata?.created_by?._id !== user?.username &&
        new Date(auxdata?.start_time) < new Date() &&
        new Date(auxdata?.end_time) > new Date() && (
          <AddNewBid
            start_price={auxdata?.start_price}
            setRefresh={setRefresh}
            bidList={bidList}
            AID={AID}
          />
        )}
    </>
  );
};

export default AuctionPage;

// Display auction details component
const DisplayData = ({ data }) => {
  return (
    <FlexBetween flexDirection={"column"}>
      <MyTitle txt="Auction Details" />
      <NItem label="Start Price" item={data.start_price} />
      <Divider />
      <NItem label="Start Date" item={formatTimestamp(data.start_time).date} />
      <NItem label="Start Time" item={formatTimestamp(data.start_time).time} />
      <Divider />
      <NItem label="End Date" item={formatTimestamp(data.end_time).date} />
      <NItem label="End Time" item={formatTimestamp(data.end_time).time} />
      <Divider />
      <NItem label="Started By" item={data.created_by.name} />
    </FlexBetween>
  );
};

// Display auction detail item
const NItem = ({ label, item }) => {
  return (
    <FlexBetween gap={2} width={"100%"} fontSize={"1rem"}>
      <Box width={"6rem"} sx={{ fontWeight: "700" }}>
        {label}
      </Box>
      <Box>:</Box>
      <Box>{item}</Box>
      <Box flexGrow={5}></Box>
    </FlexBetween>
  );
};
