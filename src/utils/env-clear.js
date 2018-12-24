import storage from 'storage-controller'
import APP_CONFIG from './_app-config'
// const APP_ENV = process.env.NODE_ENV
// 清理缓存
function envClear() {
  const env = APP_CONFIG.env + '：' + APP_CONFIG.api
  const app = APP_CONFIG.app
  const currentEnv = storage.get('env')
  if (env !== currentEnv && currentEnv) {
    storage.clear()
    storage.set('env', env)
  }
  console.warn('应用' + app)
  console.warn('环境：' + env)
}
// 检查生产环境是否配置正确
// function checkVersion() {
//   if (APP_CONFIG.env !== APP_ENV && APP_ENV === 'production') {
//     throw new Error('生产环境配置不一致')
//   }
// }
// checkVersion()
envClear()
