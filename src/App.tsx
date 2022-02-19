import './App.css'
import { downloadPDF } from './main'
const App: React.FC<{htmlText}> = ({htmlText}) => {
  return (
    
    <div className="w-screen h-screen flex items-center justify-center text-black">
      
      <div className="w-5/6 h-5/6 bg-clip-padding bg-slate-400 z-30 rounded-2xl px-4 overflow-auto">
        <h1 className="font-bold text-4xl">PDF Preview</h1>
        <div dangerouslySetInnerHTML={{__html: htmlText}} id = "cooldiv" className='bg-white rounded-xl p-4'></div> 
        <br></br>
        <div className=''><button className='button' onClick={() => downloadPDF()}>Download</button></div>
        <p><img src="/Users/aryansawhney/Dropbox/Logseq Programming Notes/Screen_Shot_2022-02-14_at_10.02.03_PM_1644861725551_0.png" alt="Screen Shot 2022-02-14 at 10.02.03 PM.png"></img></p>
      </div>
      <div className="w-screen h-screen fixed top-0 left-0 z-10" onClick={() => logseq.hideMainUI()}></div>
    </div>
  )
}

export default App
