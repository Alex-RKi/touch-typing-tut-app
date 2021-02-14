import React, { useEffect, useState } from "react";
import "./App.css";
import loadData from "../../utils";

import "../input-controller";
import InputController from "../input-controller";
import Spinner from "../spinner";

function App() {
  const parasQty = 1; //number of paragraphs to load, at least 1
  const [isLoading, setIsLoading] = useState(true);
  const [err, toggleErr] = useState(false);
  const [parasArr, setParasArr] = useState([]);
  const [reload, requestReload] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    loadData(parasQty)
      .then((res) => {
        setParasArr(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toggleErr(true);
      });
  }, [reload]);

  const reloadText = () => {
    requestReload((prev) => !prev);
  };
  if (err) {
    return (
      <div>
        Failed to connect server. Pls check your Internet connection or try
        later.
      </div>
    );
  }

  const spinnerElem = (
    <div className="spinner mt-5 d-flex justify-content-center">
      <Spinner />
    </div>
  );
  const contentElem = (
    <InputController parasArr={parasArr} reloadText={reloadText} />
  );

  return (
    <div className="App container">
      <h1 className="display-6 p-2 border-bottom">Touch-typing tutor</h1>
      {isLoading ? spinnerElem : contentElem}
    </div>
  );
}

export default App;
