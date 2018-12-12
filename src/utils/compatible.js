// 兼容部分ios手机input失焦后页面上移问题
;(function() {
  let u = navigator.userAgent
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // 这个判断 是不是ios手机
  let flag
  let myFunction
  let isWeixin = isWeiXin()
  if (isWeixin && isiOS) {
    // 既是微信浏览器 又是ios============（因为查到只有在微信环境下，ios手机上才会出现input失去焦点的时候页面被顶起）
    document.body.addEventListener('focusin', () => {
      // 软键盘弹起事件
      flag = true
      clearTimeout(myFunction)
    })
    document.body.addEventListener('focusout', () => {
      // 软键盘关闭事件
      flag = false
      if (!flag) {
        myFunction = setTimeout(function() {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'}) // 重点  =======当键盘收起的时候让页面回到原始位置
        }, 200)
      } else {
        return false
      }
    })
  } else {
    return false
  }
})()

function isWeiXin() {
  // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  let ua = '' + window.navigator.userAgent.toLowerCase()
  // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
  return /MicroMessenger/i.test(ua)
}
