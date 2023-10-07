import Form from "./Form";
import React, { useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EmailVerification from "./EmailVerification";
import ChangePass from "./ChangePass";
export const LoginPage = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const theme = useTheme();
  const { page } = useParams();
  useEffect(() => {
    page &&
      ["changepass", "verifyemail"].filter((m) => m === page).length === 0 &&
      navigate("/404", { state: null });
  });

  return (
    <Box>
      <Box
        width={"100%"}
        p={"1rem 6%"}
        textAlign="center"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight={"bold"} fontSize="32px" color={"primary"}>
         Authentication To SellerApp
        </Typography>
      </Box>
      <Box
        p="2rem"
        m={"2rem auto"}
        border="2px solid"
        borderRadius={"1.5rem"}
        width={isNonMobileScreens ? "40%" : "90%"}
      >
        {page === "verifyemail" ? (
          <EmailVerification />
        ) : page === "changepass" ? (
          <ChangePass />
        ) : (
          !page && <Form pgType={"Login"} />
        )}
      </Box>
    </Box>
  );
};
// {page === "verifyemail" &&}
