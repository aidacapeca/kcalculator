'use strict';

const path = require('path');
const { spawn } = require('child_process');

const polyfillPath = path.resolve(__dirname, 'polyfills.js').replace(/\\/g, '/');
const existingNodeOptions = process.env.NODE_OPTIONS || '';
const requireOption = `--require=${polyfillPath}`;

process.env.NODE_OPTIONS = `${existingNodeOptions} ${requireOption}`.trim();

const projectRoot = path.resolve(__dirname, '..');
const expoCliPath = require.resolve('expo/bin/cli', { paths: [projectRoot] });
const args = [expoCliPath, ...process.argv.slice(2)];

const child = spawn(process.execPath, args, {
  cwd: projectRoot,
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
