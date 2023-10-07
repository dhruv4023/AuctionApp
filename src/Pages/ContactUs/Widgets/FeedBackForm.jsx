import {Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import { MyBtn, MyTextField } from "Components/MyComponents";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";
import { useState } from "react";
const initialValues = {
  name: "",
  email: "",
  message: "",
};
const FeedBackForm = () => {
  const [values, setValues] = useState(initialValues);

  const setInputVal = (val, name) => {
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };
//   console.log(values);
  const onSubmitHandle = () => {};
  return (
    <WidgetWrapper>
      <Typography py={"0.5rem"} fontWeight={"bold"} fontSize={"1.5rem"} color={"primary"}>
        FeedBack Form
      </Typography>
      <FlexBetween gap={"1rem"} flexDirection={"column"}>
        {Object.keys(values).map((key) => {
          return (
            <MyTextField
              name={key}
              val={values[key]}
              setInputVal={setInputVal}
            />
          );
        })}
      </FlexBetween>
      <MyBtn onclickHandle={onSubmitHandle} label={"Send"} />
    </WidgetWrapper>
  );
};

export default FeedBackForm;
