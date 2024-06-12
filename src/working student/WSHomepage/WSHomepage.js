import { useCallback } from "react";
import "./WSHomepage.css";

const WSHomepage = () => {
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
      <img
        className="solargallery-bold-icon"
        alt=""
        src="/solargallerybold.svg"
      />
      <div className="ws-homepage-item" />
      
      <div className="ws-homepage-child1" />
      <div className="ws-homepage-child2" />
 
      
      
      
      <div className="richardmolina">richard.molina</div>
      <div className="richardmolina1">richard.molina</div>
      <b className="comment">Comment</b>
      <b className="comment1">Comment</b>
      <div className="incident-type-medical-container">
        <p className="incident-type-medical-emergen">
          <span className="incident-type">{`Incident Type: `}</span>
          <span>Medical Emergency</span>
        </p>
        <p className="incident-type-medical-emergen">
          <span className="incident-location">{`Incident Location: `}</span>
          <span className="nge-building">NGE Building</span>
        </p>
      </div>
      <div className="incident-type-medical-container1">
        <p className="incident-type-medical-emergen">
          <span className="incident-type">{`Incident Type: `}</span>
          <span>Medical Emergency</span>
        </p>
        <p className="incident-type-medical-emergen">
          <span className="incident-location">{`Incident Location: `}</span>
          <span className="nge-building">NGE Building</span>
        </p>
      </div>
      <img
        className="dreamstime-l-35800431-scaled-1-icon"
        alt=""
        src="/dreamstime-l-35800431scaled-1@2x.png"
      />
      <img
        className="dreamstime-l-35800431-scaled-2-icon"
        alt=""
        src="/dreamstime-l-35800431scaled-1@2x.png"
      />
      <div className="ws-homepage-child3" />
      <div className="ws-homepage-child4" />
      <div className="rectangle-parent2">
        <div className="group-child6" />
        <div className="post">POST</div>
      </div>
      <i className="whats-happening-in">
        What's happening in your day, Wildcat?
      </i>
      <img
        className="solarverified-check-bold-icon"
        alt=""
        src="/solarverifiedcheckbold.svg"
      />
      <img className="circle-3-icon" alt="" src="/circle-3@2x.png" />
      <img className="circle-4-icon" alt="" src="/circle-3@2x.png" />
      <img className="circle-5-icon" alt="" src="/circle-3@2x.png" />
      <img
        className="carbonmicrophone-filled-icon"
        alt=""
        src="/carbonmicrophonefilled.svg"
      />
      <img
        className="e9a6b2c-9aa0-4ed8-a748-11b9f87-icon"
        alt=""
        src="/0e9a6b2c9aa04ed8a74811b9f8755fcd-2@2x.png"
      />
      <img
        className="e9a6b2c-9aa0-4ed8-a748-11b9f87-icon1"
        alt=""
        src="/0e9a6b2c9aa04ed8a74811b9f8755fcd-2@2x.png"
      />
      <img className="bix-octagon-fill-icon" alt="" src="/bixoctagonfill.svg" />
      <img
        className="carbonthumbs-up-filled-icon"
        alt=""
        src="/carbonthumbsupfilled.svg"
      />
      <img
        className="carbonthumbs-up-filled-icon1"
        alt=""
        src="/carbonthumbsupfilled.svg"
      />
      <img
        className="carbonthumbs-down-filled-icon"
        alt=""
        src="/carbonthumbsdownfilled.svg"
      />
      <img
        className="carbonthumbs-down-filled-icon1"
        alt=""
        src="/carbonthumbsdownfilled.svg"
      />
    </div>
  );
};

export default WSHomepage;
