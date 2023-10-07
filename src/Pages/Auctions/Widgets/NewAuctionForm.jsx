import FlexBetween from "Components/FlexBetween";
import MyButton from "Components/MyCompoenents/MyButton";
import { DateTimeField, MyTextField } from "Components/MyComponents";
import React, { useState } from "react";
import { startNewAuction } from "../auctionApi";
import { MXMNDate } from "state/globalFunctions";

const NewAuctionForm = ({ user, setOpenAddPopUp }) => {
  const [Loading, setLoading] = useState(false);
  const [values, setValues] = useState({ user_id: user._id });
  const onChangehandle = (val, name) => {
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    startNewAuction(values)
      .then(() => {
        setLoading(false);
        setOpenAddPopUp(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <form onSubmit={onSubmit}>
      <FlexBetween flexDirection={"column"} gap={2} my={3}>
        <MyTextField setInputVal={onChangehandle} on name={"item_name"} />
        <MyTextField name={"start_price"} setInputVal={onChangehandle} />
        <DateTimeField
          name="start"
          date={true}
          time={true}
          mnDate={MXMNDate(1).toISOString().substring(0, 10)}
          mxDate={MXMNDate(20).toISOString().substring(0, 10)}
          setInputVal={onChangehandle}
        />
        <DateTimeField
          name="end"
          date={true}
          disabled={!values.start_time}
          mnDate={MXMNDate(1, values?.start_time)
            .toISOString()
            .substring(0, 10)}
          mxDate={MXMNDate(10, values?.start_time)
            .toISOString()
            .substring(0, 10)}
          time={true}
          setInputVal={onChangehandle}
        />
        <MyButton disabled={Loading} label={"Start Auction"} />
      </FlexBetween>
    </form>
  );
};
export default NewAuctionForm;
