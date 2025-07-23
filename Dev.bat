@echo off

REM Step 1: Run the Back-End in a new window
start cmd /k "cd Back-End && bal run"

REM Step 2: Run the Front-End in a new window
start cmd /k "cd Front-End && npm run dev"

echo Back-End and Front-End are running in parallel.
