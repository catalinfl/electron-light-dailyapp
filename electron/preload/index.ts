import { contextBridge, ipcRenderer, Menu } from "electron";

export function preload() {
    contextBridge.exposeInMainWorld('api', {
        closeTab: () => {
            ipcRenderer.send('close-tab')
        }
    })

    // Menu.setApplicationMenu(null)
    console.log("test")
}
