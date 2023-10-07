import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import Form from "Pages/LoginPage/Form";
import React from "react";

const EditProfileWidget = ({ user, setEditProf }) => {
  const userData = {
    about: user.about,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    picPath: "",
    username: user.username,
  };
  // console.log(user);
  return (
    <WidgetWrapper>
      <IconButton
        size={"50"}
        sx={{ m: "0 0 1rem 0" }}
        onClick={() => setEditProf(false)}
      >
        <CloseRounded />
      </IconButton>
      <FlexBetween width={"100%"}>
        <Form pgType={"Register"} user={userData} editProfile={true} />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default EditProfileWidget;
