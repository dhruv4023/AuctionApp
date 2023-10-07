import React, { useEffect, useState } from "react";
import AddPopUp from "Components/MyCompoenents/AddPopUp";
import { useSelector } from "react-redux";
import NewBidForm from "./NewBidForm";

const AddNewBid = ({ start_price, AID, setRefresh, bidList }) => {
  const user = useSelector((s) => s.user);
  const [openAddPopUp, setOpenAddPopUp] = useState(false);
  return (
    <AddPopUp
      user={user}
      title={"Start An Auction"}
      openAddPopUp={openAddPopUp}
      setOpenAddPopUp={setOpenAddPopUp}
      form={
        <NewBidForm
          setRefresh={setRefresh}
          bidList={bidList}
          start_price={start_price}
          AID={AID}
          user={user}
          setOpenAddPopUp={setOpenAddPopUp}
        />
      }
    />
  );
};

export default AddNewBid;
