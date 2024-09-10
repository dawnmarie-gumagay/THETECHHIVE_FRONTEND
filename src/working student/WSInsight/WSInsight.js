import React from 'react';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './WSInsight.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Physical Accident',
      data: [20, 80, 30, 40, 50, 30, 20, 30, 50, 20, 10, 30],
      backgroundColor: '#E74C3C',
      stack: 'Stack 0',
    },
    {
      label: 'Laboratory Accident',
      data: [10, 60, 20, 50, 30, 60, 40, 50, 60, 10, 40, 30],
      backgroundColor: '#F39C12',
      stack: 'Stack 0',
    },
    {
      label: 'Vehicle Accident',
      data: [30, 50, 40, 60, 40, 50, 60, 20, 40, 30, 20, 50],
      backgroundColor: '#27AE60',
      stack: 'Stack 0',
    },
    {
      label: 'Health-Related Accident',
      data: [40, 70, 50, 20, 60, 40, 70, 30, 60, 50, 30, 40],
      backgroundColor: '#2980B9',
      stack: 'Stack 0',
    },
    {
      label: 'Event',
      data: [50, 40, 60, 30, 70, 50, 30, 40, 30, 40, 50, 60],
      backgroundColor: '#8E44AD',
      stack: 'Stack 0',
    }
  ],
};

const pieData = {
  labels: ['Approved', 'Denied'],
  datasets: [
    {
      label: 'Report Status',
      data: [300, 100],  // Adjust this to your actual data
      backgroundColor: ['#F1C40F', '#C0392B'],
      hoverBackgroundColor: ['#F39C12', '#E74C3C']
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Accident & Event Stats',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
};

const WSInsight = () => {
  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onREPORTSClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onLEADERBOARDSClick = useCallback(() => {
    navigate("/wsleaderboards");
  }, [navigate]);

  const onPROFILEClick = useCallback(() => {
    navigate("/wsprofile");
  }, [navigate]);

  return (
    <div className="ws-insight">
    <div className="WSNavbar">
      <img className="WSTitle" alt="" src="/TITLE.png" />
      <div className="NHome" onClick={onHomeTextClick}>
        Home
      </div>
      <div className="NReports" onClick={onREPORTSClick}>
        Report
      </div>
      <div className="NLeaderboards" onClick={onLEADERBOARDSClick}>
        Leaderboard
      </div>
      <div className="NProfile" onClick={onPROFILEClick}>
        Profile
      </div>
      <b className="NInsight">Insight</b>

      <main className="analytics-section">
        <h2>Analytics</h2>
        
        <div className="year-selector">
          <label>Year</label>
          <select>
            <option value="2024">2024</option>
          </select>
        </div>

        <div className="chart-container">
          <div className="bar-chart">
            <h3>Monthly Accident & Event Stats</h3>
            <Bar data={barData} options={{ responsive: true }} />
          </div>

          <div className="pie-chart">
            <h3>Approved & Denied Reports</h3>
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
        </div>

        <button className="report-feedback-button">Report Feedback</button>
      </main>
    </div>
    </div>
  );
};

export default WSInsight;
