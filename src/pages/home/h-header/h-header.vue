<template>
  <div class="h-header">
    <div class="wrapper">
      <div class="bg"></div>
      <div class="empty"></div>
      <div class="card-wrapper">
        <div class="card-container">
          <section class="c-top">
            <img class="logo" :src="logo" alt="">
            <article class="middle">
              <div class="m-top">国颐堂</div>
              <div class="m-bottom">账号数量：2/100</div>
            </article>
            <router-link tag="div" to="user-info" append class="right">
              <base-right-arrow cname="home" path="user-info"></base-right-arrow>
            </router-link>
          </section>
          <ul class="c-bottom">
            <router-link tag="li" to="shop-list/shop-detail" append class="b-item">
              <div class="icon detail"></div>
              <p>新建店铺</p>
            </router-link>
            <li class="line"></li>
            <router-link tag="li" to="shop-list" append class="b-item">
              <div class="icon list"></div>
              <p>全部店铺</p>
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
    padding-top :42.13333333333333%
    position :relative
    background :$color-background
    .wrapper
      fill-box(absolute)
      layout()
      align-items :center
      .bg
        position :absolute
        height :21.866666666666667vw
        top:0
        left :0
        right :0
        icon-image(bg-ppgl)
      .empty
        height :5.333333333333334vw
      .card-wrapper
        position :relative
        width :92%
        height :0
        padding-top :32.800000000000004%
        background: #FFFFFF
        box-shadow: 0 8px 20px 0 rgba(39,39,39,0.06)
        border-radius: 6px
        .card-container
          fill-box(absolute)
          layout()
          .c-top
            padding-top :13.5px
            height :14.492753623188406vw
            layout(row,block,nowrap)
            .logo
              width :14.492753623188406vw
              height :@width
              padding :0 10px
              border-radius :100%
            .middle
              flex:1
              color: #27273E
              line-height :1
              layout()
              margin :5px 0
              justify-content :space-between
              .m-top
                font-family: PingFangSC-Medium
                font-size: 16px
                letter-spacing: 0.6px
              .m-bottom
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
