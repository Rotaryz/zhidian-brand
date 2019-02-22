<template>
  <div class="h-header">
    <div class="wrapper">
      <div class="bg"></div>
      <div class="empty"></div>
      <div class="card-wrapper">
        <div class="card-container">
          <router-link tag="section" to="/home/user-info" class="c-top">
            <img class="logo" :src="merchantInfo.logoUrl" alt="">
            <article class="middle">
              <div class="m-top">{{merchantInfo.merchantName}}</div>
              <div class="m-bottom">账号数量：{{merchantInfo.accountUsed}}/{{merchantInfo.accountTotal}}</div>
            </article>
            <div class="right">
              <base-right-arrow cname="home"></base-right-arrow>
            </div>
          </router-link>
          <ul class="c-bottom">
            <router-link tag="li" to="/home/shop-detail" class="b-item">
              <div class="icon detail"></div>
              <span>新建店铺</span>
            </router-link>
            <li class="line"></li>
            <router-link tag="li" to="/home/shop-list" class="b-item">
              <div class="icon list"></div>
              <span>全部店铺</span>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {DEFAULT_LOGO} from '@utils/constant'
  import {infoComputed} from '@state/helpers'

  const COMPONENT_NAME = 'H_HEADER'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        logo: DEFAULT_LOGO
      }
    },
    computed: {
      ...infoComputed
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .h-header
    height :0
    padding-top :38.4%
    position :relative
    background :#fff
    z-index :2
    .wrapper
      fill-box(absolute)
      layout()
      align-items :center
      .bg
        position :absolute
        height :34.93333333333333vw
        top:0
        left :0
        right :0
        icon-image('bg-khxq')
      .empty
        height :4vw
      .card-wrapper
        position :relative
        width :92vw
        height :0
        padding-top :34.4%
        background: #FFFFFF
        box-shadow: 0 8px 20px 0 rgba(39,39,39,0.06)
        border-radius: 6px
        overflow :hidden
        .card-container
          position :absolute
          top:0
          left :0
          top:0
          width :100%
          bottom :0
          layout()
          .c-top
            width: 100%
            flex: 1.3888888888888888
            overflow: hidden
            box-sizing border-box
            layout(row,block,nowrap)
            align-items :center
            .logo
              width :14.666666666666666vw
              height :@width
              padding :0 10px
              border-radius :100%
              object-fit :cover
              display: block
            .middle
              flex:1
              overflow :hidden
              color: #27273E
              display: flex
              flex-direction: column
              margin :5px 0
              justify-content :space-between
              .m-top
                font-family: PingFangSC-Medium
                font-size: 16px
                letter-spacing: 0.6px
                no-wrap()
              .m-bottom
                margin-top :10px
                opacity: 0.8
                font-family: PingFangSC-Regular
                font-size: 14px
            .right
              padding :0 15px
              height :100%
              layout()
              justify-content :center
          .c-bottom
            flex: 1
            layout(row,block,nowrap)
            align-items :center
            .line
              height :12.5px
              width :1px
              opacity: 0.3;
              background :#152532
            .b-item
              flex:1
              layout(row,block,nowrap)
              justify-content :center
              font-family: PingFangSC-Regular
              font-size: 14px
              color: #27273E
              line-height: 1
              position :relative
              &:before
                content: ''
                position: absolute
                top: -20px
                left: 0
                right: 0
                bottom: -20px
              .icon
                width :15px
                height :@width
                margin-right :6px
                &.detail
                  icon-image(icon-addshop)
                &.list
                  icon-image(icon-allshop)
</style>
