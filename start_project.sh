#!/bin/bash

# Function to clean up processes on exit
cleanup() {
  echo "Shutting down backend server..."
  kill $BACKEND_PID
  echo "Shutting down frontend server..."
  kill $FRONTEND_PID
}

# Trap EXIT signal to ensure cleanup function is called when script exits
trap cleanup EXIT

# Navigate to the backend directory and install dependencies
cd backend
echo "Installing backend dependencies..."
npm i & # The ampersand allows the script to continue without waiting for npm i to finish

# Start the backend server in the background
echo "Starting backend server..."
npm run develop &

# Store the backend PID so we can wait for it if needed
BACKEND_PID=$!

# Navigate to the frontend directory in a subshell to keep it separate
(
cd ../frontend
echo "Installing frontend dependencies..."
npm i & # Same as before, allows the script to continue
wait # Wait for npm i to finish before continuing

echo "Starting frontend server..."
npm run dev &
FRONTEND_PID=$!
wait $FRONTEND_PID
)

# Wait for the backend installation and start command to complete
wait $BACKEND_PID

echo "Project started successfully."
