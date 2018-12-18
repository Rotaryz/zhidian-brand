const path = require('path')
const fs = require('fs')
const argv = process.argv
// 获取路径
const APP = {
  me: 'me',
  platform: 'platform',
}
const ENV = {
  dev: 'dev.config.js',
  release: 'release.config.js',
  production: 'production.config.js'
}
let appPath = APP.platform
let envPath = ENV.production
argv.forEach((item) => {
  let key = item.toLowerCase()
  APP[key] && (appPath = APP[key])
  ENV[key] && (envPath = ENV[key])
})
const filePath = path.join(__dirname,'' + appPath, '' + envPath)
// 写文件
const targetPath = path.resolve('src/utils/app-config.js')
const content = fs.readFileSync(filePath, 'utf-8')
try {
  fs.unlinkSync('' + targetPath)
} catch (e) {

}
fs.writeFileSync('' + targetPath, content, 'utf-8')
