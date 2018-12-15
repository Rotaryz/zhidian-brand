<template>
  <div class="invitation">
    <div class="scroll-main">
      <article class="top">
        <div class="title">欢迎加入{{merchantInfo.merchantName}}</div>
        <div class="qr-code">
          <img v-if="qrCode" class="qr-img" :src="qrCode" alt="">
        </div>
        <div class="explain">请长按二维码保存或者发送给店员</div>
      </article>
      <div class="btn-item">
        <div class="txt" @click="copyHandle">复制链接</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  import QrCodeUtil from '@utils/create-qr-code'
  import {infoComputed} from '@state/helpers'

  export default {
    page: {
      title: '发送邀请'
    },
    data() {
      return {
        qrCode: '',
        linkUrl: ''
      }
    },
    computed: {
      ...infoComputed
    },
    created() {
      this._getQrCode()
    },
    methods: {
      _getQrCode() {
        API.ShopManager.getQrCode().then((res) => {
          QrCodeUtil.createQrCodePng(res.data.link_url, (url) => {
            this.qrCode = url
          })
          this.linkUrl = res.data.link_url
        })
      },
      copyHandle() {
        this.$copyText(this.linkUrl).then((res) => {
          let msg = `${res.text}\n已经复制至剪切板`
          this.$toast.show(msg)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .invitation
    fill-box(fixed)
    overflow: hidden
    z-index: 71
    background: $color-background
    padding: 30px 35px 0
    min-height: 100vh
    .scroll-main
      padding-bottom: 10px
    .top
      background: #363537
      border-radius: 4px
      padding-bottom: 20px
      .title
        font-family: PingFangSC-Medium
        font-size: 16px
        color: #FFFFFF
        letter-spacing: 0.6px
        text-align: center
        padding-top: 15vw
      .qr-code
        width: 60vw
        height: @width
        background: #FFFFFF;
        border: 1px solid rgba(130, 138, 162, 0.20)
        border-radius: 6px
        margin: 8vw auto 12px
        overflow: hidden
        .qr-img
          box-sizing border-box
          width: 100%
          height: 100%
      .explain
        font-size: 14px
        color: #f1f1f1
        text-align: center
        padding-top: 10px
        padding-bottom: 10vw

    .btn-group
      margin-top: 40px
      layout(row)
      justify-content: space-around
      .btn-item
        text-align: center
        .icon
          display: inline-block
          width: 30px
          height: @width
          margin-bottom: 8.35px
          &.save
            icon-image(icon-savepic)
          &.copy
            icon-image(pic-link)
        .txt
          font-size: 14px
          color: #706B82
          text-align: center

  .btn-item
    width: 160px
    height: 32px
    line-height: 32px
    font-size: $font-size-14
    border-radius: 20px
    color: #EF705D
    text-align: center
    margin: 0 auto
    margin-top: 30px
    border: 1px solid #EF705D

  #copyTxt, #copyIos
    position: fixed
    left: -200px
    bottom: -200px
</style>
