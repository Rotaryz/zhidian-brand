<template>
  <div class="shop-card">
    <div class="wrapper">
      <section class="left">
        <div v-if="idx<3" class="icon" :class="'icon-' + idx"></div>
        <p v-if="idx> 2" class="rank">{{idx+1}}</p>
      </section>
      <section class="middle">
        <img v-if="cardInfo.avatar" :src="cardInfo.avatar" alt="" class="logo">
        <img v-else src="./pic-default_people@2x.png" alt="" class="logo">
      </section>
      <section class="right">
        <div class="left-wrapper">{{cardInfo.name}}</div>
        <div class="right-wrapper">
          <p class="number">{{cardInfo.number}}</p>
          <p v-if="useType === 'ai'" class="copy">销售力</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'SHOP_CARD'

  export default {
    name: COMPONENT_NAME,
    props: {
      idx:{
        type: Number,
        default: 0
      },
      cardInfo: {
        type: Object,
        default: () => {}
      },
      useType: {
        type: String,
        default: 'ai'
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .shop-card
    width: 100%
    height :0
    padding-top :17.595307917888565%
    background :transparent
    position: relative
    .wrapper
      fill-box(absolute)
      layout(row,block,nowrap)
      align-items :center
      .left
        width : 22px
        font-family: DIN-Regular;
        font-size: 20px;
        color: #98989F;
        display :flex
        align-items :center
        justify-content :center
        padding-right :10px
        .icon
          width :20px
          height :22.60869565217391px
          &.icon-0
            icon-image('icon-goldmedal')
          &.icon-1
            icon-image('icon-silvermedal')
          &.icon-2
            icon-image('icon-coppermedal')
      .middle
        width :35px
        height :@width
        box-sizing :border-box
        .logo
          width :35px
          height :@width
      .right
        flex: 1
        padding-left :10px
        overflow :hidden
        display :flex
        align-items :center
        .left-wrapper
          flex: 1
          overflow :hidden
          font-family: $font-family-regular
          font-size: 15px;
          color: #1F1F1F;
          line-height :1.2
          no-wrap-plus()
        .right-wrapper
          font-family: DINAlternate-Bold;
          text-align :right
          .number
            font-size: 18px;
            color: #333333;
          .copy
            margin-top :6px
            font-family: $font-family-regular
            font-size: 12px;
            color: #888888;

</style>
