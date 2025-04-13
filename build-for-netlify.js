import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Clean the dist directory if it exists
if (fs.existsSync('dist')) {
  console.log('Cleaning dist directory...');
  fs.rmSync('dist', { recursive: true, force: true });
}

// Run the build
console.log('Building the application...');
execSync('npm run build', { stdio: 'inherit' });

// Copy favicon to the dist directory
console.log('Copying favicon to dist directory...');
fs.copyFileSync('public/favicon.ico', 'dist/favicon.ico');

// Create a _headers file in the dist directory
console.log('Creating _headers file in dist directory...');
fs.writeFileSync('dist/_headers', `/*
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0
`);

console.log('Build completed successfully!');
