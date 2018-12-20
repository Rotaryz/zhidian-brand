const path = require('path')
const fs = require('fs')
const {APP,ENV,GIT} = require('./constant')
const argv = process.argv

// 获取git分支
let gitBranch = fs.readFileSync('.git/HEAD', 'utf-8').trim().replace('ref: refs/heads/', '')
let appPath = APP.platform
let envPath = ENV.production
let filePath = ''
// 判断是命令行中是否有import关键字则忽悠分支
if (argv.some((val) => val.toLowerCase() === 'important')) {
  // 根据命令行定义文件路径
  argv.forEach((item) => {
    let key = item.toLowerCase()
    APP[key] && (appPath = APP[key])
    ENV[key] && (envPath = ENV[key])
  })
  // 路径名称
  filePath = path.join(__dirname,'' + appPath, '' + envPath)
} else {
  // 根据分支确定文件路径
  filePath = _resolveBranchPath(gitBranch, argv)
}
// 写文件
const targetPath = path.resolve('src/utils/_app-config.js')
const content = fs.readFileSync(filePath, 'utf-8')
try {
  fs.unlinkSync('' + targetPath)
} catch (e) {

}
fs.writeFileSync('' + targetPath, content, 'utf-8')

/**
 * 根据分支名称或参数名称定义路径
 * @param branch 分支名
 * @param argv 参数名
 * @returns {string[]}
 * @private
 */
function _resolveBranchPath(branch, argv) {
  let appPath = ''
  let envPath = ENV.production
  let flag = true // 通过分支匹配
  // 通过分支匹配
  if (GIT[gitBranch]) {
    // 分支路径全匹配
    appPath = GIT[gitBranch]
    envPath = ''
    flag = false // 匹配成功关闭
  } else if (gitBranch){
    // 服务器上匹配分支
    // const LineByLine = require('./utils-readline-sync.js')
    // let filename = '.git/FETCH_HEAD'
    // let liner = new LineByLine()
    // liner.open( filename )
    // let theline = ''
    // console.log(branch, '======CURRENT HEAD========')
    // while( !liner._EOF )
    // {
    //   theline = liner.next()
    //   console.log( 'READ LINE: ' + theline )
    //   if (theline.includes(branch)) {
    //     let key = theline.split(' ')[1].replace(/('|")/g, '')
    //     appPath = GIT[key]
    //     envPath = ''
    //     flag = false // 匹配成功关闭
    //     break
    //   }
    // }
    // liner.close()
  }
  // 分支路径包含,一般用于开发 （分支+命令）
  if (flag) {
    for(let val in APP) {
      appPath = branch.includes(val) ? GIT[val] : GIT.default
    }
    argv.forEach((item) => {
      let key = item.toLowerCase()
      ENV[key] && (envPath = ENV[key])
    })
  }
  let filePath = path.join('' + appPath ,''  +envPath)
  return '' + filePath
}
