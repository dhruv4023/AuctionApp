import React, { useState } from "react";
import AddPopUp from "Components/MyCompoenents/AddPopUp";
import NewEditAuctionForm from "./NewAuctionForm";

const AddAuction = ({user}) => {

  // State to control the visibility of the add auction pop-up dialog
  const [openAddPopUp, setOpenAddPopUp] = useState(false);

  return (
    <AddPopUp
      // Pass user information as a prop to the AddPopUp component
      user={user}
      title={"Start An Auction"}
      openAddPopUp={openAddPopUp}
      setOpenAddPopUp={setOpenAddPopUp}
      // Render the NewAuctionForm component within the pop-up dialog
      form={<NewEditAuctionForm user={user} openAddPopUp={openAddPopUp} />}
    />
  );
};

export default AddAuction;
