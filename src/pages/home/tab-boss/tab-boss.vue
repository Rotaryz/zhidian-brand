<template>
  <div v-if="showTab" class="tab border-bottom-1px">
    <router-link v-for="(item,index) in tabList" :key="index" tag="div" class="tab-item" :to="item.path">
      <div class="item-container">
        <section class="line-wrapper">
          <div class="line"></div>
        </section>
        <p class="icon-text">{{item.text}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
  const COMPONENT_NAME = 'TAB_BOSS'
  const TABS = [
    {text: '总览', path: '/home/test-page1', id: 1},
    {text: '排行榜', path: '/home/test-page', id: 2},
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
  $tab-boss-height = 50px
  $tab-background = #363547
  $tab-line-color = #EF705D
  @import "~@design"
  .tab
    position: fixed
    top: 200px
    width: 100vw
    height: $tab-boss-height
    background: $tab-background
    display: flex
    .tab-item
      position: relative
      flex: 1
      overflow: hidden
      height: 100%
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
        .icon
          position: relative
          width: 20px
          height: 20px
          margin-bottom: 3px
        .icon-text
          position: relative
          font-family: $font-family-regular
          font-size: 16px
          color: #fff
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
          transition: all .6s
          .line
            width: 85px
            height: 32px
            background-color: $tab-line-color
            border-radius: 100px
      &.router-link-active
        .line-wrapper
          opacity :1
</style>
