import {
  app,
  BrowserWindow,
} from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'

import { Window } from './create';

app.whenReady().then(async () => {
  const _window = new Window()

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))

  _window.windowOpen()
  app.on('activate', () => (BrowserWindow.getAllWindows().length === 0) && _window.windowOpen());
  app.on('window-all-closed', () => (process.platform !== 'darwin') && app.quit())
})
