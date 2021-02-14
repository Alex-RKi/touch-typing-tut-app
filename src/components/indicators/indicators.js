import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

import IndicatorsDisplay from "../indicators-display";

const Indicators = ({ correct, incorrect, breakTimer, passResultsText }) => {
  let timer = useRef(null);
  let startTime = useRef(null);

  const [msecPassed, setMsecPassed] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const createReport = () => {
    const min = moment(msecPassed).minutes();
    const sec = moment(msecPassed).seconds();
    return `Congrats! You completed the task within ${min} minutes ${sec} seconds, ${accuracy}% accuracy, avarage ${speed} speed and made ${incorrect} mistakes. Would you like to try again?`;
  };

  useEffect(() => {
    startTime.current = moment().valueOf();
  }, []);

  useEffect(() => {
    if (!timer.current) {
      timer.current = setInterval(function wait() {
        const diffInMs = checkTime();
        setMsecPassed(diffInMs);
      }, 1000);
    }
    setSpeed(calculateSpeed(msecPassed, correct, incorrect));
    setAccuracy(calculateAccuracy(correct, incorrect));
    if (breakTimer) {
      return () => {
        clearInterval(timer.current);
        const report = createReport();
        passResultsText(report);
      };
    }
  }, [msecPassed, correct, incorrect, breakTimer]);
  //-----
  const checkTime = () => {
    const now = moment().valueOf();
    return now - startTime.current;
  };

  const calculateSpeed = (msec, success, errors) => {
    if (msec === 0) return 0;
    const minutes = msec / 1000 / 60;
    return Math.floor((success + errors) / minutes);
  };
  const calculateAccuracy = (success, errors) => {
    if (!errors) return 100;
    const ratio = 1 - errors / (success + errors);
    return Math.floor(ratio * 100);
  };

  return (
    <>
      <div className="w-50 me-3 d-flex flex-column justify-content-center">
        <IndicatorsDisplay
          timer={moment(msecPassed).format("mm:ss")}
          speed={speed}
          accuracy={accuracy}
        />
      </div>
    </>
  );
};
export default Indicators;
