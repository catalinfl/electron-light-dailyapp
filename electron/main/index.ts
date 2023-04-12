import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { update } from './update'
import path from 'path'

type SetMouseType = {
  x: number,
  y: number
}

process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}



let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    width: 1024,
    height: 768,
    frame: false,
    movable: true,
    resizable: false,
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })



  if (url) { 
    win.loadURL(url)
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  ipcMain.on('close-window', () => {
    win?.close()
  })

  
  update(win)
}

ipcMain.on("move-window", (event, { distanceX, distanceY }) => {
  // Get the current position of the window
  const currentWindow = BrowserWindow.fromWebContents(event.sender) as BrowserWindow;
  const currentPosition = currentWindow.getBounds();
  // Update the position of the window
  if (Math.abs(currentPosition.x + distanceX) < 1920 && Math.abs(currentPosition.y + distanceY) < 1080) {
    setTimeout(() => {
      currentWindow.setBounds({
      x: currentPosition.x + distanceX,
      y: currentPosition.y + distanceY,
    });
    }, 10)
  }
  
  console.log(currentWindow.getBounds())
});




app.whenReady().then(createWindow)


app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})


app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

