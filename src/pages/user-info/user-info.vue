<template>
  <form class="user-info">
    <dl class="top">
      <dt class="t-item border-bottom-1px header">
        <div class="left">LOGO</div>
        <label class="right">
          <img class="logo" :src="logoUrl" alt="">
          <base-right-arrow cname="user-info"></base-right-arrow>
          <base-wx-input accept="image/*" style="display: none" @change="_fileChange"></base-wx-input>
        </label>
      </dt>
      <dd class="t-item border-bottom-1px">
        <div class="left">名称</div>
        <label class="right">
          <input v-model="merchantName" class="input" type="text" placeholder="请输入名称" maxlength="50"
                 @keyup.enter="_updateUserInfo" @blur="_updateUserInfo"
          >
        </label>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">类型</div>
        <div class="right">{{merchantInfo.merchantTypeName}}</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">行业</div>
        <div class="right">{{merchantInfo.industryName}}</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">姓名</div>
        <div class="right">{{merchantInfo.nickName}}</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">手机号</div>
        <div class="right">{{merchantInfo.mobile}}</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">账号数量</div>
        <div class="right" @click="showCoverHandle">
          <p class="number">{{merchantInfo.accountUsed}}/{{merchantInfo.accountTotal}}</p>
          <base-right-arrow cname="user-info"></base-right-arrow>
        </div>
      </dd>
    </dl>
    <section class="button-wrapper">
      <div class="btn" @click="logoutHandle">退出登录</div>
    </section>
    <cropper ref="cropper" :aspect="1" @confirm="cropperConfirm"></cropper>
    <transition name="fade">
      <div v-show="isShowCover" class="cover" @click="hideCoverHandle">
        <div class="cover-content" @click.stop>
          <div class="content-top">
            <p class="top-txt">
              <span>账号数量剩余</span>
              <span class="red-num">{{residualAccount}}</span>
              <span>个，需要增加账号数量请联系平台客服({{serverPhone}})</span>
            </p>
          </div>
          <div class="content-down border-top-1px" @click="callHandle">立即拨打</div>
        </div>
      </div>
    </transition>
  </form>
</template>

<script type="text/ecmascript-6">
  import Cropper from '@components/cropper/cropper'
  import {DEFAULT_LOGO, SEVER_HPONE} from '@utils/constant'
  import {infoComputed} from '@state/helpers'
  import API from '@api'
  const PAGE_NAME = 'USER_INFO'
  export default {
    name: PAGE_NAME,
    page:{
      title: '账号信息',
      meta: [{name: '账号信息', content: 'description'}]
    },
    components: {
      Cropper
    },
    data() {
      return {
        isShowCover: false,
        serverPhone: SEVER_HPONE,
        logoUrl: DEFAULT_LOGO,
        logoId: 0,
        merchantName: ''
      }
    },
    computed: {
      ...infoComputed,
      residualAccount() {
        return this.merchantInfo.accountTotal - this.merchantInfo.accountUsed
      }
    },
    watch: {
      merchantInfo() {
        this._initUserInfo()
      }
    },
    created() {
      this._initUserInfo()
    },
    beforeDestroy() {
      console.log(33333)
    },
    beforeRouteLeave(to, from, next) {
      console.log(to)
      next()
    },
    methods: {
      // 初始化数据
      _initUserInfo() {
        Object.assign(this.$data, this.merchantInfo)
      },
      // 退出登录
      logoutHandle() {
        this.$storage.remove('token')
        this.$router.replace('/login')
      },
      // 弹窗
      showCoverHandle() {
        this.isShowCover = true
      },
      hideCoverHandle() {
        this.isShowCover = false
      },
      callHandle() {
        this.hideCoverHandle()
        window.location.href = `tel: ${this.serverPhone}`
      },
      // 更新用户信息
      _updateUserInfo() {
        API.Global.updateUserInfo(this.$data, false).then(() => {
          this.$emit('refresh')
        })
      },
      // 选择图片
      _fileChange(e, type) {
        let arr = Array.from(e.target.files)
        if (arr.length <= 0) {
          return
        }
        this.$refs.cropper.show(arr[0])
      },
      async cropperConfirm(e) {
        this.$loading.show()
        let resArr = await this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e.file])
        let res = resArr[0]
        if (res.error !== this.$ERR_OK) {
          return this.$toast.show(res.message)
        }
        let obj = {
          image_id: res.data.id,
          image_url: res.data.url,
          id: 0
        }
        this.logoUrl = obj.image_url
        this.logoId = obj.image_id
        this.$loading.hide()
        this.$refs.cropper.cancel()
        this._updateUserInfo()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  input
    height :14px
    &::-webkit-input-placeholder
      color: #DAD9E2
    &::-ms-input-placeholder
      color: #DAD9E2
    &::-moz-placeholder
      color: #DAD9E2

  .user-info
    z-index: 20
    fill-box(fixed)
    background :$color-background
    .cover
      fill-box(fixed)
      background: rgba(39,39,62,0.8)
      layout()
      justify-content :center
      align-items :center
      z-index: 25
      .cover-content
        width: 300px
        height: 160px
        background: $color-white
        border: 1px solid rgba(32,32,46,0.10)
        border-radius: 6px
        .content-top
          height: 115px
          display: flex
          align-items: center
          justify-content: center
          .top-txt
            padding: 0 20px
            line-height: 24px
            font-family: $font-family-regular
            text-align: center
            color: $color-text-main
            word-break: break-all
            .red-num
              font-size: 19px
              font-family: PingFang-SC-Heavy
              color: $color-main

        .content-down
          line-height: 45px
          color: $color-main
          font-family: $font-family-regular
          font-size: $font-size-14
          letter-spacing: 0.6px
          text-align: center
    .top
      position :relative
      background :#fff
      padding-left :15px
      .t-item
        layout(row,block,nowrap)
        padding-right :15px
        height :55px
        font-family: PingFangSC-Regular
        font-size: 14px
        line-height: 1
        &.header
          height :70px
        .left
          color: #777799
          layout()
          justify-content :center
        .right
          position :relative
          flex: 1
          height :100%
          layout(row,block,nowrap)
          justify-content :flex-end
          align-items :center
          color: #9B9B9B
          .number
            margin-right :5px
          .logo
            width :49px
            height :@width
            border-radius :2px
            margin-right :5px
          .input
            color: #363547
            height :14px
            line-height :1
            outline :none
            text-align :right
    .button-wrapper
      margin :30px 15px
      .btn
        height :44px
        line-height :@height
        background: $color-main
        border-radius: 44px
        font-family: PingFangSC-Regular
        font-size: 16px
        color: #FFFFFF
        letter-spacing: 1px
        text-align: center
</style>
