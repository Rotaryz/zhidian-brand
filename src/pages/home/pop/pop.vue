<template>
  <transition name="fade">
    <div v-if="pop" class="pop">
      <div class="pop-main">
        <h3 class="title">营收 =（主力客户&活跃度&笔单价）<span class="icon"></span></h3>
        <p class="text">主力客户、活跃度和笔单价的增长转化等于店铺的营收</p>
        <div class="btn" @click="closePop">知道了</div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'POP',
    data() {
      return{
        pop: false
      }
    },
    methods: {
      showPop() {
        this.pop = true
      },
      closePop() {
        this.pop = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .pop
    position: fixed
    background: rgba(0,0,0,0.7)
    width: 100vw
    height: 100vh
    top: 0
    left: 0
    z-index: 20
    .pop-main
      border-radius: 6px
      width: 80vw
      padding: 0 20px
      box-sizing: border-box
      position: absolute
      all-center()
      background: #FFF
      .title
        color: #333
        font-size: 16px
        margin-top: 45px
        font-family: $font-family-medium
        text-align: center
        line-height: 1.2
        .icon
          width: 9px
          height: 15px
          margin-bottom: -3px
          icon-image(icon-upup)
      .text
        font-family: $font-family-regular
        font-size: 14px
        color: #666
        text-align: center
        line-height: 1.2
        margin-top: 15px
        padding: 0 20px
      .btn
        width: 110px
        height: 34px
        line-height: 34px
        font-size: 14px
        font-family: "PingFangSC-Regular"
        color: $color-main
        border-1px($color-main, 100px)
        text-align: center
        margin: 30px auto 20px
</style>
