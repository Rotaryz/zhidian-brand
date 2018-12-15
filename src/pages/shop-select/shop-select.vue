<template>
  <div class="shop-select">
    <div class="scroll-container">
      <scroll
        v-if="dataArray.length"
        ref="scroll"
        bcColor="#F8F7FA"
        :data="dataArray"
        :pullUpLoad="pullUpLoadObj"
        :showNoMore="showNoMore"
        :pullDownRefresh="pullDownRefreshObj"
        @pullingUp="onPullingUp"
        @pullingDown="onPullingDown"
      >
        <dl class="scroll-wrapper">
          <dt class="placeholder-box-15"></dt>
          <dd v-for="(item,index) in dataArray" :key="index" class="scroll-item">
            <s-item useType="check" :itemInfo="item" @change="changeHandle"></s-item>
          </dd>
          <dt class="placeholder-box-15"></dt>
        </dl>
      </scroll>
      <section v-if="isEmpty" class="exception-box">
        <exception errType="nodata"></exception>
      </section>
    </div>
    <section class="button-group">
      <div class="btn" @click="submitHandle">确定</div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '@components/scroll/scroll'
  import SItem from '@components/s-item/s-item'
  import API from '@api'
  import storage from 'storage-controller'
  import Exception from '@components/exception/exception'

  const PAGE_NAME = 'SHOP_SELECT'

  export default {
    name: PAGE_NAME,
    page: {
      title: '选择店铺',
      meta: [{name: 'description', content: 'description'}]
    },
    components: {
      Scroll,
      SItem,
      Exception
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
        showNoMore: false,
        page: 1,
        limit: 10,
        hasMore: true,
        isEmpty: false,
        store: storage.get('selectStore')
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
      this._getList({storeId: this.storeId})
    },
    methods: {
      changeHandle(item) {
        this.dataArray.forEach((child) => {
          child.isChecked = child.storeId === item.storeId
        })
        this.store = item
      },
      submitHandle() {
        this.$storage.set('selectStore', this.store)
        this.$router.back()
      },
      _getList(data, loading) {
        if (!this.hasMore) return
        const {page, limit} = this
        API.ShopManager.getList({page, limit, ...data}, loading).then((res) => {
          let arr = []
          if (res.meta.current_page === 1) {
            this.dataArray = res.data
            this.isEmpty = !res.meta.total
          } else {
            arr = this.dataArray.concat(res.data)
            this.dataArray = arr
          }
          if (res.meta.current_page === res.meta.last_page) {
            this.hasMore = false
          }
        })
      },
      // scroll事件
      onPullingUp() {
        if (!this.pullUpLoad) return this.$refs.scroll.forceUpdate()
        this.page++
        this._getList({}, false)
      // console.log('触底上拉加载')
      },
      onPullingDown() {
        // if (!this.pullDownRefresh) return this.$refs.scroll.forceUpdate()
        this.page = 1
        this.hasMore = true
        this.pullUpLoad = true
        this._getList({}, false)
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
  $button-height = 74px
  @import "~@design"

  .exception-box
    position :relative
    padding-top: (50)px

  .shop-select
    z-index: 20
    fill-box(fixed)
    background :$color-background

  .nothing-box
    position:relative
    padding-top :99.5px
    .nothing-img
      display :block
      margin :0 auto
      width :105.5px
      height :96px
    .nothing-txt
      margin-top :15px
      font-family: PingFangSC-Regular
      font-size: 14px
      color: #6E6E6E
      letter-spacing: 0.6px
      text-align: center
      line-height: 1

  .placeholder-box-15
    height :15px
    background :$color-background
    position :relative

  .scroll-container
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: $button-height
    .scroll-wrapper
      padding :0 15px
      .scroll-item
        margin-bottom :15px

  .button-group
    position :fixed
    bottom :0
    right :0
    left :0
    height :$button-height
    background:#fff
    layout()
    justify-content:center
    padding :0 15px
    .btn
      background: $color-main
      border-radius: 44px;
      height :44px
      line-height :@height
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: 1px;
      text-align: center;
</style>
