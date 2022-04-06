import React, { useState } from 'react'
import './App.css'
import { downloadPDF } from './main'
var hello = "hello"
const App4: React.FC<{htmlText}> = ({htmlText}) => {
  React.useEffect(() => {
    window.print()
  })

  return (
        <div dangerouslySetInnerHTML={{__html: htmlText}} id = "cooldiv" className='bg-white rounded-xl'></div> 
  )
}

export default App4
