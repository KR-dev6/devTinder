@echo off
REM DevTinder Full Stack Setup Script for Windows

echo.
echo ===============================
echo DevTinder Setup Script
echo ===============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detected
echo.

REM Backend Setup
echo ===============================
echo Setting up Backend...
echo ===============================
cd server

REM Install backend dependencies
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo [OK] Backend dependencies already installed
)

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb+srv://kanakrawat:cscUX4X413ImEcdG@mongopractice.byuwbf3.mongodb.net/devTinder
        echo JWT_SECRET=your_jwt_secret_key_change_in_production
        echo NODE_ENV=development
    ) > .env
    echo [OK] .env file created
    echo [WARNING] Please update MONGODB_URI and JWT_SECRET if needed
) else (
    echo [OK] .env file exists
)

echo [OK] Backend setup complete
echo.
cd ..

REM Frontend Setup
echo ===============================
echo Setting up Frontend...
echo ===============================
cd client

REM Install frontend dependencies
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo [OK] Frontend dependencies already installed
)

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    (
        echo VITE_API_URL=http://localhost:5000/api
    ) > .env
    echo [OK] .env file created
) else (
    echo [OK] .env file exists
)

echo [OK] Frontend setup complete
echo.
cd ..

REM Database seeding option
echo.
echo Do you want to seed the database with sample data? (y/n)
set /p response="Enter choice: "

if /i "%response%"=="y" (
    cd server
    echo Seeding database...
    call npm run seed
    cd ..
)

echo.
echo ===============================
echo Setup complete!
echo ===============================
echo.
echo To start the application:
echo.
echo Terminal 1 - Start Backend:
echo   cd server && npm run dev
echo.
echo Terminal 2 - Start Frontend:
echo   cd client && npm run dev
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend will be available at: http://localhost:5000
echo.
echo Test Credentials:
echo   Email: kanak@devtinder.com
echo   Password: password123
echo.
pause
