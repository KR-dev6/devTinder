#!/bin/bash

# DevTinder Full Stack Setup Script
# This script sets up the entire MERN project

echo "🚀 DevTinder Setup Script"
echo "========================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js detected${NC}"

# Backend Setup
echo -e "\n${YELLOW}Setting up Backend...${NC}"
cd server

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠ .env file not found in server directory${NC}"
    echo "Creating .env file with default values..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://kanakrawat:cscUX4X413ImEcdG@mongopractice.byuwbf3.mongodb.net/devTinder
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
    echo "⚠️  Please update MONGODB_URI and JWT_SECRET if needed"
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

echo -e "${GREEN}✓ Backend setup complete${NC}"
cd ..

# Frontend Setup
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd client

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

echo -e "${GREEN}✓ Frontend setup complete${NC}"
cd ..

# Seed database option
echo -e "\n${YELLOW}Do you want to seed the database with sample data? (y/n)${NC}"
read -r response

if [[ "$response" == "y" ]]; then
    cd server
    echo "Seeding database..."
    npm run seed
    cd ..
fi

echo -e "\n${GREEN}✓ Setup complete!${NC}"
echo -e "\n${YELLOW}To start the application:${NC}"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd server && npm run dev"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd client && npm run dev"
echo ""
echo "Frontend will be available at: http://localhost:5173"
echo "Backend will be available at: http://localhost:5000"
echo ""
echo "Test Credentials:"
echo "  Email: kanak@devtinder.com"
echo "  Password: password123"
