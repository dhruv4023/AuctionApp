import { AddRounded, CloseRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import MyButton from "Components/MyCompoenents/MyButton";
import React, { useEffect } from "react";
import MyTitle from "./MyTitle";
import WidgetWrapper from "Components/WidgetWrapper";

const AddPopUp = ({ title, user, form, openAddPopUp, setOpenAddPopUp }) => {  
  return (
    <Box position={"fixed"}>
      {openAddPopUp && (
        <Box
          position={"inherit"}
          bgcolor={"rgba(0,0,0,0.5)"}
          top={0}
          right={0}
          width={"100vw"}
          height={"100vh"}
        >
          <Box width={"100%"} height={"100%"}>
            <WidgetWrapper maxWidth={"30rem"} margin={"auto"} my={20}>
              <MyTitle txt={title} />
              {form}
            </WidgetWrapper>
          </Box>
        </Box>
      )}
      <Box right={20} bottom={5} position={"inherit"}>
        <MyButton
          onclickHandle={() => {
            user
              ? setOpenAddPopUp(!openAddPopUp)
              : alert("Login to start Auction");
          }}
          fullwidth={false}
          label={openAddPopUp ? <CloseRounded /> : <AddRounded />}
          borderRadius={"100%"}
        />
      </Box>
    </Box>
  );
};

export default AddPopUp;
