import React, { useState } from "react";
import "./AdEntryContainer.css";
import CitLogo from "../assets/image/CitLogo.png";
import ExampleImage from "../assets/image/ex.png";

function RespondModal({ onClose }) {
  const [isDenyClicked, setIsDenyClicked] = useState(false);
  const [reason, setReason] = useState("");

  const handleApprove = () => {
    // Handle approve logic here
    onClose(); // Close the modal after approval
  };

  const handleDeny = () => {
    setIsDenyClicked(true); // Show reason textarea
  };

  const handleSubmit = () => {
    // Handle submit logic here
    // For deny case, you can use `reason` state
    console.log("Reason:", reason);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>Back</button>
        <h2>Approval Decision</h2>
        <div className="button-group">
          <button className="approve-button" onClick={handleApprove}>Approve</button>
          <button className="deny-button" onClick={handleDeny}>Deny</button>
        </div>
        {isDenyClicked && (
          <div className="form-group">
            <label>Please state here the reason:</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please state here the reason"
              className="reason-textarea"
            />
          </div>
        )}
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

function EditCategoryModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>Back</button>
        <h2>Category</h2>
        <div className="radio-group">
          <label>
            <input type="radio" name="category" value="critical" />
            Critical Emergency
          </label>
          <label>
            <input type="radio" name="category" value="urgent" />
            Urgent Situation
          </label>
          <label>
            <input type="radio" name="category" value="general" />
            General Report
          </label>
        </div>
        <div className="form-group">
          <label>Incident Location:</label>
          <input type="text" value="NGE Building" readOnly className="readonly-input" />
        </div>
        <div className="form-group">
          <label>Office:</label>
          <select className="dropdown">
            <option>Clinic</option>
            <option>Student Success Office</option>
            <option>CIT-U SSG</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value="This is a sample description" readOnly className="readonly-textarea" />
        </div>
        <button className="confirm-button" onClick={onClose}>Confirm</button>
      </div>
    </div>
  );
}

export default function AdReportContainer() {
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);

  const handleOpenRespondModal = () => setIsRespondModalOpen(true);
  const handleCloseRespondModal = () => setIsRespondModalOpen(false);

  const handleOpenEditCategoryModal = () => setIsEditCategoryModalOpen(true);
  const handleCloseEditCategoryModal = () => setIsEditCategoryModalOpen(false);

  return (
    <div className="entrypost-card">
      <div className="entrycard-container">
        <div className="entryname-container">
          <img src={CitLogo} alt="Cit Logo" />
          <h5>Richard Molina</h5>
        </div>
        <div className="entry-details">
          <h5>Category: <span>Critical Emergency</span></h5>
          <h5>Incident Location: <span>NGE Building</span></h5>
          <h5>Office: <span>Clinic</span></h5>
        </div>
        <div className="image-description-container">
          <img src={ExampleImage} alt="Example" className="square-image" />
          <p className="description-text">This is a sample picture</p>
        </div>
        <div className="entryfooter-line" />
        <div className="footer-actions">
          <div className="button-container">
            <button className="respond-button" onClick={handleOpenRespondModal}>Respond</button>
            <button className="edit-button" onClick={handleOpenEditCategoryModal}>Edit</button>
          </div>
        </div>
      </div>
      {isRespondModalOpen && <RespondModal onClose={handleCloseRespondModal} />}
      {isEditCategoryModalOpen && <EditCategoryModal onClose={handleCloseEditCategoryModal} />}
    </div>
  );
}
