import WidgetsOnPage from "Components/WidgetsOnPage";
import React from "react";
import FeedBackForm from "./Widgets/FeedBackForm";
import SocialLink from "./Widgets/SocialLink";

const ContactUsPage = () => {
  return (
    <WidgetsOnPage
      title={"Contact Us"}
      leftComponent={<SocialLink />}
      rightComponent={<FeedBackForm />}
    />
  );
};

export default ContactUsPage;
