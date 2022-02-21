import { useState } from 'react'
import './App.css'
import { downloadPDF } from './main'
const App: React.FC<{htmlText}> = ({htmlText}) => {

  function handleInputChange(event) {
    const target = event.target;
    console.log(target.value)
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  };

  return (
    <div>
    <div className="w-screen h-screen flex items-center justify-center text-black">
      
      <div className="w-5/6 h-5/6 bg-clip-padding">
      <div className="bg-slate-400 z-30 rounded-2xl p-4">
        <h1 className="font-bold text-4xl">PDF Preview</h1>
        <br></br>
        <div dangerouslySetInnerHTML={{__html: htmlText}} id = "cooldiv" className='bg-white rounded-xl'></div> 
        <br></br>
        <div className=''><button className='button' onClick={() => downloadPDF()}>Download</button></div>

        {/* <div><label><input type="checkbox"/>Value</label></div> */}
        <div><label><input type="checkbox" onChange={ e => handleInputChange(e)}/>hide page properties</label></div>
      <div><label><input type="checkbox"/>hide brackets</label></div>
      <div><label><input type="checkbox"/>render with bullets</label></div>
      <div><label><input type="checkbox"/>My Value</label></div>
      </div>
      
      </div>
      
      
      

    </div>
    <div className="w-screen h-screen top-0 left-0 z-50" onClick={() => logseq.hideMainUI()}></div>
    </div>
  )
}

export default App
//<div className="w-screen h-screen flex items-center justify-center text-black">
      
//      <div className="w-5/6 h-5/6 bg-clip-padding bg-slate-400 z-30 rounded-2xl p-4">
  //      <h1 className="font-bold text-4xl">PDF Preview</h1>
    //    <br></br>
      //  <div dangerouslySetInnerHTML={{__html: htmlText}} id = "cooldiv" className='bg-white rounded-xl'></div> 
        //<br></br>
//        <div className=''><button className='button' onClick={() => downloadPDF()}>Download</button></div>
 //       {/* <div><label><input type="checkbox"/>Value</label></div> */}
   //     <div><label><input type="checkbox"/>hide page properties</label></div>
     // <div><label><input type="checkbox"/>hide brackets</label></div>
      //<div><label><input type="checkbox"/>render with bullets</label></div>
      //<div><label><input type="checkbox"/>My Value</label></div>
     // </div>
      
      //<div className="w-screen h-screen fixed top-0 left-0 z-10" onClick={() => logseq.hideMainUI()}></div>
      

    //</div>