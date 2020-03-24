const path = require('path');

// Directory alias
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const DIST_DIR = path.resolve(__dirname, '../dist');
const CLIENT_DIR = path.resolve(__dirname, '../src/client');

module.exports = {
  PUBLIC_DIR,
  DIST_DIR,
  CLIENT_DIR,
};
