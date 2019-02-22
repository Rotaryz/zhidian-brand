<template>
  <div class="h-tab border-bottom-1px">
    <div class="h-wrapper ">
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
    <!--<div style="height: 19.5px;background-color: #fff"></div>-->
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
    padding :30px 37.5px 0px
    background : $tab-background
    .h-wrapper
      position :relative
      .tab-wrapper
        position :relative
        width :100%
        box-sizing :border-box
        layout(row,block,nowrap)
        padding-bottom :13px
        .tab-item
          position: relative
          overflow: hidden
          height: 100%
          flex:1
          layout()
          justify-content :center
          align-items :center
          font-family: $font-family-medium
          font-size: 15px
          color: #333
          transition :color 0.6s
          &.active
            color: #5929DC
      .line-wrapper
        position :absolute
        left :0
        right :0
        height :4px
        bottom :0
        width :(100/3)%
        transform :translate3d(0,0,0)
        transition :all 0.3s
        display :flex
        align-items :center
        justify-content :center
        .line
          width :42.5px
          height :100%
          background-image: linear-gradient(127deg, #953DE1 0%, #4541F9 100%);
          border-radius: 2px;
</style>
