import React from "react";

export default function IndicatorsDisplay({ timer, speed, accuracy }) {
  return (
    <div className="mw-100 d-flex    justify-content-between lead">
      <div className="flex-grow-1">Time: {timer}</div>
      <div className="flex-grow-1">Speed: {speed}</div>
      <div className="flex-grow-1">Accuracy: {accuracy}%</div>
    </div>
  );
}
