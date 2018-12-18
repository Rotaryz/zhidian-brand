const path = require('path')
const fs = require('fs')
const argv = process.argv
const mePath = path.join(__dirname,`me.config.js`)
const platformPath = path.join(__dirname,'platform.config.js')
const content = fs.readFileSync(mePath, 'utf-8')
fs.writeFileSync('ret.js', content, 'utf-8')
