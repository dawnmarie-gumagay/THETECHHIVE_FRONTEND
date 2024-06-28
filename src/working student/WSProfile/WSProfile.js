import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import UpdatedPopUp from './UpdatedPopUp';  
import ConfirmLogout from "./ConfirmLogout";
import "./WSProfile.css";

const ErrorPopUp = ({ message, onClose }) => {
  return (
    <div className="error-popup">
      <p>{message}</p>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

const WSProfile = ({ className = "" }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isConfirmLogoutVisible, setIsConfirmLogoutVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isErrorPopUpVisible, setIsErrorPopUpVisible] = useState(false);
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

  const openUpdatedPopUp = useCallback(async () => {
    if (!currentPassword && !newPassword) {
      setError("Please enter both current and new passwords.");
      setIsErrorPopUpVisible(true);
    } else if (!currentPassword || !newPassword) {
      setError("Please fill up both current and new password fields.");
      setIsErrorPopUpVisible(true);
    } else {
      try {
        const userId = 1; // Replace this with the actual user ID
        const response = await fetch(`http://localhost:8080/user/updateUser?userId=${userId}&currentPassword=${currentPassword}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        });

        if (response.ok) {
          setIsPopUpVisible(true);
          setCurrentPassword("");
          setNewPassword("");
        } else {
          const errorData = await response.text(); // Change from response.json() to response.text()
          console.log("Server response:", errorData);
          setError(errorData || "Failed to update password. Please try again.");
          setIsErrorPopUpVisible(true);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setError("An error occurred. Please try again.");
        setIsErrorPopUpVisible(true);
      }
    }
  }, [currentPassword, newPassword]);

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

      {isErrorPopUpVisible && (
        <div className="popup-overlay">
          <ErrorPopUp 
            message={error} 
            onClose={() => setIsErrorPopUpVisible(false)} 
          />
        </div>
      )}
    </>
  );
};

export default WSProfile;
