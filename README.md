# Matrix Desktop Screensaver

A fully transparent, true desktop matrix digital rain screensaver built with Electron and HTML5 Canvas.

## Features
- **True Desktop Transparency**: Uses a borderless, transparent Electron window. `setIgnoreMouseEvents` allows you to see and click the icons on your desktop right through the matrix rain.
- **Multi-Monitor Support**: Spawns a dedicated renderer on every connected display using `screen.getAllDisplays()`.
- **4K Optimized**: Scales perfectly utilizing `window.devicePixelRatio` for razor-sharp rendering on 1080p and 2160p displays without massive performance drops.
- **Classic Matrix Aesthetics**: Half-width Katakana, Latin characters, fading trails using `destination-out` composite operations.
- **Native Screensaver Integration**: Built via `electron-packager` into a native Windows `.scr` file, responding instantly to keyboard/mouse movement to quit.
- **Agent Swarm Architecture**: Developed by an AI Agent Swarm consisting of a frontend developer, a performance engineer, and a designer.

## Getting Started

### Development
1. Clone the repository.
2. Run `npm install`.
3. Run `npm start` to test the overlay. It will cover all monitors. Press any key or move your mouse to close it.

### Building
To package as a Windows screensaver:
```bash
npm install -D electron-packager
npx electron-packager . MatrixScreensaver --platform=win32 --arch=x64 --out=dist --overwrite
```
Afterwards, navigate into the generated directory in `/dist/`, copy `MatrixScreensaver.exe`, and rename it to `MatrixScreensaver.scr`.
You can right-click the `.scr` file in Windows and select "Install" to correctly bind it to your Control Panel settings.

## Developer Rules & Protocols
All architecture decisions are captured in the `.agents` folder, describing the rules and constraints the AI swarm followed to build this.
