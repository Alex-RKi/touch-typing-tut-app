import React, { useEffect, useRef, useState } from "react";
import "./input-controller.css";
import TextDisplay from "../text-display";
import FocusLock from "react-focus-lock";
import Indicators from "../indicators";
import Report from "../report";
export default function InputController({ parasArr, reloadText }) {
  const fullString = createClearString(parasArr);
  const firstSymbol = fullString[0];
  const restString = fullString.slice(1);

  const hiddenInput = useRef(null);

  const [hiddenInputValue, setHiddenInputValue] = useState("");
  const [processedSymbols, setProcessedSymbols] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState(firstSymbol);
  const [incomingSymbols, setIncomingSymbols] = useState(restString);
  const [errorCount, incrementErrorCount] = useState(0);
  const [errIndicator, setErrIndicator] = useState("correct"); // incorrect | correct
  const [breakTimer, setBreakTimer] = useState(false);
  const [report, setReport] = useState("");

  useEffect(() => {}, [breakTimer]);
  const checkInput = (e) => {
    if (breakTimer) return;
    const key = e.target.value;
    setHiddenInputValue("");
    if (key === currentSymbol) {
      setErrIndicator("correct");
      setProcessedSymbols(processedSymbols + currentSymbol);
      if (!incomingSymbols[0]) {
        setBreakTimer(true); 
        setCurrentSymbol("");
        return;
      }
      setCurrentSymbol(incomingSymbols[0]);
      setIncomingSymbols(incomingSymbols.slice(1));
    } else {
      setErrIndicator("incorrect");
      incrementErrorCount((prev) => prev + 1);
    }
  };
  const passResultsText = (str) => {
    setReport(str);
  };
  function createClearString(arr) {
    return arr
      .map((elem) => {
        return elem.split("  ").join(" ");
      })
      .join(" ");
  }
  return (
    <div className="container">
      <Indicators
        correct={processedSymbols.length}
        incorrect={errorCount}
        breakTimer={breakTimer}
        passResultsText={passResultsText}
      />

      <div className="mt-5 border border-1 rounded p-3">
        <TextDisplay
          processedSymbols={processedSymbols}
          currentSymbol={currentSymbol}
          incomingSymbols={incomingSymbols}
          errIndicator={errIndicator}
        />
      </div>

      {report ? (
        <Report reloadText={reloadText} {...report} />
      ) : (
        <FocusLock disabled={breakTimer}>
          <input
            className="hidden-input"
            ref={hiddenInput}
            type="text"
            tabIndex="0"
            onChange={checkInput}
            value={hiddenInputValue}
          />
        </FocusLock>
      )}
    </div>
  );
}
