<template>
  <article class="overview">
    <div class="data-main">
      <div class="cliten-box">
        <div class="data-number-box">
          <nav class="data-tab-wrapper">
            <div v-for="(item, index) in tabList" :key="index" class="tab border-right-1px" :class="tabNumber === index ? 'active' : '' " @click="getAllTab(item, index)">{{item.text}}</div>
          </nav>
          <div class="data-list">
            <div v-for="(item, index) in dataArr" :key="index" @click="showPop(index)" class="list-item border-top-1px border-right-1px">
              <div class="num">{{allDatas[item.type] || 0}}</div>
              <div class="title">{{item.name}}<span class="icon" v-if="index === 0"></span></div>
            </div>
          </div>
        </div>
        <div class="chart-box">
          <router-link tag="div" to="" class="panel">
            <router-link tag="div" to="z-test" class="title">用户来源-KOL分享传播</router-link>
            <base-ai-charts v-if="KOLData" ref="c1" :CHARTS_TYPE="CHARTS_TYPE.USER_TOP6"></base-ai-charts>
            <div v-else class="no-data">暂无数据</div>
            <div class="list" v-if="personList.length > 0">
              <h3 class="list-title">
                <span class="num">排序</span>
                <span class="name">用户</span>
                <span class="person">人数</span>
                <span class="count">次数</span>
              </h3>
              <p class="item" v-for="(item, index) in personList" :key="index">
                <span class="num">{{index+1}}</span>
                <span class="name">{{item.name}}</span>
                <span class="person">{{item.share_person_count}}</span>
                <span class="count">{{item.share_times}}次</span>
              </p>
            </div>
          </router-link>

          <article class="panel">
            <h1 class="title">用户分组</h1>
            <base-ai-charts ref="c2" :CHARTS_TYPE="CHARTS_TYPE.USER"></base-ai-charts>
          </article>

          <article class="panel">
            <h1 class="title">PNES动力模型</h1>
            <base-ai-charts ref="c3" :CHARTS_TYPE="CHARTS_TYPE.PNES"></base-ai-charts>
          </article>

          <article class="panel">
            <h1 class="title ">活跃度-主力客户一周期内下单次数</h1>
            <base-ai-charts ref="c4" :CHARTS_TYPE="CHARTS_TYPE.VITALITY"></base-ai-charts>
          </article>

          <article class="panel">
            <h1 class="title ">客单价</h1>
            <base-ai-charts ref="c5" :CHARTS_TYPE="CHARTS_TYPE.VITALITY"></base-ai-charts>
          </article>
          <article class="panel">
            <h1 class="title">订单和金额</h1>
            <base-ai-charts ref="c6" :CHARTS_TYPE="CHARTS_TYPE.ORDER_AMOUNT"></base-ai-charts>
          </article>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="pop" v-if="pop">
        <div class="pop-main">
          <h3 class="title">营收 =（主力客户&活跃度&客单价）<span class="icon"></span></h3>
          <p class="text">主力客户、活跃度和客单价的增长转化等于店铺的营收</p>
          <div class="btn" @click="closePop">知道了</div>
        </div>
      </div>
    </transition>
    <toast ref="toast"></toast>
  </article>
</template>

