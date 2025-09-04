import React from "react";

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;
  return (
    <div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Question {current} of {total}
      </p>
    </div>
  );
}

export default ProgressBar;
