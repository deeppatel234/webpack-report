<p align="center">
  <img src="https://github.com/deeppatel234/webpack-report/blob/master/assets/logo-title.png?raw=true" width="80%"/>
</p>

<h2 align="center">Webpack Build Analysis Plugin</h2>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![NPM Download](https://img.shields.io/npm/dt/webpack-report.svg)](https://www.npmjs.com/package/webpack-report) [![NPM](https://img.shields.io/npm/v/webpack-report.svg)](https://www.npmjs.com/package/webpack-report)

## Installation

- Download and install npm package

```sh
#NPM
npm install webpack-report

#YARN
yarn add webpack-report
```

## Usage

```js
const WebpackReport = require('webpack-report');

module.exports = {
  plugins: [
    new WebpackReport()
  ]
}
```

## Features

- describe your project informations like dependency, dev-dependency etc.
- show webpack build informations like warnings, error, build time etc.
- detailed Assets, Modules and chunks informations with interactive graphs.

## Screenshots

<p align="center">
  <img src="https://github.com/deeppatel234/webpack-report/blob/master/assets/screenshots/dashboard.png?raw=true" width="80%"/>
</p>
<p align="center">
  <img src="https://github.com/deeppatel234/webpack-report/blob/master/assets/screenshots/assets.png?raw=true" width="30%"/>
  <img src="https://github.com/deeppatel234/webpack-report/blob/master/assets/screenshots/modules.png?raw=true" width="30%"/>
  <img src="https://github.com/deeppatel234/webpack-report/blob/master/assets/screenshots/chunks.png?raw=true" width="30%"/>
</p>

## Options
```js
  new WebpackReport(options)
```

| Name  | Type  | Default | Description  |
| ------ | ------ | ------ | ------ |
| `host`  | string  | localhost  | webpack-report server host name |
| `port`  | number  | 5060  | webpack-report server run at this port  |
| `open`  | boolean  | true  |  open report in default browser  |
| `statsOptions`  | object  |   | options passed in `stats.toJson()` method.  |
| `packageJsonPath`  | string  |   | project package.json custom file path  |

## Contribute

- clone repository

- install dependency
```js
  npm install
```

- go to example folder and install dependency too
```js
  npm install
```

- start the dev server using

```js
  npm start
```

dev server will start in `http://localhost:5070`

## License

MIT
