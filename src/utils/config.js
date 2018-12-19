// const env = process.env
// const version = ``
// const LOCAL_URL = {
//   api: 'http://local.com'
// }
//
// const DEV_URL = {
//   api: 'https://zhidian-api.jerryf.cn'
// }
//
// const TEST_URL = {
//   api: 'https://zhidian-api.jkweixin.net' + version,
//   upload: 'https://zhidian-api.jkweixin.net' + version
// }
//
// const PROD_URL = {
//   api: 'https://zhidian-api.jkweixin.com' + version,
//   upload: 'https://zhidian-api.jkweixin.com' + version
// }
// export const BASE_URL
//   env.NODE_ENV === 'production'
//     ? PROD_URL
//     : env.NODE_ENV === 'development'
//       ? TEST_URL
//       : env.NODE_ENV === 'development'
//         ? DEV_URL
//         : LOCAL_URL
import APP_CONFIG from './_app-config'
// const APP_CONFIG = require('./_app-config')
export const ERR_OK = 0
export const BASE_URL = APP_CONFIG
