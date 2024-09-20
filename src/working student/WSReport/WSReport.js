import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loadable from 'react-loadable';
import "./WSReport.css";


const PopUpPermissionLoc = Loadable({
  loader: () => import('./PopUpPermissionLoc'),
  loading: () => <div>Loading...</div>,
});

const WSReport = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = useCallback(() => {
    setPopupVisible(!isPopupVisible);
  }, [isPopupVisible]);

  const onHomeTextClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onLEADERBOARDSClick = useCallback(() => {
    navigate("/wsleaderboards");
  }, [navigate]);
  
  const onINSIGHTClick = useCallback(() => {
    navigate("/insightanalytics");
  }, [navigate]);

  const onPROFILEClick = useCallback(() => {
    navigate("/wsprofile");
  }, [navigate]);

  return (
    <>
      <div className="ws-report">
        <img className="bg2-expanded" alt="" src="/bg2-expanded.png" />

        <div className="WSNavbar" />
        <img className="WSTitle" alt="" src="/TITLE.png" />
        <div className="NHome" onClick={onHomeTextClick}>
          Home
        </div>
        <b className="NReports">Report</b>
        <div className="NProfile" onClick={onPROFILEClick}>
          Profile
        </div>
        <div className="NLeaderboards" onClick={onLEADERBOARDSClick}>
          Leaderboard
        </div>
        <div className="NInsight" onClick={onINSIGHTClick}>
        Insight
        </div>

        <img className="IncidentReport-Pic" alt="" src="/IN.png" />

        <b className="INTitle1">{`See something? Say something. `}</b>
        <b className="INTitle2">Report here!</b>
        <img
          className="INReport"
          alt=""
          src="/wildcat-icon.png"
          onClick={togglePopup} 
        />
      </div>
      
      {isPopupVisible && (
        <div className="overlay" onClick={togglePopup}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <PopUpPermissionLoc onClose={togglePopup} />
          </div>
        </div>
      )}
    </>
  );
};

export default WSReport;