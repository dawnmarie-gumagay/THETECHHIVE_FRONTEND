import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import UpdatedPopUp from './UpdatedPopUp';  
import ConfirmLogout from "./ConfirmLogout";
import "./WSProfile.css";

const WSProfile = ({ className = "" }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isConfirmLogoutVisible, setIsConfirmLogoutVisible] = useState(false);
  const navigate = useNavigate();

  const openLOGOUTConfirmation = () => {
    setIsConfirmLogoutVisible(true);
  };

  const closeLOGOUTConfirmation = () => {
    setIsConfirmLogoutVisible(false);
  };

  const onLOGOUTTextClick = () => {
    navigate("/logged-out");
  };

  const onCANCELTextClick = () => {
    setIsConfirmLogoutVisible(false);
  };

  const onHomeTextClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onReportsTextClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onLeaderboardsTextClick = useCallback(() => {
    navigate("/wsleaderboards");
  }, [navigate]);

  const openUpdatedPopUp = useCallback(() => {
    setIsPopUpVisible(true);
  }, []);

  const closeUpdatedPopUp = useCallback(() => {
    setIsPopUpVisible(false);
  }, []);

  return (
    <>
      <div className={`ws-profile ${className}`}>
        <div className="WSNavbar" />
        <img className="WSTitle" alt="" src="/TITLE.png" />
        <div className="NHome" onClick={onHomeTextClick}>
          Home
        </div>
        <div className="NReports" onClick={onReportsTextClick}>
          Reports
        </div>
        <b className="NProfile">Profile</b>
        <div className="NLeaderboards" onClick={onLeaderboardsTextClick}>
          Leaderboards
        </div>

        <img className="WSProfileBg" alt="" src="/profilebg.png" />
        <img className="WSProfileUser" alt="" src="/ex-dp.png" />
        <img className="WSProfileBadge" alt="" src="/Wildcat-Pub.png" />
        <div className="WSID">21-0000-000</div>
        <div className="WSName">Richard Molina</div>
        <div className="WSPoints">2500 points</div>
        <div className="WSEdu">richard.molina@cit.edu</div>

        <div className="WSPLogout">
          <Button
            className="LogoutButton"
            variant="contained"
            sx={{
              borderRadius: "10px",
              width: 110,
              height: 40,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" },
              fontSize: "17px"
            }}
            onClick={openLOGOUTConfirmation}
          >
            Logout
          </Button>
        </div>

        <div className="PasswordGroup">
          <div className="PasswordBox" />
          <b className="PasswordName">Password</b>
          <div className="OldPass">Current Password</div>
          <div className="NewPass">New Password</div>
        </div>

        <div className="OldPassInput" />
        <div className="NewPassInput" />

        <b className="edit">Edit</b>

        <div className="UpdateContainer">
          <Button
            className="UpdateButton"
            variant="contained"
            sx={{
              borderRadius: "10px",
              width: 110,
              height: 35,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" },
              fontSize: "17px"
            }}
            onClick={openUpdatedPopUp}
          >
            Update
          </Button>
        </div>
      </div>

      {isPopUpVisible && (
        <div className="popup-overlay">
          <UpdatedPopUp onClose={closeUpdatedPopUp} />
        </div>
      )}

      {isConfirmLogoutVisible && (
        <div className="popup-overlay">
          <ConfirmLogout
            onLOGOUTTextClick={onLOGOUTTextClick}
            onCANCELTextClick={onCANCELTextClick}
          />
        </div>
      )}

      {isConfirmLogoutVisible && (
        <div className="popup-overlay">
          <ConfirmLogout onClose={closeLOGOUTConfirmation} />
        </div>
      )}
    </>
  );
};

export default WSProfile;
