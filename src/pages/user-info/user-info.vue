<template>
  <form class="user-info">
    <dl class="top">
      <dt class="t-item border-bottom-1px header">
        <div class="left">LOGO</div>
        <label class="right">
          <img class="logo" :src="logoUrl" alt="">
          <base-right-arrow cname="user-info"></base-right-arrow>
          <base-wx-input accept="image/*" @change="_fileChange($event, 'images')"></base-wx-input>
        </label>
      </dt>
      <dd class="t-item border-bottom-1px">
        <div class="left">名称</div>
        <label class="right">
          <input v-model="shopName" class="input" type="text" placeholder="请输入名称" maxlength="50">
        </label>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">类型</div>
        <div class="right">品牌店</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">行业</div>
        <div class="right">品牌店</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">姓名</div>
        <div class="right">品牌店</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">手机号</div>
        <div class="right">品牌店</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">账号数量</div>
        <div class="right">品牌店</div>
      </dd>
    </dl>
    <section class="button-wrapper">
      <div class="btn">退出登录</div>
    </section>
    <cropper ref="cropper" :aspect="1" @confirm="cropperConfirm"></cropper>
  </form>
</template>

<script type="text/ecmascript-6">
  import Cropper from '@components/cropper/cropper'
  import {DEFAULT_LOGO} from '@utils/constant'

  const PAGE_NAME = 'USER_INFO'
  export default {
    name: PAGE_NAME,
    components: {
      Cropper
    },
    data() {
      return {
        logoUrl: DEFAULT_LOGO,
        shopName: ''
      }
    },
    methods: {
      logout() {
        this.$storage.remove('token')
        this.$router.replace('/login')
      },
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
        this.$loading.hide()
        this.$refs.cropper.cancel()
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
    z-index :20px
    fill-box(fixed)
    background :$color-background
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
