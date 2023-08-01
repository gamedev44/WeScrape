@echo off

:check_node_js_installed
node -v >NUL 2>&1
if %errorlevel% neq 0 (
    goto :node_js_not_installed
) else (
    goto :node_js_installed
)

:node_js_not_installed
cls
echo =========================
echo Video Scraper Menu
echo =========================
echo [1] Download Node.js
echo [2] Exit
echo =========================
choice /c 12 /n /m "Enter the option number: "
if errorlevel 2 (
    exit /b 0
)
if errorlevel 1 (
    echo Please wait while Node.js is being downloaded...
    timeout /t 3 >NUL
    start https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi
    pause
    goto :check_node_js_installed
)

:node_js_installed
cls
echo =========================
echo Video Scraper Menu
echo =========================
echo Node.js is installed!
echo [1] Start React.js App
echo [2] Start Node.js Server
echo [3] Exit
echo =========================
choice /c 123 /n /m "Enter the option number: "
if errorlevel 3 (
    exit /b 0
)
if errorlevel 2 (
    start cmd /k "node server.js"
    goto :node_js_installed
)
if errorlevel 1 (
    start cmd /k "npm start"
    goto :node_js_installed
)
