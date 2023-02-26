const express = require("express");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const PATHS = require("../../config/paths");

app.use(express.static(PATHS.DIST_DIR));

app.use((req, res, next) => {
  if (req.path.startsWith("/build")) {
    return next();
  }

  res.sendFile(`${PATHS.DIST_DIR}/index.html`);
});

const hostBuildFolder = (buildPath) => {
  app.use("/build", express.static(buildPath));
};

module.exports = {
  http,
  io,
  hostBuildFolder,
};
