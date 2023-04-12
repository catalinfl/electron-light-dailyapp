import nodeLogo from './assets/node.svg'
import { useState } from 'react'
import './App.scss'
import { ipcRenderer } from "electron"
import Bar from './components/Bar'

function App() {
  


  return (
    <div className='App'>
      <Bar />
    </div>
  )
}

export default App
