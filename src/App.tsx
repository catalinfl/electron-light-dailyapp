import nodeLogo from './assets/node.svg'
import { useState } from 'react'
import './App.scss'
import { ipcRenderer } from "electron"
import Bar from './components/Bar'
import Misc from './components/Misc'
import ToDoList from './components/ToDoList'

function App() {
  


  return (
    <div className='App'>
      <Bar />
      <Misc />
      <ToDoList />
    </div>
  )
}

export default App
