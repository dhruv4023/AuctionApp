import React, { useState } from "react";
import AddPopUp from "Components/MyCompoenents/AddPopUp";
import { useSelector } from "react-redux";
import NewBidForm from "./NewBidForm";

const AddNewBid = ({ start_price, AID, setRefresh, bidList }) => {
  // Retrieve user information from Redux state
  const user = useSelector((s) => s.user);

  // State to control the visibility of the add bid pop-up
  const [openAddPopUp, setOpenAddPopUp] = useState(false);

  return (
    <AddPopUp
      user={user}
      title={"Start An Auction"} // Title for the pop-up
      openAddPopUp={openAddPopUp}
      setOpenAddPopUp={setOpenAddPopUp}
      form={
        // Pass a form component (NewBidForm) as a prop to the AddPopUp component
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
