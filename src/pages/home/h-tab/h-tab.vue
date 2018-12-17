<template>
  <div class="h-tab">
    <div class="h-wrapper">
      <nav class="tab-wrapper">
        <ul class="line-wrapper" :style="{transform: 'translate3d(' + tabIndex*100+'%,0,0)'}">
          <li class="line"></li>
        </ul>
        <template v-for="(item,index) in tabList">
          <div :key="index" class="tab-item" :class="{active: index === tabIndex}" @click="changeHandle(index)">
            {{item.text}}
          </div>
        </template>
      </nav>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'H_TAB'
  const TABS = [
    {text: '总览', path: '/home/overview', id: 1},
    {text: '排行榜', path: '/home/ranking', id: 2},
    {text: 'AI分析', path: '/home/ai-analyse', id: 3}
  ]
  export default {
    name: COMPONENT_NAME,
    props: {
      tabIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        tabList: TABS
      }
    },
    methods: {
      changeHandle(index) {
        this.$emit('change', index)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $tab-boss-height = (32+40)px
  $tab-background = #fff
  $tab-line-color = #D32F2F
  @import "~@design"

  .h-tab
    padding :20px 50px
    background : $tab-background
    .h-wrapper
      position :relative
      border-radius :6px 6px 0 0
      .tab-wrapper
        position :relative
        height :32px
        background :rgba(218,217,226,0.3)
        border-radius :32px
        width :100%
        box-sizing :border-box
        layout(row,block,nowrap)
        .tab-item
          position: relative
          overflow: hidden
          height: 100%
          flex:1
          layout()
          justify-content :center
          align-items :center
          font-family: $font-family-regular
          font-size: 16px
          color: #27273E
          transition :all 0s
          &.active
            color: #fff
      .line-wrapper
        position :absolute
        left :0
        right :0
        height :100%
        width :(100/3)%
        border-radius :32px
        transform :translate3d(0,0,0)
        transition :all 0.3s
        .line
          fill-box(absolute)
          background :$color-main
          border-radius :32px
</style>
