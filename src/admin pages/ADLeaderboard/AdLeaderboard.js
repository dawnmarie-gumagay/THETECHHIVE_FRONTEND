import React from "react";
import AdNavBar from "../../components/AdNavBar";
import LeaderBoardText from "../../assets/image/leaderboardtext.png";
import "./AdLeaderboard.css";
import LeaderboardNameContainer from "../../components/LeaderboardNameContainer";

const AdLeaderboard = () => {
  return (
    <div className="main-container">
      <header>
        <AdNavBar />
      </header>
      <main className="sub-container">
        <img src={LeaderBoardText}  alt="leaderboardtext"/>
        <div className="leaderboard-container">
          <LeaderboardNameContainer />
        </div>
      </main>
    </div>
  );
};

export default AdLeaderboard;
