import React, { useState } from "react";
import AdNavBar from "../../components/AdNavBar";
import "./AdHome.css";
import AdPost from "../../components/AdPost";
import AdPostContainer from "../../components/AdPostContainer";

const AdHome = () => {
  const [posts, setPosts] = useState([]);

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
