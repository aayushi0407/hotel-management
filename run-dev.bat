@echo off
title HotelPro Launcher
echo ========================================================
echo         Launching HotelPro (RoomsForUse) System
echo ========================================================
echo.

set "PATH=C:\nvm4w\nodejs;%PATH%"

echo 1. Starting Backend Express Server on http://localhost:8001...
start "HotelPro Server (Port 8001)" cmd /k "cd /d "%~dp0server" && npm run dev"

timeout /t 3 /nobreak >nul

echo 2. Starting Frontend React Client on http://localhost:5173...
start "HotelPro Client (Port 5173)" cmd /k "cd /d "%~dp0client" && npm run dev"

echo.
echo ========================================================
echo HotelPro is up and running!
echo - Client Web App: http://localhost:5173
echo - Backend API:    http://localhost:8001
echo ========================================================
pause
