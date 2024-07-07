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
<<<<<<< Updated upstream
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState([]); // State to store posts
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
=======
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentsDialogOpen, setIsCommentsDialogOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    setPosts([...posts, { username: "current.user", content: postInput, image: selectedFile }]);
    setPostInput("");
    setSelectedFile(null);
=======

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

    try {
      const response = await axios.post("http://localhost:8080/posts/add", newPost);
      setPosts([response.data, ...posts]);
      setNewPostContent("");
      setSelectedFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error posting data:", error);
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
      setIsCommentsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCloseComments = () => {
    setIsCommentsDialogOpen(false);
    setCurrentPostId(null);
    setComments([]);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.postId} className="post-card">
            <div className="card-container">
              <div className="name-container">
                <img src="/dp.png" alt="User Avatar" />
                <h5>{post.fullName} ({post.idNumber})</h5>
              </div>
              <div className="card-contents">
                <p>{post.content}</p>
                {post.image && <img className="post-image" alt="Post" src={post.image} />}
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
>>>>>>> Stashed changes
          </div>
        )}
      </div>

<<<<<<< Updated upstream
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
=======
      <Dialog open={isCommentsDialogOpen} onClose={handleCloseComments}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              {comment.userId === loggedInUser?.userId && (
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseComments}>Close</Button>
        </DialogActions>
      </Dialog>
>>>>>>> Stashed changes

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