import React, { useState, useEffect } from "react";
import AdNavBar from "../../components/AdNavBar";
import "./AdHome.css";
import AdPost from "../../components/AdPost";
import AdPostContainer from "../../components/AdPostContainer";

const AdHome = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts from the backend when the component mounts
    fetch("http://localhost:8080/posts")
      .then(response => response.json())
      .then(data => {
        // Log the data to check its structure
        console.log("Fetched posts:", data);
        // Ensure data is an array
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      })
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="main-container">
      <header>
        <AdNavBar />
      </header>
      <main className="sub-container">
        <span className="wildcat-text">WILDCAT</span>
        <AdPost addPost={addPost} />
        <AdPostContainer posts={posts} />
      </main>
    </div>
  );
};

export default AdHome;
