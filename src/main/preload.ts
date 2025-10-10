import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  executeCommand: (command: string) =>
    ipcRenderer.invoke('execute-command', command),
  onPodConnected: (callback: () => void) =>
    ipcRenderer.on('pod-connected', callback),
  removeAllListeners: () => ipcRenderer.removeAllListeners('pod-connected'),
  verifyPodLocation: () => ipcRenderer.invoke('verify-pod-location'),
  captureCsvFilename: () => ipcRenderer.invoke('capture-csv-filename'),
  openNewTerminal: (command: string) =>
    ipcRenderer.invoke('open-new-terminal', command),
})
