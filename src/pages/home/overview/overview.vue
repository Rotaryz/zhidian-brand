<template>
  <article class="overview">
    <div class="data-top">
      <div class="cliten-box">
        <div class="data-number-box">
          <nav class="data-tab-wrapper">
            <div v-for="(item, index) in tabList" :key="index" class="tab" :class="tabNumber === index ? 'active' : '' " @click="getAllTab(item, index)">{{item.text}}</div>
          </nav>
          <div class="data-list">
            <div v-for="(item, index) in dataArr" :key="index" class="list-item">
              <div class="title">
                <span class="icon" :class="item.icon"></span>
                <span class="text">{{item.name}}</span>
              </div>
              <div class="num">{{0}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <toast ref="toast"></toast>
  </article>
</template>

<script type="text/ecmascript-6">
  import Toast from '@components/_global-toast/_global-toast'
  const DATA_ARR = [
    {name: '交易金额', icon: 'money', type: 'total'},
    {name: '主力客户', icon: 'business', type: 'order_count'},
    {name: '活跃度', icon: 'active', type: 'per_money'},
    {name: '客单价', icon: 'price', type: 'module_e_count'}
  ]
  const PAGE_NAME = 'MY_DATA'
  export default {
    name: PAGE_NAME,
    components: {
      Toast
    },
    data() {
      return {
        pieData: [{name:'请选择店铺', value: 0}],
        dataArr: DATA_ARR,
        allDatas: {},
        tabList: [
          {
            text: '全部',
            value: 'all'
          },
          {
            text: '昨天',
            value: 'yesterday'
          },
          {
            text: '7天',
            value: 'week'
          },
          {
            text: '30天',
            value: 'month'
          }
        ],
        tabNumber: 0
      }
    },
    watch: {
      $route(to, from) {
        let flag = from.path.includes('/home/shop-select')
        if (!flag) return
        this.tabNumber = 0
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      getAllTab(item, index) {
        this.tabNumber = index
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .overview
    position: relative
    background: #FFF
  .data-top
    position: relative
    .cliten-box
      position: relative
      padding: 20px 15px 0
      width: 100%
      z-index: 2
      .data-number-box
        padding-top: 15px
        position: relative
        background: #fff
        box-shadow: 0 2px 16px 0 rgba(21,24,45,0.04)
        border-radius: 6px
        background: $color-white
        display: block
        border-1px(#D9F0FE, 12px)
        .data-tab-wrapper
          position: relative
          z-index: 11
          layout(row)
          margin: 0 auto
          width: 64vw
          border-radius: 2px
          border-1px(rgba(32,32,46,0.1))
          .tab
            border-right-1px(rgba(32,32,46,0.1))
            height: 30px
            font-size: $font-size-14
            color: #20202E
            font-family: $font-family-regular
            line-height: 30px
            width: 25%
            text-align: center
          .tab:last-child
            border-right: 0
          .active
            color: #fff
        .data-list
          padding: 17px 20px
          overflow: hidden
          .list-item
            width: 50%
            border-top-1px(#E1E1E1)
            border-right-1px(#E1E1E1)
            float: left
            padding: 14px 0 10px
            &:before
              border-top: 0
            &:nth-child(n+3):before
              border-top: 1px solid #E1E1E1
            &:nth-child(2n)
              padding-left: 20px
              &:after
                border-right: 0
            .title
              display: flex
              align-items: center
              .text
                font-size: 13px
                color: #0E1249
                opacity: 0.6
            .num
              margin-top: 8px
              padding-left: 20px
              font-size: $font-size-20
              font-family: $font-family-bold

</style>
