const path = require('path')
/**
 * 注意: !important
 * 定义应用的时候,key值对应val值要和GIT版本里面的正好对应
 * @type {{me: string, platform: string}}
 */
// 应用类型
const APP = {
  me: 'me',
  platform: 'platform',
}
// 环境环境文件路径(要统一名称)
const ENV = {
  dev: 'dev.config.js',
  release: 'release.config.js',
  production: 'production.config.js'
}
// git版本的分支对应路径
// key值对应分支名
const GIT = {
  'me-release': path.join(__dirname,'' + APP.me, '' + ENV.release),
  'me-master': path.join(__dirname,'' + APP.me, '' + ENV.production),
  'released': path.join(__dirname,'' + APP.platform, '' + ENV.release),
  'master': path.join(__dirname,'' + APP.platform, '' + ENV.production),
  'me': path.join(__dirname, '' + APP.me),
  'default': path.join(__dirname, '' + APP.platform),
  'dev_version' : ''
}

// 版本号
const VERSION = _createVersion()
// IM版本号
const VERSION_IM = _createVersionIm()

module.exports = {
  APP,
  ENV,
  GIT,
  VERSION,
  VERSION_IM
}
function _createVersion(length = 6) {
  let version = {}
  new Array(length).fill(1).forEach((item, index) => {
    let code = index + 1
    version[`v${code}`]  = `/v${code}`
  })
  return version
}

function _createVersionIm(length = 6) {
  let version = {}
  new Array(length).fill(1).forEach((item, index) => {
    let code = index + 1
    version[`im-v${code}`]  = `/v${code}`
  })
  return version
}
