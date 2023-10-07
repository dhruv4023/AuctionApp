import MyButton from "Components/MyCompoenents/MyButton";
import MyTitle from "Components/MyCompoenents/MyTitle";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const HomePageButtons = ({ setDisplayIndex, displayIndex }) => {
  return (
    <WidgetWrapper>
      <MyTitle txt={"Select"} />
      <MyButton
        disabled={1 === displayIndex}
        onclickHandle={() => setDisplayIndex(1)}
        label={"Currently Going ON"}
      />
      <MyButton
        disabled={2 === displayIndex}
        onclickHandle={() => setDisplayIndex(2)}
        label={"Upcomming"}
      />
      <MyButton
        disabled={3 === displayIndex}
        onclickHandle={() => setDisplayIndex(3)}
        label={"Ended"}
      />
    </WidgetWrapper>
  );
};

export default HomePageButtons;
