import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Loadable from 'react-loadable';
import "./WSHomepage.css";

const WSComment = Loadable({
  loader: () => import('./WSComment'),
  loading: () => <div>Loading...</div>,
});

const WSHomepage = () => {
  const navigate = useNavigate();
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState([]); // State to store posts
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file

  const toggleOverlay = useCallback(() => {
    setOverlayVisible(!isOverlayVisible);
  }, [isOverlayVisible]);

  const onClose = useCallback(() => {
    setOverlayVisible(false);
  }, []);

  const onREPORTSClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onPROFILEClick = useCallback(() => {
    navigate("/wsprofile");
  }, [navigate]);

  const onLEADERBOARDSClick = useCallback(() => {
    navigate("/wsleaderboards");
  }, [navigate]);

  const handlePostInputChange = (e) => {
    setPostInput(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePostButtonClick = () => {
    if (!postInput && !selectedFile) {
      alert("Please enter a post or select a picture before submitting.");
      return;
    }
    setPosts([...posts, { username: "current.user", content: postInput, image: selectedFile }]);
    setPostInput("");
    setSelectedFile(null);
  };

  return (
    <div className="ws-homepage">
      <div className="WSNavbar" />
      <img className="WSTitle" alt="" src="/TITLE.png" />
      <b className="NHome">Home</b>
      <div className="NReports" onClick={onREPORTSClick}>
        Entry
      </div>
      <div className="NProfile" onClick={onPROFILEClick}>
        Profile
      </div>
      <div className="NLeaderboards" onClick={onLEADERBOARDSClick}>
        Leaderboards
      </div>

      <b className="HWildcat">WILDCAT</b>

      <div className="PostContainer" />
      <img className="users-dp" alt="" src="/dp.png" />

      <div className="post-input-container">
        <input
          type="text"
          className="post-input"
          value={postInput}
          onChange={handlePostInputChange}
          placeholder="What's happening in your day, Wildcat?"
        />
        <label htmlFor="file-upload">
          <img className="gallery-icon" alt="" src="/gallery.png" />
        </label>
        <input
          id="file-upload"
          type="file"
          className="file-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {selectedFile && (
          <div className="image-preview">
            <img alt="Preview" src={URL.createObjectURL(selectedFile)} style={{ width: '100px', height: '100px' }} />
          </div>
        )}
      </div>

      <img className="mic-icon" alt="" src="/mic.png" />

      <div className="post-container">
        <Button
          className="post-button"
          variant="contained"
          sx={{
            borderRadius: "10px",
            width: 60,
            height: 30,
            backgroundColor: "#8A252C",
            "&:hover": { backgroundColor: "#A91D3A" }
          }}
          onClick={handlePostButtonClick}
        >
          POST
        </Button>
      </div>

      {posts.map((post, index) => (
        <div key={index} className="EXPost-Box">
          <img className="EXUser-dp" alt="" src="/dp.png" />
          <div className="EXUser-Name">{post.username}</div>
          <div className="EXUser-Content">{post.content}</div>
          {post.image && <img className="EXUser-Image" alt="" src={URL.createObjectURL(post.image)} />}
        </div>
      ))}

      <div className="EXPost1-Box" />
      <img className="EXUser1-dp" alt="" src="/dp.png" />
      <div className="EXUser1-Name">richard.molina</div>
      <img className="EXUser1-badge" alt="" src="/Wildcat-Prowler.png" />
      <img className="EXUser1-verified" alt="" src="/check.png" />
      <div className="EXUser1-Incident-Container">
        <p className="EXUser1-Incident-Margin">
          <span className="IncidentType1">{`Incident Type: `}</span>
          <span>Medical Emergency</span>
        </p>
        <p className="EXUser1-Incident-Margin">
          <span className="IncidentLoc1">{`Incident Location: `}</span>
          <span>NGE Building</span>
        </p>
      </div>
      <img className="EXUser1-Incident-Picture" alt="" src="/ex.png" />
      <div className="EXUser1-line" />
      <img className="EXUser1-like" alt="" src="/t-up.png" />
      <img className="EXUser1-unlike" alt="" src="/t-down.png" />
      <b className="EXUser1-Comment" onClick={toggleOverlay}>Comment</b>

      <div className="EXPost2-Box" />
      <img className="EXUser2-dp" alt="" src="/dp.png" />
      <div className="EXUser2-Name">richard.molina</div>
      <img className="EXUser2-badge" alt="" src="/Wildcat-Prowler.png" />
      <img className="EXUser2-unverified" alt="" src="/x.png" />
      <div className="EXUser2-Incident-Container">
        <p className="EXUser2-Incident-Margin">
          <span className="IncidentType2">{`Incident Type: `}</span>
          <span>Medical Emergency</span>
        </p>
        <p className="EXUser2-Incident-Margin">
          <span className="IncidentLoc2">{`Incident Location: `}</span>
          <span className="nge-building">NGE Building</span>
        </p>
      </div>
      <img className="EXUser2-Incident-Picture" alt="" src="/ex.png" />
      <div className="EXUser2-line" />
      <img className="EXUser2-like" alt="" src="/t-up.png" />
      <img className="EXUser2-unlike" alt="" src="/t-down.png" />
      <b className="EXUser2-Comment" onClick={toggleOverlay}>Comment</b>

      {isOverlayVisible && (
        <div className="overlay" onClick={toggleOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <WSComment onClose={onClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WSHomepage;
