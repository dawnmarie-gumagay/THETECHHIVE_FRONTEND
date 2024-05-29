import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import "./WSProfile.css";

const WSProfile = ({ className = "" }) => {

  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onReportsTextClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onLeaderboardsTextClick = useCallback(() => {
    navigate("/wsleaderboards");
  }, [navigate]);

  const openLOGOUTConfirmation = useCallback(() => {
    navigate("/wsleaderboards");
  }, [navigate]);

  const openUPDATEDPOPUP = useCallback(() => {
    navigate("/wsleaderboards");
  }, [navigate]);


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
        <img
          className="WSProfileUser"
          alt=""
          src="/ex-dp.png"
        />
         <img
          className="WSProfileBadge"
          alt=""
          src="/Wildcat-Pub.png"
        />
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
                    "&:hover": { backgroundColor: "#A91D3A" }
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
                    "&:hover": { backgroundColor: "#A91D3A" }
                    }}
                onClick={openUPDATEDPOPUP}
            >
                Update
            </Button> 
        </div>
    </div>
    </>
  );
};

export default WSProfile;
