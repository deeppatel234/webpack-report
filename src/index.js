const webpack = require('webpack');
const opener = require('opener');

const server = require('./server');
const utils = require('./utils');

class WebpackDashboard {
  constructor(props = {}) {
    this.options = props;

    this.options.host = props.host || 'localhost';
    this.options.port = parseInt(props.port || 5060, 10);
    this.options.open = true;

    const packageJson = utils.getPackageJson(this.options.packageJsonPath);

    this.isServerStarted = false;
    this.clientData = {
      packageJson,
      progress: {
        percentage: 0,
        message: null,
      },
      stateData: {},
    };
  }

  doneCallBack(stats) {
    this.clientData.stateData = utils.formateState(
      stats.toJson({
        color: true,
      }),
    );

    if (!this.isServerStarted) {
      return;
    }

    server.io.emit('data', this.clientData);
  }

  progressCallBack(percentage, message) {
    this.clientData.progress = {
      percentage: parseInt(percentage * 100, 10),
      message,
    };

    if (!this.isServerStarted) {
      return;
    }

    server.io.emit('data', this.clientData);
  }

  startServer() {
    const { port, host, open } = this.options;
    const { http, io } = server;

    http.listen(port, host, () => {
      console.log(`Starting dashboard on: http://${host}:${port}`);
      this.isServerStarted = true;

      if (open) {
        opener(`http://${host}:${port}`);
      }

      io.on('connection', socket => {
        socket.emit('data', this.clientData);
      });
    });
  }

  apply(compiler) {
    this.startServer();

    const doneCallBack = this.doneCallBack.bind(this);
    const progressCallBack = this.progressCallBack.bind(this);

    compiler.apply(new webpack.ProgressPlugin(progressCallBack));

    if (compiler.hooks) {
      compiler.hooks.done.tapAsync('my-webpack-dashboard', doneCallBack);
    } else {
      compiler.plugin('done', doneCallBack);
    }
  }
}

module.exports = WebpackDashboard;
