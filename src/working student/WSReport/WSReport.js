import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loadable from 'react-loadable';
import "./WSReport.css";

// Lazy loading the popups
const PopUpReport = Loadable({
  loader: () => import('./PopUpReport'),
  loading: () => <div>Loading...</div>,
});

const PopUpConfirm = Loadable({
  loader: () => import('./PopUpConfirm'),
  loading: () => <div>Loading...</div>,
});

const PopUpSuccess = Loadable({
  loader: () => import('./PopUpSuccess'),
  loading: () => <div>Loading...</div>,
});

const WSReport = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);

  const togglePopup = useCallback(() => {
    setPopupVisible(!isPopupVisible);
  }, [isPopupVisible]);

  const showConfirmPopup = useCallback(() => {
    setPopupVisible(false);
    setConfirmVisible(true);
  }, []);

  const showSuccessPopup = useCallback(() => {
    setConfirmVisible(false);
    setSuccessVisible(true);
  }, []);

  const onHomeTextClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onPROFILEClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onLEADERBOARDSClick = useCallback(() => {
    navigate("/wshomepage");
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
        <b className="NReports">Reports</b>
        <div className="NProfile" onClick={onPROFILEClick}>
          Profile
        </div>
        <div className="NLeaderboards" onClick={onLEADERBOARDSClick}>
          Leaderboards
        </div>

        <img className="IncidentReport-Pic" alt="" src="/IN.png" />

        <b className="INTitle1">{`Caught an issue or incident? `}</b>
        <b className="INTitle2">Press here!</b>
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
            <PopUpReport onClose={togglePopup} onConfirm={showConfirmPopup} />
          </div>
        </div>
      )}
      
      {isConfirmVisible && (
        <div className="overlay" onClick={() => setConfirmVisible(false)}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <PopUpConfirm onClose={() => setConfirmVisible(false)} onReport={showSuccessPopup} />
          </div>
        </div>
      )}
      
      {isSuccessVisible && (
        <div className="overlay" onClick={() => setSuccessVisible(false)}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <PopUpSuccess />
          </div>
        </div>
      )}
    </>
  );
};

export default WSReport;
