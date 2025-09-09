const {app, BroswerWindow, BrowserView, BrowserWindow} = require('electron');

const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Arias GM Duties',
        width: 400,
        height: 430
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file',
        slashes: true
    });

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);