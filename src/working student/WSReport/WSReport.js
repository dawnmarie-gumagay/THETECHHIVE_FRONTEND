import { useState, useCallback } from "react";
import PopUpReport from "./PopUpReport";
import PortalPopup from "./PortalPopup";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./WSReport.css";

const WSReport = ({ className = "" }) => {
  const [isPopUpReportOpen, setPopUpReportOpen] = useState(false);
  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onLeaderboardsTextClick = useCallback(() => {
    // Please sync "WS-Leaderboards" to the project
  }, []);

  const openPopUpReport = useCallback(() => {
    setPopUpReportOpen(true);
  }, []);

  const closePopUpReport = useCallback(() => {
    setPopUpReportOpen(false);
  }, []);

  return (
    <>
      <div className={`ws-report ${className}`}>
        <img className="untitled-1-1-icon" alt="" src="/untitled1-1@2x.png" />
        <div className="ws-report-child" />
        <div className="home1" onClick={onHomeTextClick}>
          Home
        </div>
        <b className="reports1">Reports</b>
        <b className="caught-an-issue">{`Caught an issue or incident? `}</b>
        <b className="press-here">Press here!</b>
        <div className="profile1">Profile</div>
        <div className="leaderboards1" onClick={onLeaderboardsTextClick}>
          Leaderboards
        </div>
        <img className="image-1-icon" alt="" src="/image-1@2x.png" />
        <img className="wildcat-3-icon6" alt="" src="/wildcat-3@2x.png" />
        <img
          className="wildcat-1-icon"
          alt=""
          src="/wildcat-1@2x.png"
          onClick={openPopUpReport}
        />
      </div>
      {isPopUpReportOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopUpReport}
        >
          <PopUpReport onClose={closePopUpReport} />
        </PortalPopup>
      )}
    </>
  );
};

WSReport.propTypes = {
  className: PropTypes.string,
};

export default WSReport;
