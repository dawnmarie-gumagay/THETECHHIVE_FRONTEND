import React, { useEffect, useState } from "react";
import "./AdEntryContainer.css";
import CitLogo from "../assets/image/CitLogo.png";
import ExampleImage from "../assets/image/ex.png";
import RespondDialog from "./RespondDialog";

const EntryPostCard = ({ entry }) => (
  <div className="entrypost-card">
    <div className="entrycard-container">
      <div className="entryname-container">
        <img src={CitLogo} alt="Cit Logo" />
        <h5>{entry.name}</h5>
      </div>
      <div className="entrycard-contents">
        <div className="entrytext-designs">
          <h5>
            Incident Type: <span>{entry.type}</span>
          </h5>
          <h5>
            Level of Incident: <span>{entry.level}</span>
          </h5>
        </div>
        <img src={entry.photoUrl || ExampleImage} alt="Incident" />
      </div>
      <div className="footer-line" />
      <div className="footer-actions">
        <RespondDialog />
      </div>
    </div>
  </div>
);

const AdReportContainer = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend
    fetch("http://localhost:5000/wsreport")
      .then(response => response.json())
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ad-report">
      <h2>Admin Report Dashboard</h2>
      <div className="report-list">
        {entries.length ? (
          entries.map((entry) => (
            <EntryPostCard key={entry.entry_id} entry={entry} />
          ))
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default AdReportContainer;
