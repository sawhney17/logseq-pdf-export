import { useState } from "react";
import "./App.css";
import { handleClosePopup } from "./handleClosePopup";
import { createPDF } from "./main";

var hello = "hello";
const App2: React.FC = () => {
  console.log("attempts");

  function delegateTemplate(e) {
    if (e.target.value == "template4"){
      createPDF(e.target.value, undefined, 'template4');
      throw(
        "error"
      )
    }
    
    console.log(e.target.value);
    logseq.hideMainUI();
    createPDF(e.target.value);
    handleClosePopup();
  }

  return (
    <div>
      <div className="flex justify-center h-screen w-screen">
        <div className="bg-slate-400 setting-popup centered-element rounded-xl">
          <div className="p-4">
            <h1 className="text-xl text">Choose your template!</h1>
            <br></br>
            <div className="form-group grid gap-3">
              <button
                className="button"
                value="template1"
                onClick={delegateTemplate}
              >
                Template 1
              </button>
              <button
                className="button"
                value="template2"
                onClick={delegateTemplate}
              >
                Template 2
              </button>
              <button
                className="button"
                value="template3"
                onClick={delegateTemplate}
              >
                Template 3
              </button>
              <button
                className="button"
                value="template4"
                onClick={delegateTemplate}
              >
                Print With Retained Formatting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App2;
