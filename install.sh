#!/bin/bash

echo "=============================================="
echo "         Matrix Screensaver Installer         "
echo "=============================================="

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed. Please install Node.js first."
    exit 1
fi

echo -e "\nInstalling dependencies..."
npm install

echo -e "\nPackaging Electron App for Windows..."
npx electron-packager . MatrixScreensaver --platform=win32 --arch=x64 --out=dist --overwrite

echo -e "\nApplying Windows Screensaver settings..."
# Convert MSYS/WSL path to Windows format if running in bash on Windows
CURR_DIR=$(pwd)
if command -v cygpath &> /dev/null; then
  WIN_DIR=$(cygpath -w "$CURR_DIR")
else
  WIN_DIR=$(pwd -W 2>/dev/null || pwd)
fi

EXE_PATH="$CURR_DIR/dist/MatrixScreensaver-win32-x64/MatrixScreensaver.exe"
SCR_PATH="$CURR_DIR/dist/MatrixScreensaver-win32-x64/MatrixScreensaver.scr"
WIN_SCR_PATH="$WIN_DIR\\dist\\MatrixScreensaver-win32-x64\\MatrixScreensaver.scr"

if [ -f "$EXE_PATH" ]; then
    mv "$EXE_PATH" "$SCR_PATH"
fi

if command -v reg.exe &> /dev/null; then
    reg.exe add "HKCU\Control Panel\Desktop" /v ScreenSaveActive /t REG_SZ /d 1 /f
    reg.exe add "HKCU\Control Panel\Desktop" /v ScreenSaveTimeOut /t REG_SZ /d 300 /f
    reg.exe add "HKCU\Control Panel\Desktop" /v SCRNSAVE.EXE /t REG_SZ /d "$WIN_SCR_PATH" /f
else
    echo "Warning: reg.exe not found. Unable to automatically set registry keys. Please apply manually."
fi

echo -e "\nInstallation Complete!"
echo "The Matrix Screensaver has been set to activate after 5 minutes of inactivity."
