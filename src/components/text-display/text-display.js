import React from "react";
import "./text-display.css";

const TextDisplay = ({
  processedSymbols,
  currentSymbol,
  incomingSymbols,
  errIndicator,
}) => {
  //

  return (
    <p className="">
      <span key="start">{`${processedSymbols}`}</span>
      <span
        key="middle"
        className={`current ${errIndicator}`}
      >{`${currentSymbol}`}</span>
      <span key="end">{`${incomingSymbols}`}</span>
    </p>
  );
};
export default TextDisplay;
