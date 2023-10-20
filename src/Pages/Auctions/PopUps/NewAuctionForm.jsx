import FlexBetween from "Components/FlexBetween";
import MyButton from "Components/MyCompoenents/MyButton";
import { DateTimeField, MyTextField } from "Components/MyComponents";
import React, { useEffect, useState } from "react";
import { EditAuction, startNewAuction } from "../auctionApi";
import { MXMNDate } from "state/globalFunctions";
import { useSelector } from "react-redux";

const NewEditAuctionForm = ({ user, data, setOpenAddPopUp }) => {
  const token = useSelector((s) => s.token);
  const [Loading, setLoading] = useState(false);
  const [values, setValues] = useState({ user_id: user._id });
  const onChangehandle = (val, name) => {
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };
  const [aID, setAID] = useState();
  useEffect(() => {
    if (data) {
      data?._id && setAID(data._id);
      setValues({
        user_id: user._id,
        start_time:
          String(data["start_time"]).substring(0, 10) +
          " " +
          String(data["start_time"]).substring(11, 16),
        end_time:
          String(data["end_time"]).substring(0, 10) +
          " " +
          String(data["end_time"]).substring(11, 16),
        start_price: data["start_price"],
        item_name: data["item_name"],
      });
    }
  }, []);
  // console.log(data);
  // console.log(aID);
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (data != null) {
      EditAuction(values, token, aID)
        .then(() => {
          setLoading(false);
          setOpenAddPopUp(false);
        })
        .catch(() => setLoading(false));
    } else
      startNewAuction(values, token)
        .then(() => {
          setLoading(false);
          setOpenAddPopUp(false);
        })
        .catch(() => setLoading(false));
  };
  // console.log(values);
  return (
    <form onSubmit={onSubmit}>
      <FlexBetween flexDirection={"column"} gap={2} my={3}>
        <MyTextField
          val={values?.item_name}
          setInputVal={onChangehandle}
          name={"item_name"}
        />
        <MyTextField
          val={values?.start_price}
          name={"start_price"}
          setInputVal={onChangehandle}
        />
        <DateTimeField
          name="start"
          date={true}
          oldVals={values?.start_time}
          time={true}
          mnDate={MXMNDate(1).toISOString().substring(0, 10)}
          mxDate={MXMNDate(20).toISOString().substring(0, 10)}
          setInputVal={onChangehandle}
        />
        <DateTimeField
          name="end"
          oldVals={values?.end_time}
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
        <MyButton disabled={Loading} label={!data ? "Start Auction":"Update Details"} />
      </FlexBetween>
    </form>
  );
};
export default NewEditAuctionForm;
