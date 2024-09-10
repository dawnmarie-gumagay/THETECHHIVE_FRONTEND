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
  const [error, setError] = useState("");
  const [isErrorPopUpVisible, setIsErrorPopUpVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const defaultProfilePicture = 'default.png';
  const navigate = useNavigate();

  const fetchLoggedInUser = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    setLoggedInUser(user);
    return user;
  }, []);

  const fetchProfilePicture = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/profile/getProfilePicture/${userId}`);
      if (response.ok) {
        const imageBlob = await response.blob();
        if (imageBlob.size > 0) {
          const imageUrl = URL.createObjectURL(imageBlob);
          setProfilePicture(imageUrl);
        } else {
          setProfilePicture(defaultProfilePicture);
        }
      } else {
        setProfilePicture(defaultProfilePicture);
      }
    } catch (error) {
      console.error('Failed to fetch profile picture:', error);
      setProfilePicture(defaultProfilePicture);
    }
  }, [defaultProfilePicture]);

  useEffect(() => {
    const user = fetchLoggedInUser();
    if (user) {
      fetchProfilePicture(user.userId);
    }
  }, [fetchLoggedInUser, fetchProfilePicture]);

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

  const onINSIGHTClick = useCallback(() => {
    navigate("/wsinsight");
  }, [navigate]);

  const openUpdatedPopUp = useCallback(async () => {
    if (!currentPassword || !newPassword) {
      setError("Please enter both current and new passwords.");
      setIsErrorPopUpVisible(true);
    } else {
      try {
        const userId = loggedInUser.userId;
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
          setIsEditable(false); // Reset to initial state
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
    setIsEditable(false); // Ensure editable state is reset
    setCurrentPassword("");
    setNewPassword("");
  }, []);

  const onEditClick = () => {
    setIsEditable(!isEditable); 
  };

  const onCancelClick = () => {
    setIsEditable(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file && loggedInUser) {
      const formData = new FormData();
      formData.append('userId', loggedInUser.userId);
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:8080/user/profile/uploadProfilePicture', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          fetchProfilePicture(loggedInUser.userId);
        } else {
          console.error('Failed to upload profile picture');
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  if (!loggedInUser) {
    return null;
  }

  return (
    <div>
      <div className={`ws-profile ${className}`}>
        <div className="WSNavbar" />
        <img className="WSTitle" alt="" src="/TITLE.png" />
        <div className="NHome" onClick={onHomeTextClick}>
          Home
        </div>
        <div className="NReports" onClick={onReportsTextClick}>
          Report
        </div>
        <div className="NInsight" onClick={onINSIGHTClick}>
        Insight
        </div>
        <b className="NProfile">Profile</b>
        <div className="NLeaderboards" onClick={onLeaderboardsTextClick}>
          Leaderboard
        </div>

        <img className="WSProfileBg" alt="" src="/profilebg.png" />
        <div className="ProfilePictureContainer">
          <img 
            className="WSProfileUser" 
            alt="" 
            src={profilePicture || defaultProfilePicture} 
          />
        <label htmlFor="profilePictureUpload" className="WSProfileUserContainer">
        <div className="upload-overlay">
          <span>Upload</span>
        </div>
        </label>

        <input
          type="file"
          onChange={handleProfilePictureChange}
          style={{ display: 'none' }}
          id="profilePictureUpload"
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
                "&:hover": { 
                  backgroundColor: "#A91D3A",
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease"
                },
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

          <b
  className="edit"
  onClick={onEditClick}
  style={{
    display: 'inline-block',
    marginTop: '-20px', // Adjust the value to move it up
    cursor: 'pointer'
  }}
>
  Edit
</b>


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
                fontSize: "17px",
                marginRight: "10px",
                marginTop: "-30px"
              }}
              onClick={openUpdatedPopUp}
              disabled={!isEditable}
            >
              Update
            </Button>
            {isEditable && (
              <Button
                className="CancelButton"
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  width: 110,
                  height: 35,
                  backgroundColor: "#8A252C",
                  "&:hover": { backgroundColor: "#AAAAAA" },
                  fontSize: "17px"
                }}
                onClick={onCancelClick}
              >
                Cancel
              </Button>
            )}
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
              onClose={closeLOGOUTConfirmation}
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
      </div>
    </div>
  );
};

// ErrorPopUp component
const ErrorPopUp = ({ message, onClose }) => {
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <p>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            onClick={onClose} 
            variant="contained" 
            sx={{
              backgroundColor: '#8a252c',
              color: 'white',
              '&:hover': {
                backgroundColor: '#a91d3a',
                transform: 'scale(1.1)'
              },
              transition: 'transform 0.3s ease'
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WSProfile;