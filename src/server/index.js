const express = require('express');
const app = express();

const PATHS = require('../../config/paths');

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static(PATHS.DIST_DIR));

app.use((req, res) => {
  res.sendFile(`${PATHS.DIST_DIR}/index.html`);
});

module.exports = {
  http,
  io,
};
