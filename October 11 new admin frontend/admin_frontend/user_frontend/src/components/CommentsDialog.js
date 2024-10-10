import React, { useRef } from "react";
import Modal from "react-modal";
import CloseIcon from "../assets/image/x.png";
import "./CommentsDialog.css";

const CommentsDialog = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const subtitleRef = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="comments-container">
      <button onClick={openModal}>Comments</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="closebtn-design">
          <img src={CloseIcon} alt="Close" />
        </button>
        <div ref={subtitleRef}></div>
        <div className="comment-container">
            <h4>Richard.Molina</h4>
            <p>is this true?</p>
        </div>
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundImage:
      "linear-gradient(0deg, hsl(43deg 91% 73%) 0%, hsl(49deg 88% 80%) 50%, hsl(58deg 93% 89%) 100%)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};

export default CommentsDialog;
