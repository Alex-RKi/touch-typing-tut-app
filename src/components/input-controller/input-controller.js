import React, { useEffect, useRef, useState } from "react";
import "./input-controller.css";

import TextDisplay from "../text-display";
import FocusLock from "react-focus-lock";

export default function InputController({ parasArr }) {
  const fullString = parasArr.join(" ");
  const firstSymbol = fullString[0];
  const restString = fullString.slice(1);

  const hiddenInput = useRef(null);

  let timer = useRef(null);
  let startTime = useRef(null);
  let passed = useRef(0);

  const [hiddenInputValue, setHiddenInputValue] = useState("");

  const [processedSymbols, setProcessedSymbols] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState(firstSymbol);
  const [incomingSymbols, setIncomingSymbols] = useState(restString);
  const [successCount, incrementSuccessCount] = useState(0);
  const [errorCount, incrementErrorCount] = useState(0);
  const [errIndicator, setErrIndicator] = useState("correct"); // incorrect | correct
  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    startTime.current = new Date().getTime();
    return () => {
      console.log("clear!");
      alert("clear!");
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(function wait() {
        const { passed, adjust } = checkTime();
        setTimePassed(passed);
        setTimeout(wait, 5000 - adjust);
      }, 5000);
    }
    console.log(timePassed);
    let test = new Date(timePassed);
    console.log(test);
  }, [timePassed]);

  const checkTime = () => {
    const now = new Date().getTime();
    const passed = now - startTime.current;
    const adjust = passed % 5000;
    return { passed, adjust };
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
        incrementSuccessCount((prev) => prev + 1);
        console.log("cleanup!");
        clearTimeout(timer.current);
        alert("Congrats! Task completed!");
        return;
      }
      setCurrentSymbol(incomingSymbols[0]);

      setIncomingSymbols(incomingSymbols.slice(1));
      incrementSuccessCount((prev) => prev + 1);
    } else {
      console.log("Incorrect!");
      setErrIndicator("incorrect");
      incrementErrorCount((prev) => prev + 1);
    }
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
        <div>Error - {errorCount}</div>
        <div>Success - {successCount}</div>
        <div>Timer {timePassed}</div>
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
