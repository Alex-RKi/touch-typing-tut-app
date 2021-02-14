import React, { useEffect, useState } from "react";
import "./App.css";
import loadData from "../../utils";

import "../input-controller";
import InputController from "../input-controller";
import Spinner from "../spinner";

//!
const testText = ["First sentence!"];

function App() {
  console.log("1 - component run");
  const parasQty = 1; //number of paragraphs to load, at least 1
  const [isLoading, setIsLoading] = useState(true);
  const [err, toggleErr] = useState(false);
  const [parasArr, setParasArr] = useState([]); //!''
  const [reload, requestReload] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log("2! - hook");
    loadData(parasQty)
      .then((res) => {
        setParasArr(res);
        setIsLoading(false);
      })
      .catch((err) => toggleErr(true));

    return () => {
      console.log("3 clear");
    };
  }, [reload]);

  console.log("4 after effect");

  const reloadText = () => {
    console.log("call reload");
    requestReload();
  };

  
  return (
    <div className="App container">
      <h1 className="display-6 p-2 border-bottom">Touch-typing tutor</h1>

      {console.log("6 render")}

      {isLoading ? <div className="container spinner"><Spinner /></div> : 
      <InputController parasArr={parasArr} reloadText={reloadText} />
      
      
      }
      
    </div>
  );
    }

export default App;
