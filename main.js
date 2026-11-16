const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

const args = process.argv;
const isPreview = args.some(arg => arg.toLowerCase().includes('/p'));
const isConfig = args.some(arg => arg.toLowerCase().includes('/c'));

if (isPreview || isConfig) {
    app.quit();
}

let windows = [];

function createWindows() {
    const displays = screen.getAllDisplays();

    displays.forEach((display) => {
        const { bounds } = display;

        const mainWindow = new BrowserWindow({
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height,
            transparent: true,
            frame: false,
            fullscreen: true,
            alwaysOnTop: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        // Load the index.html of the app
        mainWindow.loadFile('index.html');

        // Chromium only applies `cursor: none` on a mouse event, and the mouse is idle
        // when the screensaver starts. Send one move at the cursor's current spot so it
        // hides immediately (same position, so it won't trip the quit-on-move check).
        mainWindow.webContents.once('did-finish-load', () => {
            const p = screen.getCursorScreenPoint();
            const inside = p.x >= bounds.x && p.x < bounds.x + bounds.width &&
                p.y >= bounds.y && p.y < bounds.y + bounds.height;
            if (!inside) return;
            mainWindow.focus();
            mainWindow.webContents.sendInputEvent({ type: 'mouseMove', x: p.x - bounds.x, y: p.y - bounds.y });
        });

        windows.push(mainWindow);
    });

    ipcMain.on('quit-app', () => {
        app.quit();
    });
}

// This method will be called when Electron has finished initialization
// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
    createWindows();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindows();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
