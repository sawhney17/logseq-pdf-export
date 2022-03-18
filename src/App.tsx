import { useState } from 'react'
import './App.css'
import { downloadPDF } from './main'
var hello = "hello"
const App: React.FC<{htmlText}> = ({htmlText}) => {

  
  function handleInputChange(event) {
    const target = event.target;
    console.log(target.checked)
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  };
//   return (
//     <div>
//     <div className='flex justify-center h-screen w-screen'>
//    <div className=' bg-slate-400 settings-popup centered-element rounded-xl' >
//      <div className='p-4'>
//      <h1 className='text-xl text'>Choose your template!</h1>
//      <br></br>
// <div className='form-group'>
// <button className='button' value="template1">Template 1</button>
// <button className='button' value="template2">Template 2</button>
// <button className='button' value="template3">Template 3</button>
// </div>
//    </div> 
//    </div>
//    </div>
//    </div>
//   )
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
        {/* <div><label><input type="checkbox" name = "Page Properties" onChange={ e => handleInputChange(e)}/>hide page properties</label></div>
      <div><label><input type="checkbox"/>hide brackets</label></div>
      <div><label><input type="checkbox"/>render with bullets</label></div>
      <div><label><input type="checkbox"/>My Value</label></div> */}
      </div>
      </div>
    </div>
    <div className="w-screen h-screen top-0 left-0 z-50" onClick={() => logseq.hideMainUI()}></div>
    </div>
  )
}

export default App
