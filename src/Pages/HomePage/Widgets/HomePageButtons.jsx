import MyButton from "Components/MyCompoenents/MyButton";
import MyTitle from "Components/MyCompoenents/MyTitle";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

// Component for rendering buttons to select the display index of auctions
const HomePageButtons = ({ setDisplayIndex, displayIndex }) => {
  return (
    // WidgetWrapper is a container for the buttons
    <WidgetWrapper>
      {/* MyTitle component displaying the title */}
      <MyTitle txt={"Select"} />
      {/* Button to display currently ongoing auctions */}
      <MyButton
        disabled={1 === displayIndex}
        onclickHandle={() => setDisplayIndex(1)}
        label={"Currently Going ON"}
      />
      {/* Button to display upcoming auctions */}
      <MyButton
        disabled={2 === displayIndex}
        onclickHandle={() => setDisplayIndex(2)}
        label={"Upcoming"}
      />
      {/* Button to display ended auctions */}
      <MyButton
        disabled={3 === displayIndex}
        onclickHandle={() => setDisplayIndex(3)}
        label={"Ended"}
      />
    </WidgetWrapper>
  );
};

export default HomePageButtons;
