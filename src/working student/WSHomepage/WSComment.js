import { useCallback } from "react";
import "./WSComment.css";

const WSComment = () => {
  const onEllipseClick = useCallback(() => {
    // Please sync "AD-Home" to the project
  }, []);

  return (
    <div className="ws-comment">
      <div className="ws-comment-child" />
      <div className="ws-comment-item" onClick={onEllipseClick} />
      <b className="x">x</b>
      <div className="rectangle-parent4">
        <div className="group-child8" />
        <div className="richardmolina2">richard.molina</div>
        <img
          className="e9a6b2c-9aa0-4ed8-a748-11b9f87-icon2"
          alt=""
          src="/0e9a6b2c9aa04ed8a74811b9f8755fcd-2@2x.png"
        />
        <div className="is-this-true">Is this true?</div>
      </div>
      <div className="rectangle-parent5">
        <div className="group-child8" />
        <div className="richardmolina2">richard.molina</div>
        <img
          className="e9a6b2c-9aa0-4ed8-a748-11b9f87-icon2"
          alt=""
          src="/0e9a6b2c9aa04ed8a74811b9f8755fcd-2@2x.png"
        />
        <div className="this-report-is">This report is true!</div>
      </div>
      <div className="rectangle-parent6">
        <div className="group-child8" />
        <div className="richardmolina2">richard.molina</div>
        <img
          className="e9a6b2c-9aa0-4ed8-a748-11b9f87-icon2"
          alt=""
          src="/0e9a6b2c9aa04ed8a74811b9f8755fcd-2@2x.png"
        />
        <div className="i-saw-it">I saw it happened!</div>
      </div>
    </div>
  );
};

export default WSComment;
