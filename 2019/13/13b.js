const electron = require('electron')

function createWindow () {
    // Create the browser window.
    let win = new electron.BrowserWindow({
        width: 800,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    })

    electron.globalShortcut.register('escape', () => win.reload())

    win.loadFile('index.html')
}

electron.app.on('ready', createWindow)
