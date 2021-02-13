import React, { useEffect, useState } from "react";
import "./App.css";
import loadData from "../../utils";

import "../input-controller";
import InputController from "../input-controller";

//two-paras API res test
const testText = [
  "First sentence! Kansas City is the largest city in Missouri by population and area.",
];

function App() {
  const parasQty = 1; //number of paragraphs to load, at least 1
  const [popup, showPopup] = useState(true);
  const [err, toggleErr] = useState(false);
  const [parasArr, setParasArr] = useState(testText); //!''
  // useEffect(() => {
  //   loadData(parasQty)
  //     .then((res) => setParasArr(res))
  //     .catch((err) => toggleErr(true));
  // }, []);

  return (
    <div className="App">
      <InputController parasArr={parasArr} />
    </div>
  );
}

export default App;
