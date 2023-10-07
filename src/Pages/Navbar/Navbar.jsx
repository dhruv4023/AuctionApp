import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, Menu, Close } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../Components/FlexBetween";
import MenuItems from "./MenuItems";

export const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  // const neutralLight = theme.palette.neutral.light;
  // const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <>
      <FlexBetween backgroundColor={alt} padding="1rem 6%">
        <Typography
          color={"primary"}
          onClick={() => navigate("/")}
          fontWeight={"bold"}
          fontSize={"clamp(1rem,1.5rem,2rem)"}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          SellerApp
        </Typography>
        {/* {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius={"9px"}
            gap={"3rem"}
            width={"40rem"}
            padding={"0 0.5rem"}
            margin={"0 2rem"}
          >
            <FlexBetween sx={{ width: "100%" }}>
              <InputBase sx={{ width: "80%" }} placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          </FlexBetween>
        )} */}
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap={"1rem"}>
              <MenuItems />
            </FlexBetween>
          </>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <>
            <Box
              position={"fixed"}
              right="0"
              top="0"
              zIndex="10"
              maxWidth="500px"
              minWidth="30px"
              backgroundColor={background}
              // border="1px solid red"
              height={"50%"}
              overflow={"auto"}
            >
              <FlexBetween
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="3rem"
              >
                <Box
                  display={"flex"}
                  zIndex={"11"}
                  justifyContent={"flex-end"}
                  p={"1rem"}
                >
                  <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                  >
                    <Close />
                  </IconButton>
                </Box>
                <MenuItems />
              </FlexBetween>
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Box
                  sx={{
                    position: "fixed",
                    left: 0,
                    zIndex: -1,
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </IconButton>
            </Box>
          </>
        )}
      </FlexBetween>
    </>
  );
};
