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
    <p>
      <span key="passed" className='passed text-muted blockquote'>{`${processedSymbols}`}</span>
      <mark
        key="current"
        className={`current ${errIndicator}`}
      >{`${currentSymbol}`}</mark>
      <span key="incoming" className='blockquote'>{`${incomingSymbols}`}</span>
    </p>
  );
};
export default TextDisplay;
