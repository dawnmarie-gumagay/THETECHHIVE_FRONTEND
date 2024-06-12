import React from "react";
import AdNavBar from "../../components/AdNavBar";
import "./AdProfile.css";
import ExImg from "../../assets/image/ex-dp.png";
import LogoutDialog from "../../components/LogoutDialog";
import EditSuccessfulDialog from "../../components/EditSucessfulDialog";

const AdProfile = () => {
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
              <input />
            </div>
            <div>
              <label>New Password</label>
              <input />
            </div>
            <div className="btn-container">
              <button className="edit-btn">Edit</button>
              <EditSuccessfulDialog />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdProfile;
