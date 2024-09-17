import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import './WSInsightAnalytics.css';

const WSInsightAnalytics = () => {
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState(2024);

  const onHomeTextClick = useCallback(() => {
    navigate("/wshomepage");
  }, [navigate]);

  const onREPORTSClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onLEADERBOARDClick = useCallback(() => {
    navigate("/wsleaderboards");
  }, [navigate]);

  const onPROFILEClick = useCallback(() => {
    navigate("/wsprofile");
  }, [navigate]);

  const decrementYear = () => {
    setCurrentYear(prev => prev - 1);
  };

  const incrementYear = () => {
    setCurrentYear(prev => prev + 1);
  };

  return (
    <div className='WSInsightAnalytics_WSInsightAnalytics'>
      <div className="WSNavbar" />
      <img className="WSTitle" alt="" src="/TITLE.png" />
      <div className="NHome" onClick={onHomeTextClick}>Home</div>
      <div className="NReports" onClick={onREPORTSClick}>Report</div>
      <div className="NLeaderboards" onClick={onLEADERBOARDClick}>Leaderboard</div>
      <div className="NProfile" onClick={onPROFILEClick}>Profile</div>
      <b className="NInsight">Insight</b>

      <img className="InsightTitle" alt="" src="/WSInsightAnalytics_insight.png" />
      <b className="AnalyticsTitle">Analytics</b>
     
      <div className="WSInsightBox" />

      <div className="YearContainer">
        <div className="YearBox"/>
        <span className='Year'>Year</span>
        <img className="Calendar" alt="" src="/WSInsight_Calendar.png"/>
        <img className="arrow_left" alt="" src="/WsInsight_Leftbtn.png" onClick={decrementYear}/>
        <span className='_2024'>{currentYear}</span>
        <img className="arrow_right" alt="" src="/WsInsight_Rightbtn.png" onClick={incrementYear}/>
      </div>

      <div className="BarGraphContainer">
        <div className="BarBox"/>
        <span className='MonthlyAccidentEventStats'>Monthly Accident & Event Stats<br/> </span>
        <div className="BarGraph">
          <span className='_20'>20</span>
          <span className='_40'>40</span>
          <span className='_60'>60</span>
          <span className='_80'>80</span>
          <span className='_100'>100</span>
          <img className='B1' alt="" />

          <span className='Jan'>Jan</span>
          <div className='Rectangle84'/>
          <div className='Rectangle85'/>

          <span className='Feb'>Feb</span>
          <div className='Rectangle70'/>

          <span className='Mar'>Mar</span>
          <div className='Rectangle71'/>
          <div className='Rectangle86'/>
          
          <span className='Apr'>Apr</span>
          <div className='Rectangle72'/>

          <span className='May'>May</span>
          <div className='Rectangle73'/>

          <span className='June'>June</span>
          <span className='July'>July</span>
          <span className='Aug'>Aug</span>
          <span className='Sept'>Sept</span>
          <span className='Nov'>Nov</span>
          <span className='Dec'>Dec</span>
          <img className='B2' alt="" />

          <div className='grayline'/>

          <div className='PAContainer'>
            <span className='PhysicalAccident'>Physical Accident</span>
            <div className='PABox'/>
          </div>

          <div className='EAContainer'>
            <span className='EnvironmentalAccident'>Environmental Accident</span>
            <div className='EABox'/>
          </div>

          <div className='VAContainer'>
            <span className='VehicleAccident'>Vehicle Accident</span>
            <div className='VABox'/>
          </div>

          <div className='LAContainer'>
            <span className='LaboratoryAccident'>Laboratory Accident</span>
            <div className='LABox'/>
          </div>

          <div className='FireRelatedContainer'>
            <span className='FireRelatedAccident'>Fire-Related Accident</span>
            <div className='FireRelatedBox'/>
          </div>

          <div className='EquipmentRelatedContainer'>
            <span className='EquipmentRelatedAccident'>Equipment-Related Accident</span>
            <div className='EquipmentRelatedBox'/>
          </div>

          <div className='FacilityRelatedContainer'>
            <span className='FacilityRelatedAccident'>Facility-Related Accident</span>
            <div className='FacilityRelatedBox'/>
          </div>

          <div className='HRContainer'>
            <span className='HealthRelatedAccident'>Health-Related Accident</span>
            <div className='HRBox'/>
          </div>

          <div className='EventContainer'>
            <span className='Event'>Event</span>
            <div className='EventBox'/>
          </div>
        </div>
      </div>
      
      <div className='PieChartContainer'>
        <div className='PieBackground'/>
        <div className='PieContainer'>
          <div className='PieGroup'>
            <span className='ApprovedDeniedReports'>Approved & Denied Reports</span>
          
            <span className='Approved'>Approved</span>
            <div className='ApprovedCircle'/>
            <div className='ApprovedBox'/>

            <span className='Denied'>Denied</span>
            <div className='DeniedCircle'/>
            <div className='DeniedBox'/>

            <div className='Abg'/>
            <span className='ApprovedPercentage'>80%</span>

            <div className='Dbg'/>
            <span className='DeniedPercentage'>20%</span>
          </div>
        </div>
      </div>

      <div className="WSInsightBox2" />

      <div className='ReportFeedbackContainer'>
        <span className='ReportFeedback'>Report Feedback</span>
        <img className="Toggle" alt="" src="/Toggledown.png"/>
      </div>
      
      <div className='TableContainer'>
        <span className='TOTALREPORTSSUBMITTED'>TOTAL REPORTS SUBMITTED</span>
        <div className='Total1'/>
        <span className='TotalNumber1'>2</span>

        <span className='TOTALPOINTSEARNED'>TOTAL POINTS EARNED</span>
        <div className='Total2'/>
        <span className='TotalNumber2'>5</span>

        <div className='GroupTable'>
          <div className='Table'>
            <div className='_1'>
              <span className='SubmissionDate'>Submission Date</span>
            </div>

            <div className='_2_1'>
              <span className='DateVerified'>Date Verified</span>
            </div>

            <div className='_3'>
              <span className='Status'>Status</span>
            </div>

            <div className='_4'>
              <span className='Reason'>Reason</span>
            </div>

            <div className='_6'>
              <span className='_20240116'>2024-01-16</span>
            </div>

            <div className='_7'>
              <span className='_20240116_1'>2024-01-16 | 10:05 AM</span>
            </div>

            <div className='_8'>
              <span className='Approved_1'>Approved</span>
            </div>

            <div className='_9'>
            </div>

            <div className='_11'>
              <span className='_20240116_2'>2024-01-16</span>
            </div>

            <div className='_12'>
              <span className='_20240116_3'>2024-01-16 | 10:05 AM</span>
            </div>

            <div className='_13'>
              <span className='Denied_1'>Denied</span>
            </div>

            <div className='_14'>
              <span className='Fakenews'>Fake news</span>
            </div>

            <div className='_15'>
              <span className='PointsEarned'>Points Earned</span>
            </div>

            <div className='_16'>
              <span className='_5_1'>5</span>
            </div>

            <div className='_17'>
              <span className='_0'>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WSInsightAnalytics;