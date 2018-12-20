const fs = require('fs')
const path = require('path')
const {GIT} = require('./constant')
// 需要检查的分支

// 获取git分支
let gitBranch = fs.readFileSync('.git/HEAD', 'utf-8').trim().replace('ref: refs/heads/', '')
console.log(gitBranch)

let appConfigPath = path.resolve(__dirname,'../src/utils/_app-config.js')
let content = fs.readFileSync(appConfigPath,'utf-8')
let api = content.match(/api:.*,/)[0].split(/('|"|`)/)[2].trim()
let version = content.match(/version.*/) ? content.match(/version.*/)[0].split('=')[1].replace(/('|"|`)/g, '').trim() : ''
console.log(api + version)
let apiVersion = api + version

for(let key in GIT) {
  console.log(key)
  console.log(gitBranch)
  if (key === gitBranch) {
    console.log(key)
    console.log(apiVersion)
  }
}
