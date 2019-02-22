<template>
  <div class="home" @touchmove.prevent>
    <article class="scroll-container">
      <scroll
        ref="scroll"
        bcColor="#F8F7FA"
        :data="dataArray"
        :pullUpLoad="pullUpLoadObj"
        :showNoMore="false"
        :pullDownRefresh="pullDownRefreshObj"
        @pullingUp="onPullingUp"
        @pullingDown="onPullingDown"
      >
        <nav class="scroll-wrapper">
          <h-header></h-header>
          <h-tab :tabIndex="tabIndex" @change="changeHandle"></h-tab>
          <overview v-if="tabIndex === 0"></overview>
          <rank-list v-if="tabIndex === 1" ref="ranking" @loadEnd="loadEndHandle"></rank-list>
          <ai-analyse v-if="tabIndex === 2" ref="analyse" @loadEnd="loadEndHandle"></ai-analyse>
        </nav>
      </scroll>
    </article>
    <footer>
      <base-router-view style="z-index: 20" @refresh="refresh"></base-router-view>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
// import Tab from './tab-boss/tab-boss'
  import {infoMethods} from '@state/helpers'
  import HHeader from './h-header/h-header'
  import Scroll from '@components/scroll/scroll'
  import HTab from './h-tab/h-tab'
  import Overview from './overview/overview'
  // import Ranking from './ranking/ranking'
  import AiAnalyse from './ai-analyse/ai-analyse'
  import RankList from './rank-list/rank-list'

  const PAGE_NAME = 'HOME'

  export default {
    name: PAGE_NAME,
    page: {
      title: '品牌管理',
      meta: [{name: 'description', content: 'description'}]
    },
    components: {
      HTab,
      HHeader,
      Scroll,
      Overview,
      // Ranking,
      AiAnalyse,
      RankList
    },
    data() {
      return {
        dataArray: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        pullDownRefresh: false,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        tabIndex: -1
      }
    },
    computed: {
      // scroll事件监听
      pullUpLoadObj: function() {
        return this.pullUpLoad
          ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
          }
          : false
      },
      pullDownRefreshObj: function() {
        return this.pullDownRefresh
          ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            stop: parseInt(this.pullDownRefreshStop),
            txt: '没有更多了'
          }
          : false
      }
    },
    watch: {
      // scroll事件监听
      pullUpLoadObj: {
        handler() {
          if (!this.pullUpLoad) return
          this.rebuildScroll()
        },
        deep: true
      },
      pullDownRefreshObj: {
        handler() {
          if (!this.pullDownRefresh) return
          this.rebuildScroll()
        },
        deep: true
      }
    },
    created() {
      this.updateMerchant('')
      this.tabIndex = 0
    },
    beforeDestroy() {
      this.tabIndex = -1
    },
    methods: {
      ...infoMethods,
      refresh() {
        this.updateMerchant('', false)
      },
      changeHandle(index) {
        this.tabIndex = index
        this.$refs.scroll.forceUpdate()
      },
      scroll(pos) {
      },
      _loadMore() {
        this.$refs.ranking && this.$refs.ranking.onPullingUp()
        this.$refs.analyse && this.$refs.analyse.onPullingUp()
      },
      loadEndHandle(arr) {
        this.dataArray = arr
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 150)
      },
      // scroll事件
      onPullingUp() {
        // console.log('触底上拉加载')
        this._loadMore()
      },
      onPullingDown() {
      // console.log('下拉刷新')
      },
      rebuildScroll() {
        this.$nextTick(() => {
          this.$refs.scroll && this.$refs.scroll.destroy()
          this.$refs.scroll && this.$refs.scroll.initScroll()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .home
    height :100vh
    background :$color-background
    box-sizing :border-box
    .scroll-container
      fill-box(fixed)
</style>
