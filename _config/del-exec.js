const path = require('path')
const fs = require('fs')
const targetPath = path.resolve('src/utils/_app-config.js')
try {
  fs.unlinkSync('' + targetPath)
} catch (e) {

}
