import React, { useEffect, useRef, useState } from "react";
import "./input-controller.css";

import TextDisplay from "../text-display";

import FocusLock from "react-focus-lock";
import moment from "moment";

export default function InputController({ parasArr }) {
  const fullString = parasArr.join(" ");
  const firstSymbol = fullString[0];
  const restString = fullString.slice(1);
  const timerUpdateInterval = 1000;

  const hiddenInput = useRef(null);
  let timer = useRef(null);
  let startTime = useRef(null);

  const [hiddenInputValue, setHiddenInputValue] = useState("");
  const [processedSymbols, setProcessedSymbols] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState(firstSymbol);
  const [incomingSymbols, setIncomingSymbols] = useState(restString);
  const [errorCount, incrementErrorCount] = useState(0);
  const [errIndicator, setErrIndicator] = useState("correct"); // incorrect | correct
  const [msecPassed, setMsecPassed] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(1);
  const [breakTimer, setBreakTimer] = useState(false);

  useEffect(() => {
    startTime.current = moment().valueOf();
    return () => {
      console.log("clear!");
      alert("clear!");
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (breakTimer) return;
    if (!timer.current) {
      timer.current = setTimeout(function wait() {
        const { diffInMs, adjust } = checkTime();
        setMsecPassed(diffInMs);
        setTimeout(wait, timerUpdateInterval - adjust);
      }, timerUpdateInterval);
    }
  }, [msecPassed, breakTimer]);

  const checkTime = () => {
    const now = moment().valueOf();
    const diffInMs = now - startTime.current;
    const adjust = diffInMs % timerUpdateInterval;
    const passed = moment(diffInMs).format("mm-ss");
    return { diffInMs, adjust };
  };

  const checkInput = (e) => {
    const key = e.target.value;
    setHiddenInputValue("");
    if (key === currentSymbol) {
      console.log("Correct!");
      setErrIndicator("correct");
      setProcessedSymbols(processedSymbols + currentSymbol);
      if (!incomingSymbols[0]) {
        //Task completed, break

        console.log("cleanup!");
        clearTimeout(timer.current);
        setBreakTimer(true); //!
        alert("Congrats! Task completed!");
        return;
      }
      setCurrentSymbol(incomingSymbols[0]);
      setIncomingSymbols(incomingSymbols.slice(1));
    } else {
      console.log("Incorrect!");
      setErrIndicator("incorrect");
      incrementErrorCount((prev) => prev + 1);
    }
    setSpeed(calculateSpeed(msecPassed, processedSymbols.length, errorCount));
    setAccuracy(calculateAccuracy(processedSymbols.length, errorCount));
    console.log(speed, accuracy);
  };

  const calculateSpeed = (msec, success, errors) => {
    const minutes = msec / 1000 / 60;
    return Math.floor((success + errors) / minutes);
  };
  const calculateAccuracy = (success, errors) => {
    const ratio = 1 - errors / (success + errors);
    return Math.floor(ratio * 100);
  };

  return (
    <div className="container">
      <div className="border-bottom">
        <h1 className="display-6">Touch-typing tutor</h1>
      </div>

      <div className="d-flex justify-content-center mt-5 border border-1 rounded p-3">
        <TextDisplay
          processedSymbols={processedSymbols}
          currentSymbol={currentSymbol}
          incomingSymbols={incomingSymbols}
          errIndicator={errIndicator}
        />
        <div>Speed - {speed}</div>
        <div>Accuracy - {accuracy}</div>
        <div>Timer {moment(msecPassed).format("mm-ss")}</div>
      </div>

      <FocusLock>
        <input
          className="hidden-input"
          ref={hiddenInput}
          type="text"
          tabIndex="0"
          onChange={checkInput}
          value={hiddenInputValue}
        />
      </FocusLock>
    </div>
  );
}