<script type="text/ecmascript-6">
  import Toast from '@components/_global-toast/_global-toast'
  import {CHARTS_TYPE} from '@utils/constants-charts'
  import API from '@api'
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
        personList: [
          {
            name: '李明',
            person: 30,
            value: 20
          },
          {
            name: '李明',
            person: 30,
            value: 20
          },
          {
            name: '李明',
            person: 30,
            value: 20
          }
        ],
        tabNumber: 0,
        CHARTS_TYPE,
        pop: false,
        storeId: '',
        KOLData: false
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
      this.storeId = this.$storage.get('info').store_id
      this.getAllDataObj('all')
      this.groupRetio()
      this.PENSRetio()
      this.orderRetio()
      this.KOLRetio()
      this.KOLList()
    },
    methods: {
      showPop(index) {
        if (index === 0) {
          this.pop = true
        }
      },
      closePop() {
        this.pop = false
      },
      getAllTab(item, index) {
        this.getAllDataObj(item.value)
        this.tabNumber = index
      },
      getAllDataObj(time) {
        let data = {
          store_id: this.storeId,
          time
        }
        API.Mine.getMineData(data).then(res => {
          if (res.error === this.$ERR_OK) {
            this.allDatas = res.data
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      // KOL传播
      KOLRetio() {
        let data = {
          shop_id: this.shopId,
          time: 'week'
        }
        API.Echart.KOLRetio(data)
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.KOLData = res.data.elements.length
            this.$refs.c1 && this.$refs.c1.action(res.data)
          })
      },
      // KOL列表
      KOLList() {
        API.Echart.KOLList()
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.personList = res.data
          })
      },
      // 用户分组占比
      groupRetio() {
        let data = {
          store_id: this.storeId,
          time: 'week'
        }
        API.Echart.groupRetio(data)
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            let pieData = {
              seriesData: [
                {name: '潜在客户', value: res.data.p},
                {name: '新客户', value: res.data.n},
                {name: '主力客户', value: res.data.e},
                {name: '沉睡客户', value: res.data.s}
              ]
            }
            this.$refs.c2.action(pieData)
          })
      },
      // PNES动力模型
      PENSRetio() {
        let data = {
          store_id: this.storeId,
          time: 'week'
        }
        API.Echart.PENSRetio(data)
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            let day = res.data.map(item => {
              return item.day
            })
            // 新增
            let growth = res.data.map(item => {
              return item.growth
            })
            // 转化
            let conversion = res.data.map(item => {
              return item.conversion
            })
            // 流失
            let churn = res.data.map(item => {
              return item.churn
            })
            // 唤醒
            let wakeup = res.data.map(item => {
              return item.wakeup
            })
            // let seriesData = [
            //   {data: [50, 70, 30, 80, 40]},
            //   {data: [10, 50, 40, 70, 20]},
            //   {data: [30, 60, 20, 60, 50]},
            //   {data: [60, 10, 100, 90, 60]}
            // ]
            let lineData = {
              xAxisData: day.length > 1 ? day : ['3/10', '3/15', '3/20', '3/25', '3/30'],
              seriesData: [
                {data: growth.length > 1 ? growth : [0, 0, 0, 0, 0]},
                {data: conversion.length > 1 ? conversion : [0, 0, 0, 0, 0]},
                {data: churn.length > 1 ? churn : [0, 0, 0, 0, 0]},
                {data: wakeup.length > 1 ? wakeup : [0, 0, 0, 0, 0]}
              ]
            }
            this.$refs.c3.action(lineData)
          })
      },
      // 订单金额、客单价、一周活跃
      orderRetio() {
        let data = {
          store_id: this.storeId,
          time: 'week'
        }
        API.Echart.orderRetio(data)
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            // 主力客户一周下单数
            let mainOrderCount = res.data.map(item => {
              return item.main_order_count
            })
            // 客单价
            let personMoney = res.data.map(item => {
              return item.per_money
            })
            // 订单金额
            let total = res.data.map(item => {
              return item.total
            })
            // 日期
            let day = res.data.map(item => {
              return item.day
            })

            let lineData = {
              xAxisData: day.length ? day : ['3/10', '3/15', '3/20', '3/25', '3/30'],
              seriesData: [ {data: mainOrderCount.length ? mainOrderCount : [0, 0, 0, 0, 0]} ]
            }
            let lineData2 = {
              xAxisData: day.length ? day : ['3/10', '3/15', '3/20', '3/25', '3/30'],
              seriesData: [ {data: personMoney.length ? personMoney : [0, 0, 0, 0, 0]} ]
            }
            let lineData3 = {
              xAxisData: day.length ? day : ['3/10', '3/15', '3/20', '3/25', '3/30'],
              seriesData: [ {data: total.length ? total : [0, 0, 0, 0, 0]}, {data: res.data.y ? res.data.y : [0, 0, 0, 0, 0]} ]
            }
            this.$refs.c4.action(lineData)
            this.$refs.c5.action(lineData2)
            this.$refs.c6.action(lineData3)
          })
      },
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
  .data-main
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
        box-shadow: 0 2px 16px 0 rgba(21,24,45,0.06)
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
            color: #333
            font-family: $font-family-regular
            line-height: 30px
            width: 25%
            text-align: center
            transition: all 0.3s
          .tab:last-child
            border-right: 0
          .active
            color: $color-main
        .data-list
          padding: 30px 20px 25px
          overflow: hidden
          .list-item
            width: 50%
            border-top-1px(#f3f3f6)
            border-right-1px(#f3f3f6)
            float: left
            text-align: center
            padding: 0 0 15px
            &:before
              border-top: 0
            &:nth-child(n+3):before
              border-top: 1px solid #f3f3f6
            &:nth-child(n+3)
              padding-top: 18px
            &:nth-child(2n):after
              border-right: 0
            .title
              font-size: 13px
              font-family: $font-family-regular
              color: #0E1249
              margin-top: 8px
              opacity: 0.6
              .icon
                width: 12px
                height: 12px
                margin-left: 3px
                icon-image(icon-help)
            .num
              font-size: 25px
              font-family: "DINAlternate-Bold"

      .chart-box
        margin-top: 20px
        .panel
          margin: 12px 0
          background: #FFFFFF
          box-shadow: 0 0 10px 0 rgba(21,24,45,0.06)
          border-radius: 4px
          overflow :hidden
          .title
            font-family: PingFangSC-Regular
            font-size: 16px
            color: #0E1249
            line-height: 16px
            padding: 13.5px 0
            margin: 0 15px
          .no-data
            height: 223px
            line-height: 223px
            text-align: center
            font-size: $font-size-14
            color: #333
            font-family: $font-family-regular
          .list
            margin: 0 15px
            .list-title,.item
              height: 40px
              line-height: 40px
              color: #333
              display: flex
              font-size: $font-size-14
              font-family: $font-family-regular
              text-align: left
              background: #FFF
              border-bottom-1px(#f4f5f7)
              .num
                width: 60px
                text-indent: 15px
              .name
                flex: 1
                overflow: hidden
                text-indent: 30px
                text-overflow: ellipsis
                white-space: nowrap
              .person
                width: 60px
                text-indent: 15px
              .count
                width: 60px
                text-indent: 15px
            .list-title
              opacity: 0.6
  .pop
    position: fixed
    background: rgba(0,0,0,0.7)
    right: 0
    top: 0
    bottom: 0
    left: 0
    z-index: 20
    .pop-main
      border-radius: 6px
      width: 80vw
      padding: 0 20px
      box-sizing: border-box
      position: absolute
      all-center()
      background: #FFF
      .title
        color: #333
        font-size: 16px
        margin-top: 45px
        font-family: $font-family-medium
        text-align: center
        line-height: 1.2
        .icon
          width: 9px
          height: 15px
          margin-bottom: -3px
          icon-image(icon-upup)
      .text
        font-family: $font-family-regular
        font-size: 14px
        color: #666
        text-align: center
        line-height: 1.2
        margin-top: 15px
        padding: 0 20px
      .btn
        width: 110px
        height: 34px
        line-height: 34px
        font-size: 14px
        font-family: "PingFangSC-Regular"
        color: $color-main
        border-1px($color-main, 100px)
        text-align: center
        margin: 30px auto 20px
</style>
