import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Loadable from 'react-loadable';
import moment from 'moment';
import SUNavBar from "../../components/SUNavBar";
import "./SUHome.css";

const SUComment = Loadable({
    loader: () => import('./SUComment'),
    loading: () => <div>Loading...</div>,
});

const SUHome = () => {
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
  const [loggedInSuperUser, setLoggedInSuperUser] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
  const [isDeleteCommentDialogOpen, setIsDeleteCommentDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // State to hold profile picture
  const [superuserProfilePictures, setSuperUserProfilePictures] = useState({});
  const defaultProfile = '/dp.png'; // Path to the default profile picture
  const [inputHasContent, setInputHasContent] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchLoggedInSuperUser = async () => {
        const storedSuperUser = JSON.parse(localStorage.getItem("loggedInSuperUser"));
        if (storedSuperUser && storedSuperUser.superusername) {
            try {
                const response = await axios.get(`http://localhost:8080/superuser/getBySuperUsername?superusername=${storedSuperUser.superusername}`);
                setLoggedInSuperUser(response.data);
                console.log("Fetch superuser data:", response.data);
            } catch (error) {
                console.error("Error fetching superuser data:", error);
            }
        }
    };
    fetchLoggedInSuperUser();
  }, []);

  const fetchSuperUserProfilePicture = useCallback(async (superuserId) => {
    try {
        const response = await fetch(`http://localhost:8080/superuser/profile/getProfilePicture/${superuserId}`);
        if (response.ok) {
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setSuperUserProfilePictures(prev => ({ ...prev, [superuserId]: imageUrl }));
        } else {
            setSuperUserProfilePictures(prev => ({ ...prev, [superuserId]: defaultProfile }));
        }
    } catch (error) {
        console.error('Failed to fetch superuser profile picture:', error);
        setSuperUserProfilePictures(prev => ({ ...prev, [superuserId]: defaultProfile }));
    }
  }, []);

  useEffect(() => {
    const fetchPostsandPictures = async () => {
        try {
            const response = await axios.get("http://localhost:8080/posts");
            console.log("Fetched posts data:", response.data);
            const sortedPosts = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setPosts(sortedPosts);

            const superuserIds = new Set(sortedPosts.map(post => post.superuserId));
            superuserIds.forEach(superuserId => fetchSuperUserProfilePicture(superuserId));
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    fetchPostsandPictures();
  }, [fetchSuperUserProfilePicture]);

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
            setCurrentPostOwner(postResponse.data.superuserId);

            const commentSuperUserIds = new Set(sortedComments.map(comment => comment.superuserId));
          commentSuperUserIds.forEach(superuserId => fetchSuperUserProfilePicture(superuserId));
        } catch (error) {
          console.error("Error fetching comments or post details:", error);
        }
      };
      fetchCommentsAndPictures();
    }
  }, [currentPostId, fetchSuperUserProfilePicture]);

  const fetchLoggedInSuperUsers = useCallback(() => {
    const superuser = JSON.parse(localStorage.getItem("loggedInSuperUser")) || null;
    setLoggedInSuperUser(superuser);
    return superuser;
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        console.log("Fetched posts data:", response.data); // Log fetched posts data
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
    navigate("/adentry");
  }, [navigate]);

  const onPROFILEClick = useCallback(() => {
    navigate("/adprofile");
  }, [navigate]);

  const onLEADERBOARDSClick = useCallback(() => {
    navigate("/adleaderboard");
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
  const fetchProfilePicture = useCallback(async (superuserId) => {
    try {
      const response = await fetch(`http://localhost:8080/superuser/profile/getProfilePicture/${superuserId}`);
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

  useEffect(() => {
    const superuser = fetchLoggedInSuperUsers();
    if (superuser) {
      fetchProfilePicture(superuser.superuserId);
    }
  }, [fetchLoggedInSuperUsers, fetchProfilePicture]);

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

    if (!loggedInSuperUser) {
      alert("Please log in to post.");
      return;
    }

    const newPost = {
      content: newPostContent,
      image: imagePreview,
      superuserId: loggedInSuperUser.superuserId,
      fullName: loggedInSuperUser.fullName,
      idNumber: loggedInSuperUser.superuseridNumber,
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
      setShowCloseButton(false);
    } catch (error) {
      console.error("Error posting data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  const handleLike = async (postId) => {
    if (!loggedInSuperUser) {
      alert("Please log in to like posts.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/posts/${postId}/like?superuserId=${loggedInSuperUser.superuserId}`);
      const updatedPost = response.data;
      setPosts(posts.map(post =>
        post.postId === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async (postId) => {
    if (!loggedInSuperUser) {
      alert("Please log in to dislike posts.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/posts/${postId}/dislike?superuserId=${loggedInSuperUser.superuserId}`);
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
      setCurrentPostOwner(postResponse.data.superuserId);
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
      postId: currentPostId,
      superuserId: loggedInSuperUser.superuserId,
      fullName: loggedInSuperUser.fullName,
      superuseridNumber: loggedInSuperUser.superuseridNumber,
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
    if (!loggedInSuperUser) {
      alert("Please log in to delete posts.");
      return;
    }
    setItemToDelete(postId);
    setIsDeletePostDialogOpen(true);
  };

  const handleDeleteComment = (commentId, commentSuperUserId) => {
    if (!loggedInSuperUser) {
      alert("Please log in to delete comments.");
      return;
    }
    if (loggedInSuperUser.superuserId === commentSuperUserId || loggedInSuperUser.superuserId === currentPostOwner) {
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
          superuserId: loggedInSuperUser.superuserId
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

  return (
    <div className="adhome">
      <SUNavBar />  
      <b className="HWildcat">WILDCAT</b> {/* Add Wildcat element here */}

      <div className="content-wrapper">
        <div className="post-container">
          <div className="logo-container">
            <img src={profilePicture || defaultProfile} alt="SuperUser Avatar" className="superusers-dp" />
          </div>
          <div className="post-form">
            <form onSubmit={handlePostSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  className="post-input"
                  value={newPostContent}
                  onChange={handlePostInputChange}
                  placeholder="What's happening in your day, Wildcat?"
                />
                {showCloseButton && (
                  <button type="button" className="close-button" onClick={handleClosePost}>
                    ×
                  </button>
                )}
              </div>
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
                  <img src={superuserProfilePictures[post.superuserId] || defaultProfile} alt="SuperUser Avatar" />
                  <h5>{post.fullName} ({post.superuseridNumber})</h5>
                  {loggedInSuperUser && loggedInSuperUser.superuserId === post.superuserId && (
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
                      className={`like-button ${post.likedBy.includes(loggedInSuperUser?.superuserId) ? 'active' : ''}`}
                    >
                      <img src="/t-up.png" alt="Thumbs Up" /> {post.likes}
                    </button>
                    <button 
                      onClick={() => handleDislike(post.postId)} 
                      className={`dislike-button ${post.dislikedBy.includes(loggedInSuperUser?.superuserId) ? 'active' : ''}`}
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
                <div className="superuser-info-container">
                  <span className="superuser-info">
                    {comment.fullName} ({comment.superuseridNumber})
                  </span>
                  {(loggedInSuperUser && (loggedInSuperUser.superuserId === comment.superuserId || loggedInSuperUser.superuserId === currentPostOwner)) && (
                    <img
                      src="/delete.png"
                      alt="Delete"
                      className="delete-icon"
                      onClick={() => handleDeleteComment(comment.commentId, comment.superuserId)}
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

export default SUHome;