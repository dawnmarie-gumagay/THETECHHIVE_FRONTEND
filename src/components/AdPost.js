import React from "react";
import "./AdPost.css";
import CitLogo from "../assets/image/CitLogo.png";
import ImgLogo from "../assets/image/gallery.png";
import MicLogo from "../assets/image/mic.png";

const AdPost = () => {
  return (
    <div className="post-container">
      <div className="logo-container">
        <img src={CitLogo} alt="Cit Logo" />
      </div>
      <div className="post-form">
        <form>
          <input placeholder="What's happening in your day, Wildcat?'" />
          <div className="post-subcontainer ">
            <div className="post-subcontainer-icons">
              <img src={ImgLogo} alt="image icon" />
              <img src={MicLogo} alt="mic icon" />
            </div>
            <button>POST</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdPost;
