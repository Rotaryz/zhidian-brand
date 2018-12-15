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
        <dl class="scroll-wrapper">
          <h-header></h-header>
          <tab></tab>
          <footer v-if="$route.meta.defaultRouter" class="footer-default">
            <router-view style="z-index: 10"></router-view>
          </footer>
        </dl>
      </scroll>
    </article>
    <!--<h-header></h-header>-->
    <!--<tab></tab>-->
    <!--<footer v-if="$route.meta.defaultRouter" class="footer-default">-->
      <!--<router-view style="z-index: 10"></router-view>-->
    <!--</footer>-->
    <footer v-if="!$route.meta.defaultRouter">
      <base-router-view style="z-index: 20" @refresh="refresh"></base-router-view>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from './tab-boss/tab-boss'
  import {infoMethods} from '@state/helpers'
  import HHeader from './h-header/h-header'
  import Scroll from '@components/scroll/scroll'

  const PAGE_NAME = 'HOME'

  export default {
    name: PAGE_NAME,
    page: {
      title: '品牌管理',
      meta: [{name: 'description', content: 'description'}]
    },
    components: {
      Tab,
      HHeader,
      Scroll
    },
    data() {
      return {
        dataArray: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        page: 1,
        limit: 10,
        hasMore: true,
        isEmpty: false
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
    },
    methods: {
      ...infoMethods,
      refresh() {
        this.updateMerchant('', false)
      },
      scroll(pos) {
        console.log(pos)
      },
      // scroll事件
      onPullingUp() {
        if (!this.pullUpLoad) return this.$refs.scroll.forceUpdate()
        this.page++
        // this._getList({}, false)
        // console.log('触底上拉加载')
      },
      onPullingDown() {
        // if (!this.pullDownRefresh) return this.$refs.scroll.forceUpdate()
        this.page = 1
        this.hasMore = true
        this.pullUpLoad = true
        // this._getList({}, false)
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
  $tab-top = 42.13333333333333vw
  @import "~@design"
  .home
    height :100vh
    background :$color-background
    box-sizing :border-box
  .footer-default
    fill-box(absolute)
    top: $tab-top
    bottom :0
</style>
