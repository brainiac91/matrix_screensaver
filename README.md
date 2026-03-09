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

### Installation Scripts
To automatically download dependencies, package the executable, and apply it to your Windows Control Panel, we have provided auto-install scripts for your preferred environment:

- **Windows Batch**: Double click `install.bat` or run `.\install.bat` in CMD.
- **PowerShell**: Run `.\install.ps1` in a PowerShell window.
- **Python**: Run `python install.py`.
- **Bash (WSL/Git Bash)**: Run `./install.sh`.

These scripts will automatically compile the screensaver into a `.scr` file and set your Windows Registry to trigger the digital rain after 5 minutes of inactivity.

## Developer Rules & Protocols
All architecture decisions are captured in the `.agents` folder, describing the rules and constraints the AI swarm followed to build this.
