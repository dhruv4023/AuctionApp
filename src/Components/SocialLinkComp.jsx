import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const SocialLinkComp = ({ icon, username, link ,name}) => {
  const theme = useTheme();
  return (
    <FlexBetween gap={"1rem"} mb="0.5rem">
      <FlexBetween gap={"1rem"}>
        {icon}
        <Box>
          <Typography
            fontSize={"1rem"}
            color={theme.palette.neutral.main}
            fontWeight={"500"}
          >
            <Link
              style={{
                textDecoration: "none",
                color: theme.palette.primary.dark,
              }}
              to={link}
              target="_blank"
            >
              @{username}
            </Link>
          </Typography>
          <Typography color={theme.palette.neutral.medium} fontWeight={"500"}>
            {name}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default SocialLinkComp;
