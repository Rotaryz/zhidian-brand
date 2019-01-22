const path = require('path')
const fs = require('fs')
const {APP,ENV,GIT,VERSION, VERSION_IM} = require('./constant')
const argv = process.argv

// 获取git分支
let gitBranch = fs.readFileSync('.git/HEAD', 'utf-8').trim().replace('ref: refs/heads/', '')
let appPath = APP.platform
let envPath = ENV.production
let version = ''
let versionIm = ''
let filePath = ''
// 判断是命令行中是否有import关键字则忽悠分支
argv.forEach((item) => {
  let key = item.toLowerCase()
  APP[key] && (appPath = APP[key])
  ENV[key] && (envPath = ENV[key])
  VERSION[key] && (version = VERSION[key])
  VERSION_IM[key] && (versionIm = VERSION_IM[key])
})
if (argv.some((val) => val.toLowerCase() === 'important')) {
  // 根据命令行定义文件路径
  // 路径名称
  filePath = path.join(__dirname,'' + appPath, '' + envPath)
} else {
  // 根据分支确定文件路径
  appPath = GIT[gitBranch]
  envPath = ''
  filePath = '' + path.join('' + appPath ,''  +envPath)
}
// 写文件
const targetPath = path.resolve('src/utils/_app-config.js')
let content = fs.readFileSync(filePath, 'utf-8')
// 项目版本号
if (version) {
  content = content.replace(/const version = ``/i, `const version = '${version}'`)
}
// IM版本号
if (versionIm) {
  content = content.replace(/const versionIm = ``/i, `const versionIm = '${versionIm}'`)
}
try {
  fs.unlinkSync('' + targetPath)
} catch (e) {

}
fs.writeFileSync('' + targetPath, content, 'utf-8')
console.log(content)
console.log('项目版本号：' + version)
console.log('IM版本号：' + versionIm)
if (!version) {
  console.error('========= 未添加版本号! =============')
  // throw Error('========= 未添加版本号! =============')
}
if (!versionIm) {
  console.error('========== 未添加IM版本号! ==========')
  // throw Error('========== 未添加IM版本号! ==========')
}
/**========END=======**/
