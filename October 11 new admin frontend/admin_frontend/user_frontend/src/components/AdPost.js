import React, { useState, useEffect } from "react";
import "./AdPost.css";
import CitLogo from "../assets/image/CitLogo.png";
import ImgLogo from "../assets/image/gallery.png";
import MicLogo from "../assets/image/mic.png";

const AdPost = ({ addPost }) => {
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Speech recognition not supported in this browser.");
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
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
      setCaption((prevCaption) => prevCaption + " " + transcript);
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { caption, image: imagePreview };
    addPost(newPost);
    setCaption("");
    setImagePreview("");
  };

  return (
    <div className="post-container">
      <div className="logo-container">
        <img src={CitLogo} alt="CIT logo" />
      </div>
      <div className="post-form">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="What's happening in your day, Wildcat?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="post-subcontainer">
            <div className="post-subcontainer-icons">
              <img
                src={ImgLogo}
                alt="Upload"
                onClick={() => document.getElementById('fileInput').click()}
              />
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <img
                src={MicLogo}
                alt="Mic"
                onClick={handleMicClick}
                style={{ cursor: "pointer" }}
              />
            </div>
            <button type="submit">POST</button>
          </div>
        </form>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdPost;
