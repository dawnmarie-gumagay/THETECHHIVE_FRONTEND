import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './WSInsightAnalytics.css'

export default function WSInsightAnalytics () {
  const navigate = useNavigate();

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

    return (
        <div className='WSInsightAnalytics_WSInsightAnalytics'>
            <div className="WSNavbar" />
            <img className="WSTitle" alt="" src="/TITLE.png" />
            <div className="NHome" onClick={onHomeTextClick}>
                Home
            </div>
            <div className="NReports" onClick={onREPORTSClick}>
                Report
            </div>
            <div className="NLeaderboards" onClick={onLEADERBOARDClick}>
                Leaderboard
            </div>
            <div className="NProfile" onClick={onPROFILEClick}>
                Profile
            </div>
            <b className="NInsight">Insight</b>

            <img className="InsightTitle" alt="" src="/WSInsightAnalytics_insight.png" />
            <b className="AnalyticsTitle">{`Analytics `}</b>
     
            <div className="WSInsightBox" />

			<div className='Frame102'>
				<span className='ReportFeedback'>Report Feedback</span>
				<div className='Polygon1'/>
			</div>
			<div className='Frame120'>
				<div className='Rectangle67'/>
				<div className='Frame104'>
					<span className='_20'>20</span>
					<span className='Jan'>Jan</span>
					<span className='Feb'>Feb</span>
					<span className='Mar'>Mar</span>
					<span className='Apr'>Apr</span>
					<span className='May'>May</span>
					<span className='June'>June</span>
					<span className='July'>July</span>
					<span className='Aug'>Aug</span>
					<span className='Sept'>Sept</span>
					<span className='Nov'>Nov</span>
					<span className='Dec'>Dec</span>
					<span className='_40'>40</span>
					<span className='_60'>60</span>
					<span className='_80'>80</span>
					<span className='_100'>100</span>
					<img className='Line11'  />
					<img className='Line12' />
					<div className='Rectangle70'/>
					<div className='Rectangle86'/>
					<div className='Rectangle85'/>
					<div className='Rectangle84'/>
					<div className='Rectangle71'/>
					<div className='Rectangle72'/>
					<div className='Rectangle73'/>
					<div className='Rectangle74'/>
					<div className='Frame106'>
						<span className='PhysicalAccident'>Physical Accident</span>
						<div className='Rectangle76'/>
					</div>
					<div className='Frame109'>
						<span className='EnvironmentalAccident'>Environmental Accident</span>
						<div className='Rectangle79'/>
					</div>
					<div className='Frame112'>
						<span className='VehicleAccident'>Vehicle Accident</span>
						<div className='Rectangle82'/>
					</div>
					<div className='Frame107'>
						<span className='LaboratoryAccident'>Laboratory Accident</span>
						<div className='Rectangle77'/>
					</div>
					<div className='Frame110'>
						<span className='FireRelatedAccident'>Fire-Related Accident</span>
						<div className='Rectangle80'/>
					</div>
					<div className='Frame113'>
						<span className='EquipmentRelatedAccident'>Equipment-Related Accident</span>
						<div className='Rectangle83'/>
					</div>
					<div className='Frame114'>
						<span className='Event'>Event</span>
						<div className='Rectangle83_1'/>
					</div>
					<div className='Frame108'>
						<span className='FacilityRelatedAccident'>Facility-Related Accident</span>
						<div className='Rectangle78'/>
					</div>
					<div className='Frame111'>
						<span className='HealthRelatedAccident'>Health-Related Accident</span>
						<div className='Rectangle81'/>
					</div>
				</div>
				<span className='MonthlyAccidentEventStats'>Monthly Accident & Event Stats<br/> </span>
			</div>
			<div className='Frame122'>
				<div className='Rectangle64'/>
				<arrow_left className='arrow_left'/>
				<arrow_right className='arrow_right'/>
				<span className='_2024'>2024</span>
				<span className='Year'>Year</span>
			</div>
			<div className='Frame123'>
				<div className='Rectangle68'/>
				<div className='Frame118'>
					<div className='Frame121'>
						<span className='ApprovedDeniedReports'>Approved & Denied Reports</span>
						<div className='Ellipse14'/>
						<div className='Ellipse15'/>
						<span className='Approved'>Approved</span>
						<div className='Rectangle67_1'/>
						<span className='Denied'>Denied</span>
						<div className='Rectangle68_1'/>
						<div className='Rectangle87'/>
						<span className='_80_1'>80%</span>
						<div className='Rectangle87_1'/>
						<span className='_20_1'>20%</span>
					</div>
				</div>
			</div>
			<div className='Group47781'>
				<img className='Rectangle64_1'  />
				<div className='Ellipse12'/>
				<span className='TOTALREPORTSSUBMITTED'>TOTAL REPORTS SUBMITTED</span>
				<span className='TOTALPOINTSEARNED'>TOTAL POINTS EARNED</span>
				<div className='Ellipse13'/>
				<span className='_2'>2</span>
				<span className='_5'>5</span>
				<div className='Group47780'>
					<div className='table'>
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
	)
}