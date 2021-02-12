import React, { useState } from "react";
import TextDisplay from "../text-display";

export default function InputController({ parasArr }) {
  const fullString = parasArr.join(" ");
  const firstSymbol = fullString[0];
  const restString = fullString.slice(1);

  const [processedSymbols, setProcessedSymbols] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState(firstSymbol);
  const [incomingSymbols, setIncomingSymbols] = useState(restString);

  //event listeners

  return (
    <div>
      <TextDisplay
        processedSymbols={processedSymbols}
        currentSymbol={currentSymbol}
        incomingSymbols={incomingSymbols}
      />
    </div>
  );
}
