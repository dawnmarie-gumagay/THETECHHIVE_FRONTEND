import React from "react";
import "./AdContainer.css"
import CitLogo from "../assets/image/CitLogo.png";
import CheckIcon from "../assets/image/check.png";
import ExampleImage from "../assets/image/ex.png";
import ThumbsUp from "../assets/image/t-up.png";
import ThumbsDown from "../assets/image/t-down.png";
import CommentsDialog from "./CommentsDialog";
import "./AdContainer.css"
import ExIcon from "../assets/image/x.png"

const AdPostContainer = () => {
  return (
    <div className="post-card">
      <div className="card-container">
        <div className="name-container">
          <img src={CitLogo} alt="Cit Logo" />
          <h5>Richard Molina</h5>
          <div className="status-container">
            <img src={CheckIcon} />
          </div>
        </div>
        <div className="card-contents">
          <div className="text-designs">
            <h5>
              Incident Type: <span>Medical Emergency</span>
            </h5>
            <h5>
              Incident Location: <span>NGE Building</span>
            </h5>
          </div>
          <img src={ExampleImage} />
        </div>
        <div className="footer-line" />
        <div className="footer-actions">
          <div className="footer-icons">
            <button>
              <img src={ThumbsUp} />
            </button>
            <button>
              <img src={ThumbsDown} />
            </button>
          </div>
          <div className="footer-comments">
            <CommentsDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPostContainer;
