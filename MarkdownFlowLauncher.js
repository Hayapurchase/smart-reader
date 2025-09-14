#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('========================================');
console.log('    Smart Reader - Markdown Reader');
console.log('========================================');
console.log('');

// Get the directory where this script is located
const scriptDir = __dirname;

// Check if package.json exists
const packageJsonPath = path.join(scriptDir, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('Error: package.json not found in the current directory.');
  console.error('Please make sure this executable is in the same directory as your project.');
  process.exit(1);
}

// Check if node_modules exists
const nodeModulesPath = path.join(scriptDir, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('Installing dependencies...');
  console.log('This may take a few minutes on first run.');
  
  const installProcess = spawn('npm', ['install'], {
    stdio: 'inherit',
    shell: true,
    cwd: scriptDir
  });
  
  installProcess.on('error', (error) => {
    console.error('Failed to install dependencies:', error);
    process.exit(1);
  });
  
  installProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Dependencies installed successfully!');
      startApplication();
    } else {
      console.error('Failed to install dependencies.');
      process.exit(1);
    }
  });
} else {
  startApplication();
}

function startApplication() {
  console.log('Starting Smart Reader...');
  console.log('Press Ctrl+C to exit the application.');
  console.log('');

  // Change to the script directory
  process.chdir(scriptDir);

  // Start the Electron application
  const electronProcess = spawn('npm', ['start'], {
    stdio: 'inherit',
    shell: true,
    cwd: scriptDir
  });

  electronProcess.on('error', (error) => {
    console.error('Failed to start Smart Reader:', error);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Make sure Node.js is installed');
    console.error('2. Make sure npm is available in your PATH');
    console.error('3. Try running "npm install" manually');
    process.exit(1);
  });

  electronProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Smart Reader closed successfully.');
    } else {
      console.log(`Smart Reader exited with code ${code}`);
    }
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
}
