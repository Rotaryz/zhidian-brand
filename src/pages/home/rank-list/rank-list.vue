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
    <ul class="content-wrapper">
      <li v-for="(item, index) in dataArray" :key="index" class="card-wrapper">
        <shop-card :cardInfo="item" :idx="index" useType="rank-list"></shop-card>
      </li>
    </ul>
    <select-sheet ref="sheet" @change="sheetChangeHandle"></select-sheet>
  </div>
</template>

<script type="text/ecmascript-6">
  import PAGE_CONFIG from './config-rank-list'
  import ShopCard from '@components/shop-card/shop-card'
  import SelectSheet from '@components/select-sheet/select-sheet'
  import API from 'api'

  const COMPONENT_NAME = 'RANK_LIST'

  export default {
    name: COMPONENT_NAME,
    components: {
      ShopCard,
      SelectSheet
    },
    data() {
      return {
        tabList: PAGE_CONFIG,
        dataArray: new Array(12).fill({}),
        tabIndex: 0,
        willIndex: 0,
        limit: 15,
        page: 1
      }
    },
    created() {

    },
    methods: {
      _getList() {
        // let obj = this
        let data = {
          merchant_id: '',
          // type:
        }
        API.Rank.getMarketList(data).then((res) => {
          console.log(res)
        })
        // todo
      },
      changeHandle(item, index) {
        this.willIndex = index
        this.$refs.sheet.show(item.title, item.key)
      },
      sheetChangeHandle(obj) {
        this.tabIndex = this.willIndex
        this.tabList[this.tabIndex].key = obj.key
      },
      onPullingUp() {
        console.log(1231)
        // if (this.isAll) return
        // const _data = this._formatData()
        // let page = ++this.page
        // let limit = this.limit
        // const data = {
        //   page,
        //   limit,
        //   ..._data
        // }
        // Rank.getStaffList(data, false).then((res) => {
        //   this.$loading.hide()
        //   if (res.error === this.$ERR_OK) {
        //     if (res.data && res.data.length) {
        //       let newArr = this.dataArray.concat(res.data)
        //       this.dataArray = newArr
        //     } else {
        //       this.isAll = true
        //     }
        //   } else {
        //     this.$toast.show(res.message)
        //   }
        //   this.$emit('loadEnd', this.dataArray)
        // })
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

  .rank-list
    position: relative
    layout(column, block, nowrap)
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
