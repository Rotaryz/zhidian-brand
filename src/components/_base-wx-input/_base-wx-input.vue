<template>
  <input v-if="android" type="file" accept="image/*" :multiple="multiple>1" @change="_change">
  <input v-else type="button" @click="clickHandle">
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  import API from '@api'
  import {mapActions, mapGetters} from 'vuex'
  import {createFileName} from '@utils/cos/handle'
  // 判断是否为模拟器或者安卓
  function isToolsOrAndroid() {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = '' + window.navigator.userAgent.toLowerCase()
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串且是IOS系统
    let isWeChatTools = /wechatdevtools/i.test(ua) // 是在微信浏览器
    let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua) // 是IOS系统
    return isWeChatTools || !isIos
  }

  const android = isToolsOrAndroid()
  const COMPONENT_NAME = 'BASE_WX_INPUT'
  const Global = API.Global

  export default {
    name: COMPONENT_NAME,
    props: {
      multiple: {
        // 照片张数
        type: Number,
        default: 1
      },
      outFileType: {
        // 输出类型
        type: String,
        default: 'file'
      },
      debugModel: {
        // debug模式
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        android: android
      }
    },
    computed: {
      ...mapGetters('wxApiRegister', ['register'])
    },
    created() {
      this._getWxSdk()
    },
    methods: {
      ...mapActions('wxApiRegister', ['updateRegister']),
      _change(e) {
        this.$emit('change', e)
      },
      _showLoading() {
        this.loading && this.$loading.show()
      },
      // event
      async clickHandle() {
        let arr = []
        let obj = {target: {files: null}}
        try {
          let data = await this._chooseImage()
          this._showLoading()
          Promise.all(
            data.map((imageId) => {
              return this._getLocalImgData(imageId)
            })
          ).then((base64Arr) => {
            // file类型
            if (this.outFileType === 'file') {
              base64Arr.forEach((b64) => {
                let file = this.dataURLtoFile(b64)
                arr.push(file)
              })
            } else {
              // base64类型
              arr = base64Arr
            }
            obj.target.files = arr
            this.$emit('change', obj)
          })
        } catch (e) {
          if (this.debugModel) {
            alert(JSON.stringify(e) + '%error%')
          }
        }
      },
      // 选择照片
      _chooseImage() {
        return new Promise((resolve, reject) => {
          wx.chooseImage({
            count: this.multiple, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
              let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              resolve(localIds)
            }
          })
        })
      },
      // 获取本地图片信息
      _getLocalImgData(id) {
        return new Promise((resolve, reject) => {
          wx.getLocalImgData({
            localId: id, // 图片的localID
            success: function(res) {
              let localData = res.localData // localData是图片的base64数据，可以用img标签显示
              resolve(localData)
            }
          })
        })
      },
      // base64转file类型
      dataURLtoFile(base64, filename, fileType = 'image/jpeg') {
        fileType = fileType.replace(/jgp/i, 'jpeg')
        let bstr
        if (/base64/.test(base64)) {
          let arr = []
          arr = base64.split(',')
          fileType = arr[0].match(/:(.*?);/)[1]
          bstr = atob(arr[1])
        } else {
          bstr = atob(base64)
        }
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        filename = createFileName(fileType)
        return new File([u8arr], filename, {type: fileType})
      },
      // 注册api
      _getWxSdk() {
        let url = window.location.href
        // 防止重复注册
        if (this.register.some((val) => val.url === url)) return
        Global.jssdkConfig({url}).then((res) => {
          if (res.error !== this.$ERR_OK) return
          this.updateRegister({url})
          res = res.data
          wx.config({
            debug: this.debugModel, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '' + res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: '' + res.timestamp, // 必填，生成签名的时间戳
            nonceStr: '' + res.nonceStr, // 必填，生成签名的随机串
            signature: '' + res.signature, // 必填，签名，见附录1
            jsApiList: ['chooseImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
