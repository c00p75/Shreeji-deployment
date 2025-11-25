#!/bin/bash

# Development script to run all Shreeji services
# This script starts NestJS backend and main website (admin dashboard is integrated at /admin)

set -e

# Colors for output
RED='\033[0;31m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}🚀 Starting all Shreeji development services...${NC}\n"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping all services...${NC}"
    kill $BACKEND_PID $WEBSITE_PID 2>/dev/null || true
    wait $BACKEND_PID $WEBSITE_PID 2>/dev/null || true
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT SIGTERM

# Start NestJS Backend (port 4000)
echo -e "${RED}[backend]${NC} Starting NestJS Backend..."
cd ../shreeji-ecommerce-backend
npm run start:dev > /tmp/shreeji-backend.log 2>&1 &
BACKEND_PID=$!
cd - > /dev/null

# Start main website (port 3000)
echo -e "${BLUE}[website]${NC} Starting main website..."
pnpm dev > /tmp/shreeji-website.log 2>&1 &
WEBSITE_PID=$!

echo -e "\n${GREEN}✅ All services started!${NC}\n"
echo -e "Services running:"
echo -e "  ${RED}[backend]${NC} NestJS Backend   → http://localhost:4000"
echo -e "  ${BLUE}[website]${NC} Main Website    → http://localhost:3000"
echo -e "  ${GREEN}[admin]${NC}   Admin Dashboard → http://localhost:3000/admin"
echo -e "\n${YELLOW}Press Ctrl+C to stop all services${NC}\n"
echo -e "View logs:"
echo -e "  tail -f /tmp/shreeji-backend.log"
echo -e "  tail -f /tmp/shreeji-website.log\n"

# Wait for all processes
wait

