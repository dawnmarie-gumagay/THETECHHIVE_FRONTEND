import React, { useState, useCallback, useEffect } from "react";
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
  const [profilePicture, setProfilePicture] = useState(null); // State to hold profile picture
  const navigate = useNavigate();

  // Function to fetch and set logged in user data
  const fetchLoggedInUser = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    setLoggedInUser(user);
    return user;
  }, []);

  // Function to fetch profile picture
  const fetchProfilePicture = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/profile/getProfilePicture/${userId}`);
      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfilePicture(imageUrl);
      } else {
        setProfilePicture(null);
      }
    } catch (error) {
      console.error('Failed to fetch profile picture:', error);
      setProfilePicture(null);
    }
  }, []);

  // Fetch logged in user data and profile picture on component mount
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
    return null; // Handle case where user is not logged in
  }

  return (
    <>
      <div className={`ws-profile ${className}`}>
        <div className="WSNavbar" />
        <img className="WSTitle" alt="" src="/TITLE.png" />
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
        <div className="ProfilePictureContainer">
        <img className="WSProfileUser" alt="" src={profilePicture ? profilePicture : "/public/dp.png"} />


        <input
          type="file"
          onChange={handleProfilePictureChange}
          style={{ display: 'none' }}
          id="profilePictureUpload"
        />
        <label htmlFor="profilePictureUpload">
          <Button
            className="UploadButton"
            variant="contained"
            sx={{
              borderRadius: "10px",
              width: 65,
              height: 22,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" },
              fontSize: "10px"
            }}
            component="span"
          >
            Upload
          </Button>
        </label>
      </div>


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
            onCANCELTextClick={() => setIsConfirmLogoutVisible(false)}
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
