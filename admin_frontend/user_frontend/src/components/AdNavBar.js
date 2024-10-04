import { useState } from "react";
import TapIcon from "../assets/image/TITLE.png";
import "./AdNavbar.css";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className={`navbar ${showNavbar ? "active" : ""}`}>
      <div className="logo">
        <img src={TapIcon} alt="Title logo" />
      </div>
      <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
        <ul>
          <li>
            <a href="/adhome">Home</a>
          </li>
          <li>
            <a href="/adreport">Report</a>
          </li>
          <li>
            <a href="/adleaderboard">Leaderboard</a>
          </li>
          <li>
            <a href="/adprofile">Profile</a>
          </li>
        </ul>
      </div>
      <div className="menu-icon" onClick={handleShowNavbar}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
