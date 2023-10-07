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

const AuctionPage = () => {
  const { AID } = useParams();
  const [auxdata, setAuxdata] = useState();
  const [bidList, setBidList] = useState();
  const [refresh, setRefresh] = useState(0);
  const [countDown, setCountDown] = useState(false);
  useEffect(() => {
    AID &&
      get_auction_data_by_ID(AID).then((dt) => {
        setAuxdata(dt[0]);
        setCountDown(new Date(dt[0]?.start_time) > new Date());
      });
  }, [AID, refresh]);
  return (
    <>
      <WidgetsOnPage
        title={auxdata?.item_name}
        rightComponent={
          <>
            {countDown ? (
              <CountDown targetTimestamp={auxdata?.start_time} />
            ) : auxdata ? (
              <>
                {new Date(auxdata?.end_time) > new Date() ? (
                  <Bids bidList={bidList} setBidList={setBidList} AID={AID} />
                ) : (
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
              <Loading />
            )}
          </>
        }
        leftComponent={
          <WidgetWrapper>
            {auxdata ? (
              <>
                <DisplayData data={auxdata} />
              </>
            ) : (
              <>
                <Loading />
              </>
            )}
          </WidgetWrapper>
        }
      />
      {new Date(auxdata?.start_time) < new Date() &&
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
