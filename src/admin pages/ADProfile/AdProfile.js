import React, { useState } from "react";
import AdNavBar from "../../components/AdNavBar";
import "./AdProfile.css";
import ExImg from "../../assets/image/ex-dp.png";
import LogoutDialog from "../../components/LogoutDialog";
import EditSuccessfulDialog from "./EditSuccessfulDialog";
import ErrorDialog from "./ErrorDialog";

const AdProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleUpdateClick = () => {
    if (!currentPassword || !newPassword) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      return;
    }

    setIsEditable(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="main-container">
      <header>
        <AdNavBar />
      </header>
      <main className="adprofile-container">
        <div className="profile-container">
          <div className="profile-details">
            <img src={ExImg} alt="Profile" />
            <div className="name-details">
              <h1>Richard Molina</h1>
              <span>Clinic Admin</span>
            </div>
            <span className="email-design">richard.molina@cit.edu</span>
            <LogoutDialog />
          </div>
        </div>
        <div className="password-container">
          <h1>Password</h1>
          <form>
            <div>
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                readOnly={!isEditable}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                readOnly={!isEditable}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="btn-container">
              {isEditable ? (
                <button type="button" className="update-btn" onClick={handleUpdateClick}>
                  Update
                </button>
              ) : (
                <button type="button" className="edit-btn" onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </div>
          </form>
          {showSuccessMessage && <EditSuccessfulDialog />}
          {showErrorMessage && <ErrorDialog />}
        </div>
      </main>
    </div>
  );
};

export default AdProfile;
