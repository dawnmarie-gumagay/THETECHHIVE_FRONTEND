import React, { useState, useCallback, useEffect, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import UpdatedPopUp from './UpdatedPopUp';  
import ConfirmLogout from "./ConfirmLogout";
import "./WSProfile.css";

const ErrorPopUp = ({ message, onClose }) => {
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <p>{message}</p>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </div>
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
  const [loggedInUser, setLoggedInUser] = useState(null); // State to hold logged in user data
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("/ex-dp.png");
  const fileInputRef = useRef(null);

  // Function to fetch and set logged in user data
  const fetchLoggedInUser = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    setLoggedInUser(user);
  }, []);

  // Fetch logged in user data on component mount
  useEffect(() => {
    fetchLoggedInUser();
  }, [fetchLoggedInUser]);

  const openLOGOUTConfirmation = () => {
    setIsConfirmLogoutVisible(true);
  };

  const closeLOGOUTConfirmation = () => {
    setIsConfirmLogoutVisible(false);
  };

  const onLOGOUTTextClick = () => {
    navigate("/logged-out");
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
    if (!currentPassword || !newPassword) {
      setError("Please enter both current and new passwords.");
      setIsErrorPopUpVisible(true);
    } else {
      try {
        const userId = loggedInUser.userId; // Use the actual user ID from loggedInUser
        console.log('Sending update request:', { userId, currentPassword, newPassword });
        const response = await fetch(`http://localhost:8080/user/updateUser?userId=${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            password: newPassword,
          }),
        });

        if (response.ok) {
          setIsPopUpVisible(true);
          setCurrentPassword("");
          setNewPassword("");
        } else {
          const errorData = await response.text();
          console.error('Update failed:', errorData);
          setError(errorData || "Failed to update password. Please try again.");
          setIsErrorPopUpVisible(true);
        }
      } catch (error) {
        console.error('Update error:', error);
        setError("An error occurred. Please try again.");
        setIsErrorPopUpVisible(true);
      }
    }
  }, [currentPassword, newPassword, loggedInUser]);

  const closeUpdatedPopUp = useCallback(() => {
    setIsPopUpVisible(false);
  }, []);

  const onEditClick = () => {
    setIsEditable(!isEditable);
  };

  if (!loggedInUser) {
    return null; // Handle case where user is not logged in
  }

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        // Here you would typically upload the file to your server
        // and update the user's profile in your database
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={`ws-profile ${className}`}>
        <div className="WSNavbar" />
        <img className="WSTitleP" alt="" src="/TITLE.png" />
        <div className="NHome" onClick={onHomeTextClick}>
          Home
        </div>
        <div className="NReports" onClick={onReportsTextClick}>
          Entry
        </div>
        <b className="NProfile">Profile</b>
        <div className="NLeaderboards" onClick={onLeaderboardsTextClick}>
          Leaderboard
        </div>

        <img className="WSProfileBg" alt="" src="/profilebg.png" />
        <Button 
          className="WSProfileUser"
          onClick={() => fileInputRef.current.click()}
            sx={{
                padding: 0,
                borderRadius: '50%',
                overflow: 'hidden',
                          '&:hover': {
                                  opacity: 0.8,
                                    },
                }}
        >
          <img src={profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleProfilePictureChange}
        />
        
        <img className="WSProfileBadge" alt="" src="/Wildcat-Pub.png" />
        <div className="WSID">{loggedInUser.idNumber}</div>
        <div className="WSName">{loggedInUser.fullName}</div>
        <div className="WSEdu">{loggedInUser.email}</div>

        <div className="WSPoints">2500 points</div>

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
      onClose={() => setIsConfirmLogoutVisible(false)}
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
