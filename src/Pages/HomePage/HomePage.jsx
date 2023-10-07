import WidgetsOnPage from "Components/WidgetsOnPage";
import Auctions from "Pages/Auctions/Auctions";
import React, { useState } from "react";
import HomePageButtons from "./Widgets/HomePageButtons";
const HomePage = () => {
  const [displayIndex, setDisplayIndex] = useState(1)
  return (
    <>
      <WidgetsOnPage
        title={"Auctions"}
        leftComponent={
          <>
            <HomePageButtons displayIndex={displayIndex} setDisplayIndex={setDisplayIndex}/>
          </>
        }
        rightComponent={
          <>
            <Auctions displayIndex={displayIndex} />
          </>
        }
      />
    </>
  );
};

export default HomePage;
