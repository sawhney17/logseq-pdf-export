import "./App.css";
import { downloadPDF } from "./main";
const App: React.FC<{ htmlText }> = ({ htmlText }) => {
  function handleInputChange(event) {
    const target = event.target;
    console.log(target.checked);
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  }

  return (
    <div>
      <div className="w-screen h-screen flex items-center justify-center text-black">
        <div className="w-6/6 h-5/6 bg-clip-padding">
          <div className="bg-slate-400 z-30 rounded-2xl p-4">
            <h1 className="font-bold text-4xl">PDF Preview</h1>
            <br></br>
            <div
              dangerouslySetInnerHTML={{ __html: htmlText }}
              id="cooldiv"
              className="bg-white rounded-xl"
            ></div>
            <br></br>
            <div className="">
              <button className="button" onClick={() => downloadPDF()}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-screen h-screen top-0 left-0 z-50"
        onClick={() => logseq.hideMainUI()}
      ></div>
    </div>
  );
};

export default App;
