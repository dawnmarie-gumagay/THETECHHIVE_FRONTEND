import { Link } from 'react-router-dom';
import "./Logout.css";

const Logout = () => {
  return (
    <div className="admin-logout">
      <img className="bg-1-icon" alt="" src="/bg1.png" />
      <img className="bg-2-icon" alt="" src="/bg2.png" />
      <img className="title-icon" alt="" src="/TITLE.png" />

      <b className="prompt-message-container">
        <p className="message1">You have been logged out!</p>
      </b>
      <Link to="/login" className="login-link">
        <div className="message2">Click here to log in back again</div>
      </Link>
    </div>
  );
};

export default Logout;
