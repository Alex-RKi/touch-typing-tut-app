import React, { useEffect, useState } from "react";
import TextDisplay from "../text-display";
import { Card } from "react-bootstrap";
import userEvent from "@testing-library/user-event";

export default function InputController({ parasArr }) {
  const fullString = parasArr.join(" ");
  const firstSymbol = fullString[0];
  const restString = fullString.slice(1);

  const [processedSymbols, setProcessedSymbols] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState(firstSymbol);
  const [incomingSymbols, setIncomingSymbols] = useState(restString);
  const [successCount, incrementSuccesCount] = useState(0);
  const [errorCount, incrementErrorCount] = useState(0);
  const [errIndicator, setErrIndicator] = useState("correct"); // incorrect | correct

  useEffect(() => {
    console.log("add-listener");
    document.addEventListener("keydown", checkInput);
    return () => {
      console.log("remove-listener");
      document.removeEventListener("keydown", checkInput);
    };
  }, [errorCount, successCount]);

  // useEffect(() => {}, [successCount, errorCount]);
  //event listeners

  const checkInput = ({ key }) => {
    console.log("handler----------------------");
    if (key === "Shift") return;
    if (key === currentSymbol) {
      console.log("Correct!");
      setErrIndicator("correct");
      setProcessedSymbols(processedSymbols + currentSymbol);
      setCurrentSymbol(incomingSymbols[0]);
      setIncomingSymbols(incomingSymbols.slice(1));

      incrementSuccesCount((prev) => prev + 1);
    } else {
      console.log("Incorrect!");
      setErrIndicator("incorrect");
      incrementErrorCount((prev) => {
        return prev + 1;
      });
    }
  };

  return (
    <>
      <div className=" border border-bottom">
        <h1 className="display-6">Touch-typing tutor</h1>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <TextDisplay
          processedSymbols={processedSymbols}
          currentSymbol={currentSymbol}
          incomingSymbols={incomingSymbols}
          errIndicator={errIndicator}
        />
        <div>Error - {errorCount}</div>
        <div>Success - {successCount}</div>
      </div>
    </>
  );
}
