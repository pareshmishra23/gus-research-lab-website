#!/usr/bin/env bash

# =========================================================
# GUS Research Lab — Native Local Development Launcher
# Starts Spring Boot Backend and Vite Frontend (No Docker)
# =========================================================

set -e

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend/api"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"

echo -e "${CYAN}=========================================================${NC}"
echo -e "${CYAN}   GUS Research Lab — Native Application Launcher        ${NC}"
echo -e "${CYAN}=========================================================${NC}"

# Cleanup function for SIGINT / SIGTERM / EXIT
cleanup() {
    echo -e "\n${YELLOW}[!] Stopping native application services...${NC}"
    if [ -n "$BACKEND_PID" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
        echo -e "${YELLOW}--> Stopping Spring Boot Backend (PID: $BACKEND_PID)...${NC}"
        kill "$BACKEND_PID" 2>/dev/null || true
    fi
    if [ -n "$FRONTEND_PID" ] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
        echo -e "${YELLOW}--> Stopping React/Vite Frontend (PID: $FRONTEND_PID)...${NC}"
        kill "$FRONTEND_PID" 2>/dev/null || true
    fi
    echo -e "${GREEN}[✓] All native processes stopped cleanly.${NC}"
}

trap cleanup SIGINT SIGTERM EXIT

# 1. Verify Directories
if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}[X] Error: Backend directory not found at $BACKEND_DIR${NC}"
    exit 1
fi

if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}[X] Error: Frontend directory not found at $FRONTEND_DIR${NC}"
    exit 1
fi

# 2. Check Prerequisites
echo -e "${BLUE}[1/4] Checking environment dependencies...${NC}"
if command -v mvn &>/dev/null; then
    MAVEN_CMD="mvn"
elif [ -f "${BACKEND_DIR}/mvnw" ]; then
    MAVEN_CMD="./mvnw"
else
    echo -e "${RED}[X] Neither 'mvn' nor './mvnw' wrapper found.${NC}"
    exit 1
fi

if ! command -v npm &>/dev/null; then
    echo -e "${RED}[X] 'npm' is not installed or not in PATH.${NC}"
    exit 1
fi

# 3. Start Spring Boot Backend
echo -e "${BLUE}[2/4] Starting Spring Boot Backend (Port 8080)...${NC}"
cd "$BACKEND_DIR"
$MAVEN_CMD spring-boot:run > "${PROJECT_ROOT}/backend.log" 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}[✓] Spring Boot process launched (PID: ${BACKEND_PID}). Logs: backend.log${NC}"

# Wait for backend health endpoint
echo -e "${YELLOW}--> Waiting for Spring Boot API to become ready...${NC}"
MAX_RETRIES=30
RETRY_COUNT=0
BACKEND_READY=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s http://localhost:8080/actuator/health | grep -q '"status":"UP"' 2>/dev/null; then
        BACKEND_READY=true
        break
    fi
    sleep 2
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo -n "."
done

echo ""
if [ "$BACKEND_READY" = true ]; then
    echo -e "${GREEN}[✓] Spring Boot Backend is UP & Healthy! (http://localhost:8080)${NC}"
else
    echo -e "${YELLOW}[!] Backend startup is taking extra time. Proceeding with Frontend startup...${NC}"
fi

# 4. Start Frontend
echo -e "${BLUE}[3/4] Starting Vite/React Frontend (npm run dev)...${NC}"
cd "$FRONTEND_DIR"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}--> Installing frontend dependencies...${NC}"
    npm install
fi

npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}[✓] Vite Frontend dev server launched (PID: ${FRONTEND_PID}).${NC}"

# 5. Ready Summary
echo -e "\n${CYAN}=========================================================${NC}"
echo -e "${GREEN}  GUS Research Lab Application is RUNNING NATIVELY!       ${NC}"
echo -e "${CYAN}=========================================================${NC}"
echo -e "  🌐 Frontend App:     ${GREEN}http://localhost:5173${NC}"
echo -e "  ⚙️  Spring Boot API:  ${GREEN}http://localhost:8080/api${NC}"
echo -e "  🏥 Health Endpoint:  ${GREEN}http://localhost:8080/actuator/health${NC}"
echo -e "  🔑 Admin Panel:      ${GREEN}http://localhost:5173/admin${NC}"
echo -e "${CYAN}=========================================================${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop all native services.${NC}\n"

# Wait for child processes
wait $BACKEND_PID $FRONTEND_PID
