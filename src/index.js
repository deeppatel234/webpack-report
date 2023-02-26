const webpack = require("webpack");
const opener = require("opener");
const chalk = require("chalk");

const server = require("./server");
const utils = require("./utils");

const defaultOptions = {
  host: "localhost",
  port: 1237,
  open: true,
  statsOptions: {},
  packageJsonPath: undefined,
};

const defaultstateOptions = {
  color: true,
  source: true,
};

class WebpackReport {
  constructor(props = {}) {
    this.options = { ...defaultOptions, ...props };

    const packageJson = utils.getPackageJson(this.options.packageJsonPath);

    this.isServerStarted = false;
    this.buildStatus = "compiling";
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
    this.buildStatus = "done";

    this.clientData.progress = {
      percentage: 100,
      message: "done",
    };

    try {
      const statsObj = stats.toJson({
        ...defaultstateOptions,
        ...this.options.statsOptions,
      });
      this.clientData.stateData = utils.formateState(statsObj);
    } catch (e) {
      console.log(chalk.red(`Error in parsing state data`));
      console.log(chalk.red(e.message));
    }

    if (!this.isServerStarted) {
      return;
    }

    server.hostBuildFolder(this.clientData.stateData.outputPath);
    server.io.emit("data", this.clientData);
  }

  progressCallBack(percentage, message) {
    this.clientData.progress = {
      percentage: parseInt(percentage * 100, 10),
      message,
    };

    if (!this.isServerStarted) {
      return;
    }

    server.io.emit("data", this.clientData);
  }

  startServer() {
    const { port, host, open } = this.options;
    const { http, io } = server;

    http.listen(port, host, () => {
      const url = `http://${host}:${port}`;

      console.log(chalk.green(`Starting webpack-report on: ${chalk.bold(url)}`));

      this.isServerStarted = true;

      if (open) {
        opener(url);
      }

      io.on("connection", (socket) => {
        socket.emit("data", this.clientData);
      });
    });
  }

  apply(compiler) {
    this.startServer();

    console.log(chalk.green(`Initialize webpack-report plugin`));

    const doneCallBack = this.doneCallBack.bind(this);
    const progressCallBack = this.progressCallBack.bind(this);

    const progressPlugin = new webpack.ProgressPlugin(progressCallBack);

    progressPlugin.apply(compiler);

    if (compiler.hooks) {
      compiler.hooks.done.tapAsync("webpack-report", doneCallBack);
    } else {
      compiler.plugin("done", doneCallBack);
    }
  }
}

module.exports = WebpackReport;
