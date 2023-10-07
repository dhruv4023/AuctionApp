// Import necessary dependencies and components
import Loading from "Components/Loader/Loading";
import WidgetsOnPage from "Components/WidgetsOnPage";
import AddAuction from "Pages/Auctions/AddAuction";
import Auctions from "Pages/Auctions/Auctions";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditProfileWidget from "Widgets/EditProfileWidget";
import UserWidgets from "Widgets/UserWidgets";
import { getUser } from "Widgets/WidgetFunctions";

// Define the ProfilePage component
export const ProfilePage = () => {
  const navigate = useNavigate();
  const { UID } = useParams();
  const [user, setUser] = useState(null);
  const admin = useSelector((state) => state.user);

  // Use the useEffect hook to fetch user data based on the UID parameter
  useEffect(() => {
    UID && getUser(setUser, UID, navigate);
  }, [UID]);

  const [editProf, setEditProf] = useState(false);

  return (
    <>
      {/* Render WidgetsOnPage component */}
      <WidgetsOnPage
        leftComponent={
          user ? (
            // Render UserWidgets component with specific props
            <UserWidgets
              setEditProf={setEditProf}
              user={admin?.username === UID ? admin : user}
              admin={admin?.username === UID}
            />
          ) : (
            // Render Loading component while user data is being fetched
            <Loading />
          )
        }
        rightComponent={
          editProf ? (
            <>
              {/* Render EditProfileWidget component with specific props */}
              <EditProfileWidget setEditProf={setEditProf} user={admin} />
            </>):(
            <>
              {/* Render Auctions component with specific props */}
              <Auctions displayIndex={4} />
            </>
          )
        }
      />
      {/* Render AddAuction component */}
      <AddAuction />
    </>
  );
};
