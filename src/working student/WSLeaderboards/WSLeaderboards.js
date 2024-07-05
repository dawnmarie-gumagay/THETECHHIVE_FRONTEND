import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./WSLeaderboards.css";

const WSLeaderboards = () => {
  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onREPORTSClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onPROFILEClick = useCallback(() => {
    navigate("/wsprofile");
  }, [navigate]);

  return (
    <div className="ws-leaderboards">
      <div className="WSNavbar" />
      <img className="WSTitle" alt="" src="/TITLE.png" />
      <div className="NHome" onClick={onHomeTextClick}>
        Home
      </div>
      <div className="NReports" onClick={onREPORTSClick}>
        Entry
      </div>
      <div className="NProfile" onClick={onPROFILEClick}>
        Profile
      </div>
      <b className="NLeaderboards">Leaderboard</b>

      <img className="LeaderboardsTitle" alt="" src="/WL.png" />
      <div className="WSLeaderboardsBox" />

      <img className="WSLUser1" alt="" src="/Wildcat-Champion.png" />
      <div className="WSLGradient1" />
      <div className="WSLNUser1">Dawn Marie Gumagay</div>
      <div className="WSLCircle1" />
      <div className="WSLUser1Points">4000</div>

      <img className="WSLUser2" alt="" src="/Wildcat-Prowler.png" />
      <div className="WSLGradient2" />
      <div className="WSLNUser2">Areej Charisse Corbete</div>
      <div className="WSLCircle2" />
      <div className="WSLUser2Points">500</div>

      <img className="WSLUser3" alt="" src="/Wildcat-Pub.png" />
      <div className="WSLGradient3" />
      <div className="WSLNUser3">Gelu Marie Ursal</div>
      <div className="WSLCircle3" />
      <div className="WSLUser3Points">200</div>
    </div>
  );
};

export default WSLeaderboards;