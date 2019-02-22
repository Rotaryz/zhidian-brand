<template>
  <div class="rank-list">
    <ul class="select-wrapper border-bottom-1px">
      <li v-for="(item, index) in tabList"
          :key="index" class="button-wrapper"
          :class="{active: index === tabIndex}"
          @click="changeHandle(item, index)"
      >
        <p class="text">{{item.title[item.key]}}</p>
        <img v-if="index === tabIndex" class="icon" src="./icon-select@2x.png" alt="">
        <img v-else class="icon" src="./icon-noselect@2x.png" alt="">
      </li>
    </ul>
    <ul v-if="!isEmpty" class="content-wrapper">
      <li v-for="(item, index) in dataArray" :key="index" class="card-wrapper">
        <shop-card :cardInfo="item" :idx="index" useType="rank-list"></shop-card>
      </li>
      <li class="empty"></li>
    </ul>
    <section v-if="isEmpty" class="exception-box">
      <exception errType="nodata"></exception>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import PAGE_CONFIG from './config-rank-list'
  import ShopCard from '@components/shop-card/shop-card'
  import API from '@api'
  import Exception from '@components/exception/exception'

  const COMPONENT_NAME = 'RANK_LIST'

  export default {
    name: COMPONENT_NAME,
    components: {
      ShopCard,
      Exception
    },
    data() {
      return {
        tabList: PAGE_CONFIG,
        dataArray: new Array(12).fill({}),
        tabIndex: 0,
        willIndex: 0,
        limit: 15,
        page: 1,
        hasMore: true,
        isEmpty: false
      }
    },
    created() {
      this._getList(true)
    },
    methods: {
      _resetUploadParams() {
        this.page = 1
        this.hasMore = true
      },
      _getList(loading) {
        if (!this.hasMore) return
        let id = this.$storage.get('info', {}).id || 0
        let currentTab = this.tabList[this.tabIndex]
        let data = {
          merchant_id: id,
          type: currentTab.one,
          [currentTab.secondKey]: currentTab.second[currentTab.key],
          limit: this.limit,
          page: this.page
        }
        API.Rank.getMarketList(data, loading).then((res) => {
          if (res.error !== this.$ERR_OK){
            this.$toast.show(res.message)
            this.$emit('loadEnd', this.dataArray)
            this.hasMore = false
            return
          }
          if (this.page === 1) {
            // res.data = [] // todo
            this.dataArray = res.data
            this.isEmpty = res.data.length === 0
          } else {
            let arr = this.dataArray.concat(res.data)
            this.dataArray = arr
            this.$emit('loadEnd', this.dataArray)
          }
          this.hasMore = res.data.length
        })
      },
      changeHandle(item, index) {
        this.willIndex = index
        let key = this.willIndex === this.tabIndex ? item.key : -1
        this.$sheet.show(item.title, key, (obj) => this.sheetChangeHandle(obj))
      },
      sheetChangeHandle(obj) {
        this._resetUploadParams()
        this.tabIndex = this.willIndex
        this.tabList[this.tabIndex].key = obj.key
        this._getList()
      },
      onPullingUp() {
        this.page++
        this._getList()
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .triangle
    width :6px
    height :6px
    border:1.5px solid transparent
    border-color: transparent transparent #3D3A54 #3D3A54
    transform-origin :top center
    transform :rotate(-45deg)

  .exception-box
    padding-top: (45)px

  .empty
    height :20px

  .rank-list
    position: relative
    layout(column, block, nowrap)
    background :#fff
    min-height:80vh
    .select-wrapper
      display :flex
      padding :17.5px 17.5px 15.5px
      justify-content :space-around
      background :#fff
      .button-wrapper
        min-width :26.666666666666668vw
        height :28px
        background: #F2F2F2;
        border-radius: 30px;
        border: 1px solid #F2F2F2;
        font-family: $font-family-regular
        font-size: 3.733333333333334vw
        color: #333333;
        display :flex
        align-items :center
        justify-content :center
        box-sizing :border-box
        &.active
          background: rgba(89,41,220,0.06);
          border: 1px solid $color-main
          color: $color-main
        .text
          margin-right :4px
        .icon
          width :8px
          height :5px
    .content-wrapper
      position :relative
      background :#fff
      .card-wrapper
        height: 60px
        margin: 0 15px
        position: relative
        &:after
          content: ""
          display: block
          position: absolute
          border-bottom: 1px dotted $color-line
          left: 0
          bottom: 0
          width: 100%
          transform-origin: 0 bottom

</style>
