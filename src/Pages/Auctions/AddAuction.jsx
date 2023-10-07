import React, { useState } from "react";
import AddPopUp from "Components/MyCompoenents/AddPopUp";
import { useSelector } from "react-redux";
import NewAuctionForm from "./Widgets/NewAuctionForm";

const AddAuction = () => {
  const user = useSelector((s) => s.user);
  const [openAddPopUp, setOpenAddPopUp] = useState(false);

  return (
    <AddPopUp
      user={user}
      title={"Start An Auction"}
      openAddPopUp={openAddPopUp}
      setOpenAddPopUp={setOpenAddPopUp}
      form={<NewAuctionForm user={user} openAddPopUp={openAddPopUp} />}
    />
  );
};

export default AddAuction;
