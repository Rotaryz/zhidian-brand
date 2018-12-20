const fs = require('fs')
const path = require('path')
const {GIT} = require('./constant')
// 需要检查的分支

// 获取git分支
let gitBranch = fs.readFileSync('.git/HEAD', 'utf-8').trim().replace('ref: refs/heads/', '')
let appConfigPath = path.resolve(__dirname,'../src/utils/_app-config.js')
let api = _readApi(appConfigPath)

for(let key in GIT) {
  if (key === gitBranch) {
    let flag = _readApi(GIT[key])=== api
    if (flag) break
    throw new Error('分支和版本运行不一致请执行 npm run init')
  }
}

function _readApi(url) {
  let appConfigPath = path.resolve(url)
  let content = fs.readFileSync(appConfigPath,'utf-8')
  let api = content.match(/api:.*,/)[0].split(/('|"|`)/)[2].trim()
  let version = content.match(/version.*/) ? content.match(/version.*/)[0].split('=')[1].replace(/('|"|`)/g, '').trim() : ''
  return api + version
}
