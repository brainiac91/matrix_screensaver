Write-Host "==============================================" -ForegroundColor Green
Write-Host "         Matrix Screensaver Installer         " -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

if (!(Get-Command npm -errorAction SilentlyContinue)) {
    Write-Host "[ERROR] npm is not installed. Please install Node.js first." -ForegroundColor Red
    exit
}

Write-Host "`nInstalling dependencies..."
npm install

Write-Host "`nPackaging Electron App..."
npx electron-packager . MatrixScreensaver --platform=win32 --arch=x64 --out=dist --overwrite

Write-Host "`nApplying Windows Screensaver settings..."
$BasePath = (Get-Location).Path
$ExePath = Join-Path -Path $BasePath -ChildPath "dist\MatrixScreensaver-win32-x64\MatrixScreensaver.exe"
$ScrPath = Join-Path -Path $BasePath -ChildPath "dist\MatrixScreensaver-win32-x64\MatrixScreensaver.scr"

if (Test-Path $ExePath) {
    Rename-Item -Path $ExePath -NewName "MatrixScreensaver.scr" -Force
}

Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name "ScreenSaveActive" -Value "1"
Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name "ScreenSaveTimeOut" -Value "300"
Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name "SCRNSAVE.EXE" -Value $ScrPath

Write-Host "`nInstallation Complete!" -ForegroundColor Green
Write-Host "The Matrix Screensaver has been set to activate after 5 minutes of inactivity." -ForegroundColor Cyan
