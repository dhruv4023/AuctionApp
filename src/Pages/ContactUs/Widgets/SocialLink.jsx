import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import { Typography } from "@mui/material";
import SocialLinkComp from "Components/SocialLinkComp";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const SocialLink = () => {
  return (
    <WidgetWrapper>
      {" "}
      <Typography
        py={"0.5rem"}
        fontWeight={"bold"}
        fontSize={"1.5rem"}
        color={"primary"}
      >
        Social Links
      </Typography>
        <hr></hr>
      <SocialLinkComp
        icon={<Twitter />}
        username={"dhruv4023"}
        link={"https://twitter.com/dhruv4023"}
        name={"Dhruv Patel"}
      />
      <SocialLinkComp
        icon={<LinkedIn />}
        username={"dhruv4023"}
        link={"https://www.linkedin.com/in/dhruv4023/"}
        name={"Dhruv Patel"}
      />
      <SocialLinkComp
        icon={<Facebook />}
        username={"dhruv4023"}
        link={"https://www.facebook.com/dhruv4023/"}
        name={"Dhruv Patel"}
      />
      <hr></hr>
      <SocialLinkComp
        icon={<Twitter />}
        username={"JittamSakh97522"}
        link={"https://twitter.com/JittamSakh97522"}
        name={"Jittam Sakhia"}
      />
      <SocialLinkComp
        icon={<LinkedIn />}
        username={"jittam-sakhia"}
        link={"https://www.linkedin.com/in/jittam-sakhia"}
        name={"Jittam Sakhia"}
        />
      <SocialLinkComp
        icon={<Facebook />}
        username={"jittam.sakhia.1"}
        link={"https://www.facebook.com/jittam.sakhia.1"}
        name={"Jittam Sakhia"}
      />
      <hr></hr>
    </WidgetWrapper>
  );
};

export default SocialLink;
