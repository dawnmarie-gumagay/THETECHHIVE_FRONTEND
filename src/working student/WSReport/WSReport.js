import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./WSReport.css";

const WSReport = () => {
  const navigate = useNavigate();

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
        />
      </div>
    </>
  );
};

export default WSReport;
