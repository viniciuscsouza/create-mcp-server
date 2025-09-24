#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const tsxPath = path.resolve(__dirname, '../node_modules/.bin/tsx');
const scriptPath = path.resolve(__dirname, '../src/index.ts');
const args = process.argv.slice(2);

spawn(tsxPath, [scriptPath, ...args], { stdio: 'inherit' });
