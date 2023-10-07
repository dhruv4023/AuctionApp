import FlexBetween from "Components/FlexBetween";
import MyButton from "Components/MyCompoenents/MyButton";
import { MyTextField } from "Components/MyComponents";
import React, { useState } from "react";
import { add_New_Bid } from "../BidsAPI"; // Imports the function for adding a new bid
import { useSelector } from "react-redux";

const NewBidForm = ({
  AID, // Auction ID
  start_price, // Starting price of the auction
  user, // Current user information
  setRefresh, // Function to refresh data after adding a bid
  bidList, // List of existing bids
  setOpenAddPopUp, // Function to close the bid pop-up
}) => {
  const token = useSelector((s) => s.token); // Retrieve the user's token from Redux state
  const [Loading, setLoading] = useState(false); // State to track loading state while adding a bid
  const [values, setValues] = useState({ user_id: user._id }); // State to store bid data

  // Function to handle changes in form input fields
  const onChangehandle = (val, name) => {
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (token) {
      setLoading(true);
      // Call the function to add a new bid using the API
      add_New_Bid(values, AID, token)
        .then(() => {
          setRefresh(new Date()); // Refresh data after adding a bid
          setLoading(false);
          setOpenAddPopUp(false); // Close the bid pop-up
          // Add the newly created bid to the bidList with timestamp and user information
          bidList.unshift({
            ...values,
            timestamp: new Date(),
            user_id: { name: user.firstName + " " + user.lastName },
          });
        })
        .catch(() => setLoading(false));
    } else {
      alert("Login To add bid"); // Show an alert if the user is not logged in
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FlexBetween flexDirection={"column"} gap={2} my={3}>
        <MyTextField
          type="number"
          mnVal={bidList.length !== 0 ? bidList[0].bid_amount : start_price}
          name={"bid_amount"}
          setInputVal={onChangehandle}
        />
        <MyButton disabled={Loading} label={"Add Bid"} />
      </FlexBetween>
    </form>
  );
};

export default NewBidForm;
