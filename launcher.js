#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting Smart Reader...');

// Get the directory where this executable is located
const scriptDir = path.dirname(process.execPath);

// Check if we're running from a pkg snapshot
const isPkg = typeof process.pkg !== 'undefined';

if (isPkg) {
  // When running from pkg, we need to find the actual project directory
  // Look for package.json in the current working directory or parent directories
  let currentDir = process.cwd();
  let foundProject = false;
  
  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      foundProject = true;
      break;
    }
    currentDir = path.dirname(currentDir);
  }
  
  if (foundProject) {
    process.chdir(currentDir);
    console.log(`Found project in: ${currentDir}`);
  } else {
    console.error('Error: Could not find package.json in current directory or parent directories.');
    console.error('Please run this executable from your project directory.');
    process.exit(1);
  }
} else {
  // When running as a regular Node.js script
  process.chdir(scriptDir);
}

// Start the Electron application
const electronProcess = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

electronProcess.on('error', (error) => {
  console.error('Failed to start Smart Reader:', error);
  console.error('Make sure npm is installed and available in your PATH.');
  process.exit(1);
});

electronProcess.on('close', (code) => {
  console.log(`Smart Reader exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down Smart Reader...');
  electronProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nShutting down Smart Reader...');
  electronProcess.kill('SIGTERM');
});
