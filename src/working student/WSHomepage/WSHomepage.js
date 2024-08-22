import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Loadable from 'react-loadable';
import moment from 'moment';
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
  const [currentPostOwner, setCurrentPostOwner] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
  const [isDeleteCommentDialogOpen, setIsDeleteCommentDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // State to hold profile picture
  const [userProfilePictures, setUserProfilePictures] = useState({});
  const defaultProfile = '/dp.png'; // Path to the default profile picture

  const [inputHasContent, setInputHasContent] = useState(false);

  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

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

  const fetchUserProfilePicture = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/profile/getProfilePicture/${userId}`);
      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setUserProfilePictures(prev => ({ ...prev, [userId]: imageUrl }));
      } else {
        setUserProfilePictures(prev => ({ ...prev, [userId]: defaultProfile }));
      }
    } catch (error) {
      console.error('Failed to fetch user profile picture:', error);
      setUserProfilePictures(prev => ({ ...prev, [userId]: defaultProfile }));
    }
  }, []);

  useEffect(() => {
    const fetchPostsAndPictures = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        const sortedPosts = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sortedPosts);
  
        // Fetch profile pictures for each post owner
        const userIds = new Set(sortedPosts.map(post => post.userId));
        userIds.forEach(userId => fetchUserProfilePicture(userId));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPostsAndPictures();
  }, [fetchUserProfilePicture]);
  
  useEffect(() => {
    if (currentPostId) {
      const fetchCommentsAndPictures = async () => {
        try {
          const [commentsResponse, postResponse] = await Promise.all([
            axios.get(`http://localhost:8080/comments/${currentPostId}`),
            axios.get(`http://localhost:8080/posts/${currentPostId}`)
          ]);
          const sortedComments = commentsResponse.data
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(comment => ({
              ...comment,
              relativeTime: moment(comment.timestamp).fromNow()
            }));
          setComments(sortedComments);
          setCurrentPostOwner(postResponse.data.userId);
  
          // Fetch profile pictures for each comment owner
          const commentUserIds = new Set(sortedComments.map(comment => comment.userId));
          commentUserIds.forEach(userId => fetchUserProfilePicture(userId));
        } catch (error) {
          console.error("Error fetching comments or post details:", error);
        }
      };
      fetchCommentsAndPictures();
    }
  }, [currentPostId, fetchUserProfilePicture]);  
  

  const fetchLoggedInUsers = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    setLoggedInUser(user);
    return user;
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        const sortedPosts = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sortedPosts);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setComments(prevComments => 
        prevComments
          .map(comment => ({
            ...comment,
            relativeTime: moment(comment.timestamp).fromNow()
          }))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      );
    }, 60000);
    return () => clearInterval(timer);
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
    const content = e.target.value;
    setNewPostContent(content);
    setShowCloseButton(content.length > 0 || imagePreview !== null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShowCloseButton(true);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to fetch profile picture
  const fetchProfilePicture = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/profile/getProfilePicture/${userId}`);
      if (response.ok) {
        const imageBlob = await response.blob();
        if (imageBlob.size > 0) {
          const imageUrl = URL.createObjectURL(imageBlob);
          setProfilePicture(imageUrl);
        } else {
          setProfilePicture(defaultProfile);
        }
      } else {
        setProfilePicture(defaultProfile);
      }
    } catch (error) {
      console.error('Failed to fetch profile picture:', error);
      setProfilePicture(defaultProfile);
    }
  }, [defaultProfile]);
  

  // Fetch logged in user data and profile picture on component mount
  useEffect(() => {
    const user = fetchLoggedInUsers();
    if (user) {
      fetchProfilePicture(user.userId);
    }
  }, [fetchLoggedInUsers, fetchProfilePicture]); 

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
      userId: loggedInUser.userId,
      fullName: loggedInUser.fullName,
      idNumber: loggedInUser.idNumber,
      isVerified: false,
      likes: 0,
      dislikes: 0,
    };
  
    try {
      const response = await axios.post("http://localhost:8080/posts/add", newPost, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setPosts(prevPosts => [response.data, ...prevPosts]);
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
    if (!loggedInUser) {
      alert("Please log in to like posts.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/posts/${postId}/like?userId=${loggedInUser.userId}`);
      const updatedPost = response.data;
      setPosts(posts.map(post => 
        post.postId === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  
  const handleDislike = async (postId) => {
    if (!loggedInUser) {
      alert("Please log in to dislike posts.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/posts/${postId}/dislike?userId=${loggedInUser.userId}`);
      const updatedPost = response.data;
      setPosts(posts.map(post => 
        post.postId === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleOpenComments = async (postId) => {
    setCurrentPostId(postId);
    try {
      const [commentsResponse, postResponse] = await Promise.all([
        axios.get(`http://localhost:8080/comments/${postId}`),
        axios.get(`http://localhost:8080/posts/${postId}`)
      ]);
      const sortedComments = commentsResponse.data
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .map(comment => ({
          ...comment,
          relativeTime: moment(comment.timestamp).fromNow()
        }));
      setComments(sortedComments);
      setCurrentPostOwner(postResponse.data.userId);
    } catch (error) {
      console.error("Error fetching comments or post details:", error);
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
      postId: currentPostId,  // Add this line
      userId: loggedInUser.userId,
      fullName: loggedInUser.fullName,
      idNumber: loggedInUser.idNumber,
    };
    
    try {
      const response = await axios.post('http://localhost:8080/comments/add', comment);
      const newCommentWithRelativeTime = {
        ...response.data,
        relativeTime: moment(response.data.timestamp).fromNow()
      };
      setComments(prevComments => [newCommentWithRelativeTime, ...prevComments]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  const handleDeletePost = (postId) => {
    if (!loggedInUser) {
      alert("Please log in to delete posts.");
      return;
    }
    setItemToDelete(postId);
    setIsDeletePostDialogOpen(true);
  };

  const handleDeleteComment = (commentId, commentUserId) => {
    if (!loggedInUser) {
      alert("Please log in to delete comments.");
      return;
    }
    if (loggedInUser.userId === commentUserId || loggedInUser.userId === currentPostOwner) {
      setItemToDelete(commentId);
      setIsDeleteCommentDialogOpen(true);
    } else {
      alert("You don't have permission to delete this comment.");
    }
  };

  const confirmDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${itemToDelete}`);
      setPosts(posts.filter(post => post.postId !== itemToDelete));
      setIsDeletePostDialogOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const confirmDeleteComment = async () => {
    try {
      await axios.delete(`http://localhost:8080/comments/${itemToDelete}`, {
        params: {
          userId: loggedInUser.userId
        }
      });
      setComments(comments.filter(comment => comment.commentId !== itemToDelete));
      setIsDeleteCommentDialogOpen(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. You may not have permission.");
    }
  };

  const formatTimestamp = (timestamp) => {
    const momentDate = moment(timestamp);
    return momentDate.format('dddd, MMMM D, YYYY [at] h:mm A');
  };

  const getRelativeTime = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  const handleClosePost = () => {
    setNewPostContent('');
    setImagePreview(null);
    setShowCloseButton(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
  };

  const fileInputRef = useRef(null);

  return (
    <div className="ws-homepage">
      <div className="WSNavbar" />
      <img className="WSTitle" alt="" src="/TITLE.png" />
      <b className="NHome">Home</b>
      <div className="NReports" onClick={onREPORTSClick}>
        Report
      </div>
      <div className="NProfile" onClick={onPROFILEClick}>
        Profile
      </div>
      <div className="NLeaderboards" onClick={onLEADERBOARDSClick}>
        Leaderboard
      </div>
      <b className="HWildcat">WILDCAT</b>
      
      <div className="content-wrapper">
      <div className="post-container">
        <div className="post-header">
          {showCloseButton && (
              <button className="close-button" onClick={handleClosePost}>
                ×
              </button>
          )}
        </div>
        <div className="logo-container">
          <img src={profilePicture || defaultProfile} alt="User Avatar" className="users-dp" />
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
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  className="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  onClick={(e) => { e.target.value = null }}
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
                <img src={userProfilePictures[post.userId] || defaultProfile} alt="User Avatar" />
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
                  <span className="formatted-date">{formatTimestamp(post.timestamp)}</span>
                  <br />
                  <span className="relative-time">{getRelativeTime(post.timestamp)}</span>
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
                  <button 
                    onClick={() => handleLike(post.postId)} 
                    className={`like-button ${post.likedBy.includes(loggedInUser?.userId) ? 'active' : ''}`}
                  >
                    <img src="/t-up.png" alt="Thumbs Up" /> {post.likes}
                  </button>
                  <button 
                    onClick={() => handleDislike(post.postId)} 
                    className={`dislike-button ${post.dislikedBy.includes(loggedInUser?.userId) ? 'active' : ''}`}
                  >
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
      </div>

      <Dialog open={isCommentDialogOpen} onClose={handleCloseComments}>
        <DialogTitle>
          Comments
          <img
            src="/exit.png"
            alt="Close"
            className="exit-icon"
            onClick={handleCloseComments}
          />
        </DialogTitle>
        <DialogContent>
          {comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              <div className="comment-header">
                <div className="user-info-container">
                  <span className="user-info">
                    {comment.fullName} ({comment.idNumber})
                  </span>
                  {(loggedInUser && (loggedInUser.userId === comment.userId || loggedInUser.userId === currentPostOwner)) && (
                    <img
                      src="/delete.png"
                      alt="Delete"
                      className="delete-icon"
                      onClick={() => handleDeleteComment(comment.commentId, comment.userId)}
                    />
                  )}
                </div>
                <div className="timestamp-container">
                  <span className="formatted-time">
                    {formatTimestamp(comment.timestamp)}
                  </span>
                  <span className="relative-time">
                    {comment.relativeTime}
                  </span>
                </div>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <div className="add-comment" style={{ display: 'flex', width: '100%', padding: '10px' }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{ 
                flexGrow: 1, 
                marginRight: '10px', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }}
            />
            <Button 
              onClick={handleAddComment}
              variant="contained"
              sx={{ 
                backgroundColor: '#8A252C', 
                color: 'white',
                '&:hover': {
                  backgroundColor: '#f9d67b',
                  color: 'black'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Comment
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeletePostDialogOpen} onClose={() => setIsDeletePostDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions className="delete-dialog-actions">
          <Button onClick={() => setIsDeletePostDialogOpen(false)} className="cancel-button">Cancel</Button>
          <Button onClick={confirmDeletePost} className="delete-button">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteCommentDialogOpen} onClose={() => setIsDeleteCommentDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this comment?
        </DialogContent>
        <DialogActions className="delete-dialog-actions">
          <Button onClick={() => setIsDeleteCommentDialogOpen(false)} className="cancel-button">Cancel</Button>
          <Button onClick={confirmDeleteComment} className="delete-button">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WSHomepage;