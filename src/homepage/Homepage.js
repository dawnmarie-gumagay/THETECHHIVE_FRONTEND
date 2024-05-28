import { Link } from 'react-router-dom';
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="admin-homepage">
      <div className="navbar" />
      <Link to="/homepage" className="nav-link">
        <b className="home">Home</b>
      </Link>
      <Link to="/reports" className="nav-link">
        <div className="reports">Reports</div>
      </Link>
      <Link to="/adminprofile" className="nav-link">
        <div className="profile">Profile</div>
      </Link>
      <img className="navbar-icon" alt="" src="/TITLE.png" />
      <img className="homepage-title" alt="" src="/homepageTitle.png" />
      <div className="postbox" />
      <div className="post2" />
      <div className="post3" />
      <img className="line-icon" alt="" src="/line-8.svg" />

      <div className="post4" />
      <div className="post5" />
      <div className="post6" />

      
      <div className="InfoBox">
        <img className="dp-icon" alt="" src="/dp.png" />
        <div className="users-name">richard.molina</div>
        <div className="incident-type-container">
          <p className="incident-type-medical">
            Incident Type: Medical Emergency
          </p>
          <p className="incident-type-medical">
            Incident Location: NGE Building
          </p>
          <p className="needed-office-clinic">Needed Office: Clinic</p>
        </div>
        <img
          className="example-pic"
          alt=""
          src="/ex.png"
        />
        
        <div className="line-black" />
        <img className="heart-icon" alt="" src="/heart.png" />
        <img className="like-icon" alt="" src="/like.png" />
        <div className="like-comment-office-container">
          Like
          <span className="span">{` `}</span>Comment
          <span className="span">{` `}</span>Office Feedback
        </div>
      </div>
    </div>
  );
};

export default Homepage;
