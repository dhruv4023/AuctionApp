import FlexBetween from "Components/FlexBetween";
import MyButton from "Components/MyCompoenents/MyButton";
import { MyTextField } from "Components/MyComponents";
import React, { useState } from "react";
import { add_New_Bid } from "../BidsAPI";
import { useSelector } from "react-redux";

const NewBidForm = ({
  AID,
  start_price,
  user,
  setRefresh,
  bidList,
  setOpenAddPopUp,
}) => {
  const token = useSelector((s) => s.token);
  const [Loading, setLoading] = useState(false);
  const [values, setValues] = useState({ user_id: user._id });
  const onChangehandle = (val, name) => {
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (token) {
      setLoading(true);
      add_New_Bid(values, AID, token)
        .then(() => {
          setRefresh(new Date());
          setLoading(false);
          setOpenAddPopUp(false);
          bidList.unshift({
            ...values,
            timestamp: new Date(),
            user_id: { name: user.firstName + " " + user.lastName },
          });
        })
        .catch(() => setLoading(false));
    } else {
      alert("Login To add bid");
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
