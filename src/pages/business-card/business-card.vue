<template>
  <div class="share-card">
    <scroll>
      <div class="card-con"></div>
      <div class="card-main">
        <div class="main-con">
          <div class="title">{{name}}</div>
          <img src="./pic-myshop@2x.png" alt="" class="title-img">
          <img :src="avatar" alt="" class="avatar-img">
          <img :src="qrCodeUrl" alt="" class="avatar-card">
          <div class="qr-code-text">长按识别二维码</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import API from '@api'
  import Scroll from '@components/scroll/scroll'

  export default {
    name: 'ShareCard',
    components: {
      Scroll
    },
    page: {
      title: '店铺二维码'
    },
    data() {
      return {
        avatar: '',
        name: '',
        qrCodeUrl: ''
      }
    },
    created() {
      this._initCardData()
      this._getQrCode()
    },
    methods: {
      _initCardData() {
        this.avatar = this.$storage.get('user').avatar
        this.name = this.$storage.get('user').name
      },
      _getQrCode() {
        // let id = this.$route.query.id
        API.Echart.getQrCode().then((res) => {
          this.$loading.hide()
          if (this.$ERR_OK !== res.error) {
            this.$toast.show(res.message)
            return
          }
          this.qrCodeUrl = res.data.image_url || ''
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  $color-white = #fff
  @import "~@design"
  *
    -webkit-box-sizing: border-box
    box-sizing: border-box

  .share-card
    min-height: 100vh
    fill-box(fixed)
    z-index :100
  .card-con
    padding-top: 31px

  .card-main
    width: 317px
    padding: 20px 20px 25px
    margin: auto
    background: url("./bg-shopcode@2x.png") no-repeat center center
    .main-con
      background: $color-white
      padding-top: 29px
      padding-bottom: 15px
      width: 275px
      margin: 0 auto
      layout()
      align-items: center
      .title
        font-family: $font-family-medium
        font-size: $font-size-18
        color: #20202E
        no-wrap()
        width :90%
      .title-img
        display: block
        width: 175px
        height: 16px
        margin-top: 13.5px
        object-fit :cover
      .avatar-img
        display: block
        width: 235px
        height: 235px
        margin-top: 21px
        object-fit :cover
      .avatar-card
        display: block
        width: 120px
        height: 120px
        padding: 20px
        -webkit-box-sizing: border-box
        box-sizing: border-box
      .qr-code-text
        font-family: $font-family-regular
        font-size: $font-size-12
        color: #7C7C8F
        margin-top: -10px
  .share-card
    background: $color-text-main
</style>
