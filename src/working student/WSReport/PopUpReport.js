import PropTypes from 'prop-types';
import "./PopUpReport.css";

const PopUpReport = ({ className = "" }) => {
  return (
    <div className={`pop-up-report ${className}`}>
      <div className="pop-up-report-child" />
      <div className="rectangle-parent7">
        <div className="group-child11" />
        <div className="incident-type2">Incident Type</div>
        <div className="type-here">Type here</div>
      </div>
      <div className="rectangle-parent8">
        <div className="group-child12" />
        <div className="level-of-incident">Level of Incident</div>
        <div className="type-here">Type here</div>
      </div>
      <div className="rectangle-parent9">
        <div className="group-child13" />
        <div className="upload-photo-for">Upload photo (For evidence)</div>
        <div className="upload-file">Upload file</div>
        <img
          className="material-symbolsupload-icon"
          alt=""
          src="/materialsymbolsupload.svg"
        />
      </div>
      <div className="rectangle-parent10">
        <div className="group-child14" />
        <div className="report">REPORT</div>
      </div>
    </div>
  );
};

PopUpReport.propTypes = {
  className: PropTypes.string,
};

export default PopUpReport;
