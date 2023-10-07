import WidgetsOnPage from "Components/WidgetsOnPage";
import Auctions from "Pages/Auctions/Auctions";
import React, { useState } from "react";
import HomePageButtons from "./Widgets/HomePageButtons";

const HomePage = () => {
  // State to manage the display index of auctions
  const [displayIndex, setDisplayIndex] = useState(1);

  return (
    <>
      {/* WidgetsOnPage component that displays auctions */}
      <WidgetsOnPage
        title={"Auctions"}
        leftComponent={
          <>
            {/* HomePageButtons component for controlling the display index */}
            <HomePageButtons
              displayIndex={displayIndex}
              setDisplayIndex={setDisplayIndex}
            />
          </>
        }
        rightComponent={
          <>
            {/* Auctions component with the specified display index */}
            <Auctions displayIndex={displayIndex} />
          </>
        }
      />
    </>
  );
};

export default HomePage;
