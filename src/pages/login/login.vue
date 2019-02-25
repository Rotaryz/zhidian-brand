<template>
  <transition>
    <div class="login">
      <div class="logo">
        <img class="logo-img" :src="logoUrl" alt="">
      </div>
      <p class="l-text">品牌管理系统</p>
      <section v-if="phoneNumber.length >= 11 && codeStyle" class="warn">
        <div class="icon-warn"></div>
        <div>手机号码格式错误</div>
      </section>
      <div class="content">
        <section class="input-wrapper mobile border-bottom-1px">
          <div class="left">
            <input ref="phone" v-model="phoneNumber" class="input" type="tel" placeholder="请输入手机号码"
                   maxlength="11"
            >
          </div>
          <div v-if="phoneNumber.length > 0" class="del" @click="delHandle"></div>
        </section>
        <section class="input-wrapper mobile border-bottom-1px">
          <div class="left">
            <input v-model="authCode" class="input" type="number" placeholder="请输入验证码" maxlength="11">
          </div>
          <div v-if="allowGetCode" class="get-code" :class="codeStyle? 'coding' : ''" @click="getCode">获取验证码</div>
          <div v-else class="get-code coding">重新发送{{codeSeconds}}s</div>
        </section>
        <section class="btn" :class="btnStyle || codeStyle?'unable':''" @click="submit">
          <div class="txt">登录</div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {DEFAULT_LOGO} from '@utils/constant'
  import {checkIsPhoneNumber} from '@utils/common'
  import API from '@api'
  import storage from 'storage-controller'

  export default {
    name: 'LOGIN',
    page: {
      title: '登陆',
      meta: [{name: 'description', content: 'description'}]
    },
    data() {
      return {
        phoneNumber: '',
        authCode: '',
        allowGetCode: true,
        codeSeconds: 59,
        timer: null,
        showQrCode: false,
        codeStyle: true,
        btnStyle: true,
        isShow: false,
        logoUrl: DEFAULT_LOGO
      }
    },
    watch: {
      codeSeconds(curVal) {
        if (curVal <= 0) {
          this.timer && clearInterval(this.timer)
          this.allowGetCode = true
          this.codeSeconds = 59
        }
      },
      phoneNumber(curVal) {
        if (checkIsPhoneNumber(curVal)) {
          this.codeStyle = false
        } else {
          this.codeStyle = true
        }
      },
      authCode(curVal) {
        if (curVal) {
          this.btnStyle = false
        } else {
          this.btnStyle = true
        }
      }
    },
    created() {
      this._initLoginData()
      this.$loading.hide()
      this._hide()
    },
    methods: {
      _initLoginData() {
        this.logoUrl = storage.get('logoUrl', DEFAULT_LOGO)
      },
      _hide() {
        let token = storage.get('token')
        if (token) {
          this.$router.replace('/')
        }
      },
      delHandle() {
        this.phoneNumber = ''
        this.$refs.phone.focus()
      },
      async submit() {
        if (!this._check()) return
        let data = {
          code: this.authCode,
          mobile: this.phoneNumber
        }
        try {
          // token
          const res = await API.Jwt.getToken(data)
          const token = res.data.access_token
          const merchantInfo = res.data.merchant_info
          this.$storage.set('token', token)
          this.$storage.set('info', merchantInfo)

          // 设置总店
          const resp = await API.ShopManager.getMainStore()
          this.$storage.set('selectStore', resp.data)

          // 跳转
          this.$router.replace('/home')
        } catch (e) {
          console.error(e)
        }
      },
      getCode() {
        if (!checkIsPhoneNumber(this.phoneNumber)) {
          this.$toast.show('请输入正确的手机号码')
          return
        }
        if (!this.allowGetCode) return
        this.allowGetCode = false
        this.timer = setInterval(() => {
          --this.codeSeconds
        }, 1000)
        API.Jwt.getSms({mobile: this.phoneNumber}).then((res) => {
          this.$toast.show(`验证码已发送至${this.phoneNumber}，请注意查收!`)
        })
      },
      _check() {
        if (!checkIsPhoneNumber(this.phoneNumber)) {
          this.$toast.show('请输入正确的手机号码')
          return false
        }
        if (!this.authCode) {
          this.$toast.show('请输入验证码')
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .login
    fill-box(fixed)
    z-index: 300
    background: #fff
    layout(column,block,nowrap)
    align-items: center
    .logo
      margin: 8vw 0 4vw
      width: 18.666666666666668vw
      height: @width
      min-height :70px
      background: #FFFFFF
      box-shadow: 0 8px 20px 0 rgba(39,39,39,0.1)
      border-radius: 3.733333333333334vw
      layout()
      justify-content :center
      align-items :center
      overflow :hidden
      .logo-img
        width: 18.666666666666668vw
        height: @width
        min-height :70px
        object-fit :cover
    .l-text
      font-family: PingFangSC-Medium
      font-size: 16px
      color: #27273E
      letter-spacing: 1px
      text-align: center
      line-height: 1
      margin-bottom :14vw
    .warn
      row-center()
      top: 37.28vw
      layout(row)
      align-items: center
      justify-content: center
      font-family: $font-family-light
      font-size: 12px
      color: #EF705D
      letter-spacing: 0.08px
      .icon-warn
        margin-right: 5px
        height: 12px
        width: @height
        icon-image(icon-login_prompt)
    .content
      font-family: PingFangSC-Regular
      padding: 0 50px
      box-sizing: border-box
      width: 100%
      .input-wrapper
        height: 64.5px
        display: flex
        flex-direction: row
        flex-wrap: nowrap
        align-items: center
        padding: 0 1px
        .left
          layout(row, block, nowrap)
          align-items: center
          flex: 1
          overflow: hidden
        .del
          width: 17px
          height: 17px
          icon-image(icon-del34)
          extend-click()
        .get-code
          height: 30px
          padding: 0 9.5px 0 10px
          background: #FFFFFF
          border-1px(#EF705D, 100px)
          font-size: 14px
          color: #EF705D
          text-align: center
          line-height: @height
          &.coding
            color: #ccc
            border-1px(#ccc, 100px)
      .btn
        margin-top: 40px
        height: 45px
        background: #d42b2b
        layout(row, block, nowrap)
        align-items: center
        justify-content: center
        border-radius :45px
        &.unable
          opacity: 0.5
        .txt
          font-size: 16px
          color: #FFFFFF
          letter-spacing: 1px

  .input
    height: 40px
    flex: 1
    overflow: hidden
    font-size: 16px
    outline: none
    margin-right: 10px
    font-family: PingFangSC-Regular
    color: #363537
    letter-spacing: 1px
    &::-webkit-input-placeholder
      color: #C8C8C8
      font-size: 16px
      letter-spacing: 1px
    &:-moz-placeholder
      color: #C8C8C8
      font-size: 16px
      letter-spacing: 1px
    &::-moz-placeholder
      color: #C8C8C8
      font-size: 16px
      letter-spacing: 1px
    &:-ms-input-placeholder
      color: #C8C8C8
      font-size: 16px
      letter-spacing: 1px

</style>
