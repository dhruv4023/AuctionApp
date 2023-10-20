import React, { useState } from "react";
import AddPopUp from "Components/MyCompoenents/AddPopUp";
import NewEditAuctionForm from "./NewAuctionForm";
import { IconButton } from "@mui/material";
import { ModeEditOutline } from "@mui/icons-material";

const EditAuction = ({ user, data }) => {
  // State to control the visibility of the add auction pop-up dialog
  const [openAddPopUp, setOpenAddPopUp] = useState(false);

  return (
    <AddPopUp
      // Pass user information as a prop to the AddPopUp component
      user={user}
      title={"Edit Auction"}
      buttonIcon={<ModeEditOutline />}
      openAddPopUp={openAddPopUp}
      setOpenAddPopUp={setOpenAddPopUp}
      // Render the NewAuctionForm component within the pop-up dialog
      form={
        <NewEditAuctionForm
          user={user}
          data={data}
          openAddPopUp={openAddPopUp}
        />
      }
    />
  );
};

export default EditAuction;
