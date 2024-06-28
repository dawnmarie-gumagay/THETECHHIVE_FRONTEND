import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

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
    setNewPostContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePostButtonClick = async () => {
    if (!newPostContent && !selectedFile) {
      alert("Please enter a post or select a picture before submitting.");
      return;
    }

    const newPost = {
      content: newPostContent,
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
      timestamp: new Date().toISOString(),
      userId: 1, // Replace with actual user ID
      isVerified: false,
      likes: 0,
      dislikes: 0,
    };

    try {
      const response = await axios.post("http://localhost:8080/posts/add", newPost);
      const newPostId = response.data.postId;
      newPost.postId = newPostId;
      setPosts([...posts, newPost]);
      setNewPostContent("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error posting data:", error);
    }
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
          value={newPostContent}
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

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.postId} className="post-box">
            <img src="/dp.png" alt="User Avatar" />
            <div className="user-details">
              <div className="user-name">User ID: {post.userId}</div>
              <div className="user-content">{post.content}</div>
              {post.image && <img className="post-image" alt="Post" src={post.image} />}
              <div className="likes-dislikes">
                <span>Likes: {post.likes}</span>
                <span>Dislikes: {post.dislikes}</span>
              </div>
            </div>
            <button className="comment-button" onClick={toggleOverlay}>Comment</button>
          </div>
        ))}
      </div>

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
