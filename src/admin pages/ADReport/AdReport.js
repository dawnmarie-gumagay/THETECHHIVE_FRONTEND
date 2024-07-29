import React, { useEffect, useState } from "react";
import axios from "axios";
import IncomingReportText from "../../assets/image/reportsTitle.png";
import AdNavBar from "../../components/AdNavBar";
import AdReportContainer from "../../components/AdReportContainer";
import "./AdReport.css";

const AdReport = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reports/getAllReports');
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="main-container">
      <header>
        <AdNavBar />
      </header>
      <main className="entrysub-container">
        <img src={IncomingReportText} alt="Incoming Report" />
        <AdReportContainer entries={entries} />
      </main>
    </div>
  );
};

export default AdReport;
