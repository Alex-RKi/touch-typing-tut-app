import React from "react";

export default function Report({
  accuracy,
  incorrect,
  min,
  sec,
  speed,
  reloadText,
}) {
  return (
    <div className='border rounded mt-2 p-3'>
      <h2 className='lead'>Your results</h2>
      <ul className="list-unstyled lead">
        <li key="speed">Average speed: {speed} per minute</li>
        <li key="time">
          Time spent: {min} minutes {sec} seconds{" "}
        </li>
        <li key="accuracy">Accuracy: {accuracy}%</li>
        <li key="mistakes">Mistakes: {incorrect}</li>
      </ul>
      <button className='btn btn-primary' onClick={reloadText}>Try again</button>
    </div>
  );
}
