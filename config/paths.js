const path = require('path');

// Directory alias
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const DIST_DIR = path.resolve(__dirname, '../dist');
const CLIENT_DIR = path.resolve(__dirname, '../src/client');
const UI_DIR = path.resolve(CLIENT_DIR, './components/UI');
const COMPONENTS_DIR = path.resolve(CLIENT_DIR, './components');

module.exports = {
  PUBLIC_DIR,
  DIST_DIR,
  CLIENT_DIR,
  UI_DIR,
  COMPONENTS_DIR,
};
