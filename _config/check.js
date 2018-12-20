const fs = require('fs')
const path = require('path')
const {GIT} = require('./constant')
// 需要检查的分支
for(let key in GIT) {
  // console.log(key)
}
// 获取git分支
let gitBranch = fs.readFileSync('.git/HEAD', 'utf-8').trim().replace('ref: refs/heads/', '')
console.log(gitBranch)
// const LineByLine = require('./utils-readline-sync.js')
// let filename = '../src/utils/_app-config'
// let liner = new LineByLine()
// liner.open( filename )
// let theline = ''
// while( !liner._EOF )
// {
//   theline = liner.next()
//   console.log( 'READ LINE: ' + theline )
//   if (theline.includes(branch)) {
//     let key = theline.split(' ')[1].replace(/('|")/g, '')
//     break
//   }
// }
// liner.close()
let appConfigPath = path.resolve(__dirname,'../src/utils/_app-config.js')
let content = fs.readFileSync(appConfigPath,'utf-8')
console.log(content.match(/api:.*,/)[0])
// console.log(fs.readFileSync(appConfigPath,'utf-8'))
