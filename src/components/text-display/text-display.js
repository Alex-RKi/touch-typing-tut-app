import React, { useEffect } from "react";
import "./text-display.css";

const TextDisplay = ({
  processedSymbols,
  currentSymbol,
  incomingSymbols,
  errIndicator,
}) => {
  //

  return (
    <p className="border border-1 rounded p-5">
      <span>{`${processedSymbols}`}</span>
      <span className={`current ${errIndicator}`}>{`${currentSymbol}`}</span>
      <span>{`${incomingSymbols}`}</span>
    </p>
  );
};
export default TextDisplay;
