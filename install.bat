@echo off
echo ==============================================
echo Matrix Screensaver Installer
echo ==============================================

echo Checking for Node.js...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install Node.js first.
    pause
    exit /b
)

echo.
echo Installing dependencies...
call npm install

echo.
echo Packaging Electron App...
call npx electron-packager . MatrixScreensaver --platform=win32 --arch=x64 --out=dist --overwrite

echo.
echo Applying Windows Screensaver settings...
set SCR_PATH=%CD%\dist\MatrixScreensaver-win32-x64\MatrixScreensaver.scr
move /Y "%CD%\dist\MatrixScreensaver-win32-x64\MatrixScreensaver.exe" "%SCR_PATH%" >nul 2>nul

reg add "HKCU\Control Panel\Desktop" /v ScreenSaveActive /t REG_SZ /d 1 /f
reg add "HKCU\Control Panel\Desktop" /v ScreenSaveTimeOut /t REG_SZ /d 300 /f
reg add "HKCU\Control Panel\Desktop" /v SCRNSAVE.EXE /t REG_SZ /d "%SCR_PATH%" /f

echo.
echo Installation Complete! 
echo The Matrix Screensaver has been set to activate after 5 minutes of inactivity.
pause
