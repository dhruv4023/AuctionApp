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

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { UID } = useParams();
  const [user, setUser] = useState(null);
  const admin = useSelector((state) => state.user);
  useEffect(() => {
    UID && getUser(setUser, UID, navigate);
  }, [UID]);

  const [editProf, setEditProf] = useState(false);
  // console.log(admin?.username === user?.username && user)
  return (
    <>
      <WidgetsOnPage
        leftComponent={
          user ? (
            <UserWidgets
              setEditProf={setEditProf}
              user={admin?.username === UID ? admin : user}
              admin={admin?.username === UID}
            />
          ) : (
            <Loading />
          )
        }
        rightComponent={
          editProf ? (
            <>
              <EditProfileWidget setEditProf={setEditProf} user={admin} />
            </>):(<>
              <Auctions displayIndex={4} />
            </>
          )
        }
      />
      <AddAuction />
    </>
  );
};
