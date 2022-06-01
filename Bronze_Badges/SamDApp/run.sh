#!/usr/bin/env bash

echo -e "\x1b[1;32m Changing directory to frontend..."
cd frontend
echo -e "\x1b[1;32m Changed directory to frontend!"


echo -e "\x1b[1;34m Installing required dependencies using NPM..."
npm install
echo -e "\x1b[1;34m Installed required dependencies using NPM!"

echo -e "\x1b[1;32m Starting development server..."
npm run start