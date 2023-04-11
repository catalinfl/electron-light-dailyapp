import nodeLogo from './assets/node.svg'
import { useState } from 'react'
import './App.scss'


// function closeTab() {
//   let window = remote.getCurrentWindow()
//   window.close()
// }



function App() {
  return (
    <div className='App'>
      <div className='logo-box'>
        <a href='https://github.com/electron-vite/electron-vite-react' target='_blank'>
          <img src='./vite.svg' className='logo vite' alt='Electron + Vite logo' />
          <img src='./electron.svg' className='logo electron' alt='Electron + Vite logo' />
        </a>
      </div>
      <h1>Electron + Vitfdse + React</h1>
      <div className='card'>
        {/* <button onClick={closeTab}>
          Test
        </button> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Electronba petrica + Vite logo sdsto learn more
      </p>
      <div className='flex-center'>
        Place stsdsatic files into the<code>/public</code> folder <img style={{ width: '5em' }} src={nodeLogo} alt='Node logo' />
      </div>
    </div>
  )
}

export default App
