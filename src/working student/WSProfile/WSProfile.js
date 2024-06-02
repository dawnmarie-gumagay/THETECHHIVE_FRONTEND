import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import UpdatedPopUp from './UpdatedPopUp';  
import ConfirmLogout from "./ConfirmLogout";
import "./WSProfile.css";

const WSProfile = ({ className = "" }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isConfirmLogoutVisible, setIsConfirmLogoutVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/user", {
        method: 'GET',
        credentials: 'include' // Include credentials if your API requires authentication
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched user data:", data); // Debugging log
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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

  const onEditClick = () => {
    setIsEditable(!isEditable);
  };

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

        {userData ? (
          <>
            <div className="WSID">{userData.id}</div>
            <div className="WSName">{userData.name}</div>
            <div className="WSPoints">{userData.points} points</div>
            <div className="WSEdu">{userData.email}</div>
          </>
        ) : (
          <div>Loading...</div>
        )}

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

        <input
          type="password"
          className="OldPassInput"
          disabled={!isEditable}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          className="NewPassInput"
          disabled={!isEditable}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <b className="edit" onClick={onEditClick}>Edit</b>

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
            disabled={!isEditable}
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
