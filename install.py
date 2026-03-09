import os
import subprocess
import platform
import shutil

print("==============================================")
print("         Matrix Screensaver Installer         ")
print("==============================================")

if platform.system() != 'Windows':
    print("Warning: This screensaver is designed for Windows.")

print("\nInstalling dependencies...")
subprocess.run("npm install", shell=True, check=True)

print("\nPackaging Electron App...")
subprocess.run("npx electron-packager . MatrixScreensaver --platform=win32 --arch=x64 --out=dist --overwrite", shell=True, check=True)

print("\nApplying Windows Screensaver settings...")
base_path = os.getcwd()
exe_path = os.path.join(base_path, "dist", "MatrixScreensaver-win32-x64", "MatrixScreensaver.exe")
scr_path = os.path.join(base_path, "dist", "MatrixScreensaver-win32-x64", "MatrixScreensaver.scr")

if os.path.exists(exe_path):
    shutil.move(exe_path, scr_path)

if platform.system() == 'Windows':
    import winreg
    try:
        key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Control Panel\Desktop", 0, winreg.KEY_SET_VALUE)
        winreg.SetValueEx(key, "ScreenSaveActive", 0, winreg.REG_SZ, "1")
        winreg.SetValueEx(key, "ScreenSaveTimeOut", 0, winreg.REG_SZ, "300")
        winreg.SetValueEx(key, "SCRNSAVE.EXE", 0, winreg.REG_SZ, scr_path)
        winreg.CloseKey(key)
        print("\nInstallation Complete!")
        print("The Matrix Screensaver has been set to activate after 5 minutes of inactivity.")
    except Exception as e:
        print(f"[ERROR] Failed to set registry keys: {e}")
else:
    print(f"\nSkipped setting Windows registry keys (Current OS: {platform.system()}).")
    print(f"To use on Windows, set SCRNSAVE.EXE to: {scr_path}")
