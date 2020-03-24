const webpack = require('webpack');
const server = require('./server');

class WebpackDashboard {
  constructor(opts = {}) {
    // const currentWorkingDirectory = process.cwd();
    opts.host = opts.host || 'localhost';
    opts.port = parseInt(opts.port || 3030, 10);

    this.options = opts;

    this.isServerStarted = false;
  }

  doneCallBack(stats) {
    // console.log(stats.toJson())
    console.log('complete');
  }

  startServer() {
    const { port, host } = this.options;

    server.http.listen(port, host, function() {
      console.log(`Starting dashboard on: http://${host}:${port}`);
    });
  }

  apply(compiler) {
    this.startServer();

    compiler.apply(
      new webpack.ProgressPlugin((percentage, message) => {
        console.log(percentage, message);
      }),
    );

    const doneCallBack = this.doneCallBack.bind(this);
    if (compiler.hooks) {
      compiler.hooks.done.tapAsync('my-webpack-dashboard', doneCallBack);
    } else {
      compiler.plugin('done', doneCallBack);
    }
  }
}

module.exports = WebpackDashboard;
