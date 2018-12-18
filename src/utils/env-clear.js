import storage from 'storage-controller'
const APP_CONFIG = require('./_app-config.js')
export function envClear() {
  const env = APP_CONFIG.env + '：'+ APP_CONFIG.api
  const app = APP_CONFIG.app
  const currentEnv = storage.get('env')
  if (env !== currentEnv) {
    storage.clear()
    storage.set('env', env)
  }
  console.warn('应用' + app)
  console.warn('环境：' + env)
}

envClear()
