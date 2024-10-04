import React from "react";
import "./AdContainer.css";
import CitLogo from "../assets/image/CitLogo.png";
import ThumbsUp from "../assets/image/t-up.png";
import ThumbsDown from "../assets/image/t-down.png";
import CommentsDialog from "./CommentsDialog";

const AdPostContainer = ({ posts }) => {
  return (
    <div className="post-containerr">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="card-container">
            <div className="name-container">
              <img src={CitLogo} alt="CIT logo" />
              <h5>CIT-University</h5>
            </div>
            <div className="card-contents">
              <p>{post.caption}</p>
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
            </div>
            <div className="footer-line" />
            <div className="footer-actions">
              <div className="footer-icons">
                <button>
                  <img src={ThumbsUp} alt="Thumbs Up" />
                </button>
                <button>
                  <img src={ThumbsDown} alt="Thumbs Down" />
                </button>
              </div>
              <div className="footer-comments">
                <CommentsDialog />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdPostContainer;
