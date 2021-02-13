import React, { useRef, useState } from "react";
import "./input-controller.css";

import TextDisplay from "../text-display";

import FocusLock from "react-focus-lock";

export default function InputController({ parasArr }) {
  const fullString = parasArr.join(" ");
  const firstSymbol = fullString[0];
  const restString = fullString.slice(1);

  const hiddenInput = useRef(null);

  const [running, setRunning] = useState(false);

  const [hiddenInputValue, setHiddenInputValue] = useState("");

  const [processedSymbols, setProcessedSymbols] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState(firstSymbol);
  const [incomingSymbols, setIncomingSymbols] = useState(restString);
  const [successCount, incrementSuccessCount] = useState(0);
  const [errorCount, incrementErrorCount] = useState(0);
  const [errIndicator, setErrIndicator] = useState("correct"); // incorrect | correct

  const checkInput = (e) => {
    const key = e.target.value;
    setHiddenInputValue("");
    if (key === currentSymbol) {
      console.log("Correct!");
      setErrIndicator("correct");
      setProcessedSymbols(processedSymbols + currentSymbol);
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
