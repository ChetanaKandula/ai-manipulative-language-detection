#!/bin/bash

echo "======================================"
echo " Starting Manipulens AI"
echo "======================================"

cd "$(dirname "$0")"

# Activate virtual environment
source venv/bin/activate

echo "Starting Backend..."
osascript -e 'tell application "Terminal" to do script "cd '"$PWD"' && source venv/bin/activate && python -m uvicorn backend.app:app --reload"'

sleep 2

echo "Starting Frontend..."
osascript -e 'tell application "Terminal" to do script "cd '"$PWD"'/frontend && npm run dev"'

echo ""
echo "Backend  : http://127.0.0.1:8000/docs"
echo "Frontend : http://localhost:5173"