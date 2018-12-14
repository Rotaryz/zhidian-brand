<template>
  <div v-if="showTab" class="tab">
    <div class="tab-wrapper">
      <router-link v-for="(item,index) in tabList" :key="index" tag="section" class="tab-item" :to="item.path">
        <div class="item-container">
          <section class="line-wrapper">
            <div class="line"></div>
          </section>
          <p class="icon-text">{{item.text}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  const COMPONENT_NAME = 'TAB_BOSS'
  const TABS = [
    {text: '总览', path: '/home/overview', id: 1},
    {text: '排行榜', path: '/home/ranking', id: 2},
    {text: 'AI分析', path: '/home/other-pages', id: 3}
  ]
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        tabList: TABS,
        showTab: true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $tab-top = 42.13333333333333vw
  $tab-boss-height = (32+40)px
  $tab-background = #fff
  $tab-line-color = #D32F2F
  @import "~@design"
  .tab
    position: fixed
    top: $tab-top
    bottom :0
    width: 100vw
    height: $tab-boss-height
    background: $tab-background
    display: flex
    align-items :center
    z-index :15
    box-sizing border-box
    padding :0 50px
    .tab-wrapper
      height :32px
      background :rgba(218,217,226,0.3)
      border-radius :32px
      width :100%
      display: flex
      justify-content :space-between
      align-items :center
      .tab-item
        position: relative
        overflow: hidden
        height: 100%
        flex:1
        .item-container
          position: relative
          overflow: hidden
          width: 100%
          height: 100%
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          font-size: 0
          .icon-text
            position: relative
            font-family: $font-family-regular
            font-size: 16px
            color: #27273E
          .line-wrapper
            position: absolute
            left: 0
            right: 0
            bottom: 0
            top: 0
            display: flex
            justify-content: center
            align-items: center
            opacity :0
            transition: all .3s
            border-radius: 32px
            overflow :hidden
            .line
              width: 100%
              height: 100%
              background-color: $tab-line-color
        &.router-link-active
          .line-wrapper
            opacity :1
          .icon-text
            color: #fff
</style>
