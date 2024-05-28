import React, { useState, useCallback } from "react";
import Loadable from 'react-loadable';
import "./WSHomepage.css";

const WSComment = Loadable({
  loader: () => import('./WSComment'),
  loading: () => <div>Loading...</div>,
});

const WSHomepage = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = useCallback(() => {
    setOverlayVisible(!isOverlayVisible);
  }, [isOverlayVisible]);

  const onClose = useCallback(() => {
    setOverlayVisible(false); 
  }, []);

  const onREPORTSClick = useCallback(() => {
    // Please sync "WS-Report" to the project
  }, []);

  const onPROFILEClick = useCallback(() => {
    // Please sync "WS-Profile" to the project
  }, []);

  const onLEADERBOARDSClick = useCallback(() => {
    // Please sync "WS-Leaderboards" to the project
  }, []);

  return (
    <div className="ws-homepage">
      <div className="WSNavbar" />
      <img className="WSTitle" alt="" src="/TITLE.png" />
      <b className="NHome">Home</b>
      <div className="NReports" onClick={onREPORTSClick}>
        Reports
      </div>
      <div className="NProfile" onClick={onPROFILEClick}>
        Profile
      </div>
      <div className="NLeaderboards" onClick={onLEADERBOARDSClick}>
        Leaderboards
      </div>

      <b className="HWildcat">WILDCAT</b>

      <div className="PostContainer" />
      <img className="users-dp" alt="" src="/dp.png" />
      <div className="post-input" />
      <i className="post-q"> What's happening in your day, Wildcat? </i>
      <img className="gallery-icon" alt="" src="/gallery.png" />
      <img className="mic-icon" alt="" src="/mic.png" />
      <div className="post-container">
        <div className="post-button" />
        <div className="post-name">POST</div>
      </div>
      
      <div className="EXPost1-Box" />
      <img className="EXUser1-dp" alt="" src="/dp.png" />
      <div className="EXUser1-Name">richard.molina</div>
      <img className="EXUser1-badge" alt="" src="/Wildcat-Prowler.png" />
      <img className="EXUser1-verified" alt="" src="/check.png" />
      <div className="EXUser1-Incident-Container">
        <p className="EXUser1-Incident-Margin">
          <span className="IncidentType1">{`Incident Type: `}</span>
          <span>Medical Emergency</span>
        </p>
        <p className="EXUser1-Incident-Margin">
          <span className="IncidentLoc1">{`Incident Location: `}</span>
          <span>NGE Building</span>
        </p>
      </div>
      <img className="EXUser1-Incident-Picture" alt="" src="/ex.png" />
      <div className="EXUser1-line" />
      <img className="EXUser1-like" alt="" src="/t-up.png" />
      <img className="EXUser1-unlike" alt="" src="/t-down.png" />
      <b className="EXUser1-Comment" onClick={toggleOverlay}>Comment</b>

      <div className="EXPost2-Box" />
      <img className="EXUser2-dp" alt="" src="/dp.png" />
      <div className="EXUser2-Name">richard.molina</div>
      <img className="EXUser2-badge" alt="" src="/Wildcat-Prowler.png" />
      <img className="EXUser2-unverified" alt="" src="/x.png" />
      <div className="EXUser2-Incident-Container">
        <p className="EXUser2-Incident-Margin">
          <span className="IncidentType2">{`Incident Type: `}</span>
          <span>Medical Emergency</span>
        </p>
        <p className="EXUser2-Incident-Margin">
          <span className="IncidentLoc2">{`Incident Location: `}</span>
          <span className="nge-building">NGE Building</span>
        </p>
      </div>
      <img className="EXUser2-Incident-Picture" alt="" src="/ex.png" />
      <div className="EXUser2-line" />
      <img className="EXUser2-like" alt="" src="/t-up.png" />
      <img className="EXUser2-unlike" alt="" src="/t-down.png" />
      <b className="EXUser2-Comment" onClick={toggleOverlay}>Comment</b>

      {isOverlayVisible && (
        <div className="overlay" onClick={toggleOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            {/* Pass the onClose function as prop */}
            <WSComment onClose={onClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WSHomepage;
