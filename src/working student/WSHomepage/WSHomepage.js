import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (storedUser && storedUser.username) {
        try {
          const response = await axios.get(`http://localhost:8080/user/getByUsername?username=${storedUser.username}`);
          setLoggedInUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchLoggedInUser();
  }, []);

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

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Speech recognition not supported in this browser.");
    }
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
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewPostContent((prevContent) => prevContent + " " + transcript);
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPostContent && !imagePreview) {
      alert("Please enter a post or select a picture before submitting.");
      return;
    }
    
    if (!loggedInUser) {
      alert("Please log in to post.");
      return;
    }

    const newPost = {
      content: newPostContent,
      image: imagePreview,
      timestamp: new Date().toISOString(),
      userId: loggedInUser.userId,
      fullName: loggedInUser.fullName,
      idNumber: loggedInUser.idNumber,
      isVerified: false,
      likes: 0,
      dislikes: 0,
    };
  
    console.log("Attempting to post:", newPost);

    try {
      const response = await axios.post("http://localhost:8080/posts/add", newPost, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Post response:", response.data);
      setPosts([response.data, ...posts]);
      setNewPostContent("");
      setSelectedFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error posting data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/like`);
      setPosts(posts.map(post => 
        post.postId === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/dislike`);
      setPosts(posts.map(post => 
        post.postId === postId ? { ...post, dislikes: post.dislikes + 1 } : post
      ));
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleOpenComments = async (postId) => {
    setCurrentPostId(postId);
    try {
      const response = await axios.get(`http://localhost:8080/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setIsCommentDialogOpen(true);
  };
  

  const handleCloseComments = () => {
    setIsCommentDialogOpen(false);
    setCurrentPostId(null);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    
    const comment = {
      content: newComment,
      userId: loggedInUser.userId,
      fullName: loggedInUser.fullName,
      idNumber: loggedInUser.idNumber,
    };
    
    try {
      const response = await axios.post(`http://localhost:8080/posts/${currentPostId}/comments`, comment);
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleDeletePost = async (postId) => {
    if (!loggedInUser) {
      alert("Please log in to delete posts.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/posts/${postId}`);
      setPosts(posts.filter(post => post.postId !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        Leaderboard
      </div>

      <b className="HWildcat">WILDCAT</b>

      <div className="post-container">
        <div className="logo-container">
          <img src="/dp.png" alt="User Avatar" className="users-dp" />
        </div>
        <div className="post-form">
          <form onSubmit={handlePostSubmit}>
            <input
              type="text"
              className="post-input"
              value={newPostContent}
              onChange={handlePostInputChange}
              placeholder="What's happening in your day, Wildcat?"
            />
            <div className="post-subcontainer">
              <div className="post-subcontainer-icons">
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
                <img
                  className="mic-icon"
                  alt="Mic"
                  src="/mic.png"
                  onClick={handleMicClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Button
                type="submit"
                className="post-button"
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  width: 60,
                  height: 30,
                  backgroundColor: "#8A252C",
                  "&:hover": { backgroundColor: "#A91D3A" }
                }}
              >
                POST
              </Button>
            </div>
          </form>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
        </div>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.postId} className="post-card">
            <div className="card-container">
              <div className="name-container">
                <img src="/dp.png" alt="User Avatar" />
                <h5>{post.fullName} ({post.idNumber})</h5>
                {loggedInUser && loggedInUser.userId === post.userId && (
                  <img
                    src="/delete.png"
                    alt="Delete"
                    className="delete-icon"
                    onClick={() => handleDeletePost(post.postId)}
                    style={{ cursor: 'pointer', width: '20px', height: '20px', marginLeft: 'auto' }}
                  />
                )}
              </div>
              <div className="timestamp">
                {formatTimestamp(post.timestamp)}
              </div>
              <div className="card-contents">
                <p>{post.content}</p>
                {post.image && (
                  <img
                    className="post-image"
                    alt="Post"
                    src={post.image}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}
              </div>
              <div className="footer-line" />
              <div className="footer-actions">
                <div className="footer-icons">
                  <button onClick={() => handleLike(post.postId)} className="like-button">
                    <img src="/t-up.png" alt="Thumbs Up" /> {post.likes}
                  </button>
                  <button onClick={() => handleDislike(post.postId)} className="dislike-button">
                    <img src="/t-down.png" alt="Thumbs Down" /> {post.dislikes}
                  </button>
                </div>
                <div className="footer-comments">
                  <button className="comment-button" onClick={() => handleOpenComments(post.postId)}>Comment</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isCommentDialogOpen} onClose={handleCloseComments}>
        <DialogTitle>
          Comments
          <Button onClick={handleCloseComments} style={{ position: 'absolute', right: 8, top: 8 }}>
            X
          </Button>
        </DialogTitle>
        <DialogContent>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <span className="user-info">{comment.fullName} ({comment.idNumber})</span>
              <p>{comment.content}</p>
              {loggedInUser && loggedInUser.userId === currentPostId && (
                <Button onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>Comment</Button>
        </DialogActions>
      </Dialog>

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