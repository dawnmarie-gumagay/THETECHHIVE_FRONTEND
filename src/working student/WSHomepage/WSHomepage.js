import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend when the component mounts
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
    setPostInput(e.target.value);
  };

  const handlePostButtonClick = async () => {
    if (!postInput) {
      alert("Please enter a post before submitting.");
      return;
    }

    const newPost = {
      content: postInput,
      timestamp: new Date().toISOString(),
      userId: 1, // Replace with actual user ID
      isVerified: false,
      likes: 0,
      dislikes: 0,
    };

    try {
      await axios.post("http://localhost:8080/posts/add", newPost);
      // Fetch the latest posts
      const response = await axios.get("http://localhost:8080/posts");
      setPosts(response.data);
      setPostInput("");
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

      <input
        type="text"
        className="post-input"
        value={postInput}
        onChange={handlePostInputChange}
        placeholder="What's happening in your day, Wildcat?"
      />

      <img className="gallery-icon" alt="" src="/gallery.png" />
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

      {posts.map((post) => (
        <div key={post.postId} className="EXPost-Box">
          <img className="EXUser-dp" alt="" src="/dp.png" />
          <div className="EXUser-Name">User ID: {post.userId}</div>
          <div className="EXUser-Content">{post.content}</div>
          <div>Likes: {post.likes}</div>
          <div>Dislikes: {post.dislikes}</div>
          <b className="EXUser-Comment" onClick={toggleOverlay}>Comment</b>
        </div>
      ))}

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
