<template>
  <div class="client-detail">
    <scroll ref="scroll"
            :data="actionList"
            :probeType="probeType"
            :bcColor="bcColor"
            :listenScroll="listenScroll"
            :showNoMore="false"
            :pullUpLoad="pullUpLoadObj"
            @scroll="scroll"
            @pullingUp="onPullingUp"
    >
      <div ref="eleven" class="client-top">
        <div class="cliten-bg"></div>
        <div class="cliten-box">
          <div class="cliten-con">
            <div class="cliten-img">
              <div class="detail-img-box">
                <div class="img">
                  <img v-if="clientData.avatar" :src="clientData.avatar" alt="">
                  <img v-else src="./pic-default_people@2x.png" alt="">
                </div>
                <div class="label-right">
                  <div class="label-name">{{clientData.name}}</div>
                  <div class="label-box">
                    <div class="full-name">{{clientData.user}} {{clientData.mobile}}</div>
                  </div>
                </div>
              </div>
              <div class="detail-jump" @click="toBusinessCard">
                <img class="jump-img" src="./icon_pressed@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--tab栏-->
      <div class="tab-wrapper select-client">
        <div class="line-wrap select-client" :style="'transform: translate3d('+ (menuIdx * 100) +'%, 0, 0)'"></div>
        <div v-for="(item,index) in tabList" :key="index" class="tab" :class="{'active':menuIdx === index}" @click="switchTab(index)">{{item}}</div>
      </div>

      <!--能力模型-->
      <div v-if="menuIdx * 1 === 0" class="capacity">
        <base-ai-charts ref="c7" :chartsType="CHARTS_TYPE.POWER"></base-ai-charts>
        <div class="six-title">
          <div class="six-top">
            <div class="left">销售力综合排名</div>
            <div class="right">{{dataRank.sales_force || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">KOL分享力排名</div>
            <div class="right">{{dataRank.kol_share || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">获客能力排名</div>
            <div class="right">{{dataRank.customer_competence || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">推广能力排名</div>
            <div class="right">{{dataRank.promotion_force || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">营销能力排名</div>
            <div class="right">{{dataRank.marketing_ability || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">订单能力排名</div>
            <div class="right">{{dataRank.order_force || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">业绩能力排名</div>
            <div class="right">{{dataRank.solid_result || 0}}</div>
          </div>
        </div>
      </div>

      <!--数据分析-->
      <div v-if="menuIdx * 1 === 1" class="ai-box">
        <div class="data-top">
          <div class="cliten-box">
            <div class="data-number-box">
              <nav class="data-tab-wrapper">
                <div v-for="(item, index) in tabMoreList" :key="index" class="tab border-right-1px" :class="tabNumber === index ? 'active' : '' " @click="getAllTab(item, index)">{{item.text}}</div>
              </nav>
              <div class="data-list">
                <div v-for="(item, index) in dataArr" :key="index" class="list-item border-top-1px border-right-1px">
                  <div class="num">{{allDatas[item.type] || 0}}</div>
                  <div class="title">{{item.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-box">
          <div class="chart-tab">
            <ul class="custom-tab border-bottom-1px">
              <li v-for="(item, index) in groupList" :key="index" class="tab-item" :class="{'active': charTab === index}" @click="changeChart(item, index)">{{item.name}}</li>
              <li class="line-tab" :style="'transform: translate3d('+ charTab * 100 +'%, 0, 0)'"></li>
            </ul>
          </div>

          <div v-show="charTab === 0">
            <article class="panel">
              <h1 class="title border-bottom-1px">用户分组</h1>
              <base-ai-charts ref="c1" :chartsType="CHARTS_TYPE.USER"></base-ai-charts>
            </article>
            <article class="panel">
              <h1 class="title border-bottom-1px">PNES动力模型</h1>
              <base-ai-charts ref="c2" :chartsType="CHARTS_TYPE.PNES"></base-ai-charts>
            </article>
            <router-link tag="div" to="" class="panel">
              <router-link tag="div" to="z-test" class="title border-bottom-1px">用户来源-KOL分享传播</router-link>
              <base-ai-charts v-if="KOLData && KOLRefresh" ref="c3" :chartsType="CHARTS_TYPE.USER_TOP6"></base-ai-charts>
              <div v-else class="no-data">暂无数据</div>
              <div v-if="personList.length > 0" class="list">
                <h3 class="list-title">
                  <span class="num">排序</span>
                  <span class="name">用户</span>
                  <span class="person">人数</span>
                  <span class="count">次数</span>
                </h3>
                <p v-for="(item, index) in personList" :key="index" class="item">
                  <span class="num">{{index}}</span>
                  <span class="name">{{item.name}}</span>
                  <span class="person">{{item.value}}</span>
                  <span class="count">{{item.value}}次</span>
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="charTab === 1">
            <article class="panel">
              <h1 class="title border-bottom-1px">活跃度-主力客户一周期内下单次数</h1>
              <base-ai-charts ref="c4" :chartsType="CHARTS_TYPE.VITALITY"></base-ai-charts>
            </article>
          </div>
          <div v-show="charTab === 2">
            <article class="panel">
              <h1 class="title border-bottom-1px">笔单价</h1>
              <base-ai-charts ref="c5" :chartsType="CHARTS_TYPE.VITALITY"></base-ai-charts>
            </article>
            <article class="panel">
              <h1 class="title border-bottom-1px">订单和金额</h1>
              <base-ai-charts ref="c6" :chartsType="CHARTS_TYPE.ORDER_AMOUNT"></base-ai-charts>
            </article>
          </div>
          <div style="height: 5px"></div>
        </div>
      </div>

      <!--来访记录-->
      <div v-if="menuIdx * 1 === 2" class="visitor-box">
        <section v-if="actionList.length * 1 === 0" class="exception-box">
          <exception errType="nodata"></exception>
        </section>
        <section v-if="actionList.length * 1 !== 0">
          <msg-box :actionList="actionList"></msg-box>
        </section>
      </div>

      <!--营销记录-->
      <section v-if="menuIdx * 1 === 3 && flowList.length === 0" class="exception-box">
        <exception errType="nodata"></exception>
      </section>
      <section v-if="menuIdx * 1 === 3 && flowList.length !== 0">
        <market-record :flowList="flowList"></market-record>
      </section>
    </scroll>
    <div v-if="showTab" class="tab-wrapper">
      <div class="line-wrap" :style="'transform: translate3d('+ (menuIdx * 100) +'%, 0, 0)'"></div>
      <div v-for="(item,index) in tabList" :key="index" class="tab" @click="switchTab(index)">{{item}}</div>
    </div>
    <base-router-view></base-router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  import Scroll from '@components/scroll/scroll'
  import Exception from '@components/exception/exception'
  import {CHARTS_TYPE} from '@utils/constants-charts'
  import MsgBox from './msg-box/msg-box'
  import MarketRecord from './market-record/market-record'

  const DATA_ARR = [
    {name: '交易金额', icon: 'money', type: 'total'},
    {name: '主力客户', icon: 'business', type: 'module_e_count'},
    {name: '活跃度', icon: 'active', type: 'order_count'},
    {name: '笔单价', icon: 'price', type: 'per_money'}
  ]
  const groupList = [{
    orderBy: 'join',
    name: '客户数据'
  }, {
    orderBy: 'activity_index',
    name: '活跃数据'
  }, {
    orderBy: '',
    name: '交易数据'
  }]
  const ClientDetail = API.Echart
  export default {
    name: 'CapacityModel',
    page: {
      title: '能力模型'
    },
    components: {
      Scroll,
      Exception,
      MsgBox,
      MarketRecord
    },
    data() {
      return {
        listenScroll: true,
        probeType: 3,
        bcColor: '#FFF',
        tabList: ['能力模型', '数据分析', '来访记录', '营销记录'],
        showMode: true,
        tabMoreList: [
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
        showBox: true,
        barIndex: null,
        menuIdx: 0,
        dataEcharts: false,
        tabNumber: 0,
        clientData: {
          avatar: '',
          name: ''
        },
        flow: {},
        id: '',
        actionPage: 1,
        actionList: [],
        noActionMore: false,
        mobile: '',
        list: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        page: 1,
        twoList: [],
        highgt: 163,
        labelList: [],
        showTab: false,
        dataRank: {},
        actionMore: false,
        dataArr: DATA_ARR,
        CHARTS_TYPE,
        groupList,
        charTab: 0,
        flowList: [],
        allDatas: {},
        storeId: '',
        KOLData: false,
        noMarketing: false,
        merchantId: '',
        marketPage: 1,
        KOLRefresh: true
      }
    },
    computed: {
      pullUpLoadObj: function() {
        return this.pullUpLoad
          ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
          }
          : false
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      }
    },
    created() {
      this.merchantId = this.$storage.get('info').id
      this.id = this.$route.query.id
      let userInfo = this.$storage.get('user')
      this.clientData = {
        name: userInfo.name,
        avatar: userInfo.avatar,
        position: userInfo.position,
        user: userInfo.nickname,
        mobile: userInfo.mobile,
      }
      this.getNewActionList(this.id) // 来访记录
      this.marketingRecord() // 营销记录
      this.getRadarData() // 能力模型
      this.getEmployeeRank() // 能力排名
    },
    mounted() {
      this.highgt = this.$refs.eleven.offsetHeight + 20
    },
    beforeDestroy() {
      // this.$emit('refresh')
      this.$storage.remove('user')
    },
    methods: {
      // 能力模型图
      getRadarData() {
        API.Capacity.getRadarData()
          .then(res => {
            this.$loading.hide()
            if (res.error === this.$ERR_OK) {
              this.$nextTick(() => {
                let radarData = {
                  xAxisData: res.data.value,
                  seriesData: res.data.data,
                  total: res.data.total
                }
                this.$refs.c7 && this.$refs.c7.action(radarData)
              })
            } else {
              this.$toast.show(res.message)
            }
          })
      },
      // 能力排行
      getEmployeeRank() {
        API.Echart.getEmployeeRank({store_id: this.id})
          .then(res => {
            this.$loading.hide()
            if (res.error === this.$ERR_OK) {
              this.dataRank = res.data
            } else {
              this.$toast.show(res.message)
            }
          })
      },
      // 商家交易数据
      getMerchantData() {
        let data = {
          merchant_id: this.merchantId,
          store_id: this.id,
          time: this.tabMoreList[this.tabNumber].value
        }
        API.Capacity.getMerchantData(data)
          .then(res => {
            this.$loading.hide()
            if (res.error === this.$ERR_OK) {
              this.allDatas = res.data
            } else {
              this.$toast.show(res.message)
            }
          })
      },
      scroll(pos) {
        let hightPx = pos.y * -1
        if (hightPx >= this.highgt) {
          this.showTab = true
        } else {
          this.showTab = false
        }
      },
      // tab栏切换
      switchTab(index) {
        this.$refs.scroll.scrollTo(0, 0)
        this.KOLRefresh = false // 修改KOL刷新的问题 todo
        this.scroll(0)
        this.menuIdx = index
        if (index === 0) {
          this.getRadarData()
          this.getEmployeeRank()
        } else if (index === 1) {
          this.getMerchantData()
          this.$nextTick(() => {
            this.groupRetio()
            this.PENSRetio()
            this.KOLList()
            this.KOLRefresh = true
          })
          this.KOLRetio()
        }
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 20)
      },
      // KOL传播
      KOLRetio() {
        let data = {
          merchant_id: this.merchantId,
          store_id: this.id,
          time: 'week'
        }
        API.Echart.KOLRetio(data)
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            this.KOLData = res.data.elements.length
            this.$nextTick(() => {
              this.$refs.c3 && this.$refs.c3.action(res.data)
            })
          })
      },
      // KOL列表
      KOLList() {
        let data = {
          merchant_id: this.merchantId,
          store_id: this.id,
          time: 'week'
        }
        API.Echart.KOLList(data)
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
          merchant_id: this.merchantId,
          store_id: this.id,
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
            this.$refs.c1.action(pieData)
          })
      },
      // PNES动力模型
      PENSRetio() {
        let data = {
          merchant_id: this.merchantId,
          store_id: this.id,
          time: 'week'
        }
        API.Echart.PENSRetio(data)
          .then(res => {
            if (res.error !== this.$ERR_OK) {
              this.$toast.show(res.message)
              return
            }
            let day = res.data.map(item => {
              let day = item.day.slice(5).split('-').join('/')
              return day
            })
            // 新增
            let growth = res.data.map(item => {
              return item.growth_rate
            })
            // 转化
            let conversion = res.data.map(item => {
              return item.conversion_rate
            })
            // 流失
            let churn = res.data.map(item => {
              return item.churn_rate
            })
            // 唤醒
            let wakeup = res.data.map(item => {
              return item.wakeup_rate
            })
            let lineData = {
              xAxisData: day.length ? day : ['03/10', '03/15', '03/20', '03/25', '03/30'],
              seriesData: [
                {data: growth.length ? growth : [0, 0, 0, 0, 0]},
                {data: conversion.length ? conversion : [0, 0, 0, 0, 0]},
                {data: churn.length ? churn : [0, 0, 0, 0, 0]},
                {data: wakeup.length ? wakeup : [0, 0, 0, 0, 0]}
              ]
            }
            this.$refs.c2.action(lineData)
          })
      },
      // 订单金额、笔单价、一周活跃
      orderRetio() {
        let data = {
          merchant_id: this.merchantId,
          store_id: this.id,
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
            // 笔单价
            let personMoney = res.data.map(item => {
              return item.per_money
            })
            // 订单数
            let count = res.data.map(item => {
              return item.order_count
            })
            // 交易金额
            let total = res.data.map(item => {
              return item.total
            })
            // 日期
            let day = res.data.map(item => {
              let day = item.day.slice(5).split('-').join('/')
              return day
            })

            if (this.charTab === 1) {
              let lineData = {
                xAxisData: day.length ? day : ['03/10', '03/15', '03/20', '03/25', '03/30'],
                seriesData: [ {data: mainOrderCount.length ? mainOrderCount : [0, 0, 0, 0, 0]} ],
                name: '活跃度'
              }
              this.$refs.c4.action(lineData)
            } else if (this.charTab === 2) {
              let lineData = {
                xAxisData: day.length ? day : ['3/10', '3/15', '3/20', '3/25', '3/30'],
                seriesData: [ {data: personMoney.length ? personMoney : [0, 0, 0, 0, 0]} ],
                name: '笔单价'
              }
              let lineData2 = {
                xAxisData: day.length ? day : ['03/10', '03/15', '03/20', '03/25', '03/30'],
                seriesData: [ {data: count.length ? count : [0, 0, 0, 0, 0]}, {data: total.length ? total : [0, 0, 0, 0, 0]} ]
              }
              this.$refs.c5.action(lineData)
              this.$refs.c6.action(lineData2)
            }
          })
      },
      // 图表tab切换
      changeChart(item, index) {
        if (this.charTab === index) return
        this.charTab = index
        if (index === 0) {
          this.groupRetio()
          this.PENSRetio()
          this.KOLRetio()
          this.KOLList()
        } else if (index === 1) {
          this.orderRetio()
        } else if (index === 2) {
          this.orderRetio()
        }
      },
      // 来访记录
      getNewActionList(id) {
        ClientDetail.getActionList(id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.actionList = res.data
          }
        })
      },
      getMoreActionList(id) {
        if (this.actionMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        // this.actionPage++
        let number = this.actionList.length
        ClientDetail.getActionList(id, number).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            if (res.data.length * 1 === 0) {
              // this.actionPage--
              this.actionMore = true
            } else {
              this.actionList.push(...res.data)
            }
            setTimeout(() => {
              this.$refs.scroll.forceUpdate()
            }, 20)
          }
        })
      },
      // 营销记录
      marketingRecord() {
        this.marketPage = 1
        let data = {
          page: this.marketPage,
          limit: 10,
          store_id: this.id,
          merchant_id: this.merchantId
        }
        API.Capacity.martketingRecord(data)
          .then(res => {
            if (res.error === this.$ERR_OK) {
              this.flowList =res.data
              this._isAflowList(res)
            } else {
              this.$toast.show(res.message)
            }
          })
      },
      // 营销记录加载更多
      moreMarketingRecord() {
        if (this.noMarketing) {
          this.$refs.scroll.forceUpdate()
          return
        }
        let data = {
          page: this.marketPage,
          limit: 10,
          store_id: this.id,
          merchant_id: this.merchantId
        }
        API.Capacity.martketingRecord(data)
          .then((res) => {
            this.$loading.hide()
            if (res.error === this.$ERR_OK) {
              this.flowList.push(...res.data)
              this._isAflowList(res)
              setTimeout(() => {
                this.$refs.scroll.forceUpdate()
              }, 20)
            }
          })
      },
      _isAflowList(res) {
        this.marketPage++
        if (this.flowList.length >= res.meta.total * 1) {
          this.noMarketing = true
        }
      },
      toBusinessCard() {
        const id = this.id
        const url = `${this.$route.path}/business-card?id=${id}`
        this.$router.push(url)
      },
      onPullingUp() {
        switch (this.menuIdx * 1) {
        case 0:
          this.$refs.scroll.forceUpdate()
          break
        case 1:
          this.$refs.scroll.forceUpdate()
          break
        case 2:
          this.getMoreActionList(this.id)
          break
        case 2 && this.noActionMore:
          this.$refs.scroll.forceUpdate()
          break
        case 3:
          this.moreMarketingRecord(this.id)
        }
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      getAllTab(item, index) {
        this.tabNumber = index
        this.getMerchantData()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $color-white = #fff
  @import "~@design"
  div
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .exception-box
    padding-top: 70px

  .client-detail
    fill-box(fixed)
    z-index: 21
    height :100vh
    .scroll-wrapper
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      overflow: hidden

  .tab-padding
    height: 48px

  .container
    fill-box(absolute)

  .client-top
    position: relative
    margin-bottom: 20px
    .cliten-bg
      position: absolute
      z-index: 1
      height: 86px
      background: #FFF
      width: 100%
      top: 0
      left: 0
      icon-image(bg-khxq)
    .cliten-box
      position: relative
      padding: 20px 12px 0
      width: 100%
      z-index: 2
      .cliten-con
        background: #FBFDFE
        width: 100%
        padding: 20px 15px
        position: relative
        border-radius: 4px
        box-shadow: 0 0 20px 0 rgba(141,151,158,0.2)
        .cliten-con-bg
          position: absolute
          display: block
          width: 100%
          height: 100%
          left: 0
          top: 0
        .cliten-img
          layout(row,block,nowrap)
          justify-content: space-between
          align-items: center
          position: relative
          .detail-img-box
            flex: 1
            overflow :hidden
            layout(row,block,nowrap)
            .img
              position: relative
              width: 55px
              height: 55px
              border-radius: 50%
              background: #ccc
              overflow: hidden
              img
                width: 55px
                height: 55px
                display: block
            .label-right
              flex: 1
              overflow :hidden
              margin-left: 10px
              .label-name
                overflow :hidden
                font-size: $font-size-16
                color: #333
                font-family: $font-family-medium
                padding-top: 5px
                margin-bottom: 10px
                no-wrap()
              .label-box
                layout(row,block,nowrap)
                .full-name
                  font-size: $font-size-12
                  color: #8e8f8f
                  font-family: $font-family-regular
                  line-height: 1.2
                  no-wrap()
          .detail-jump
            height: 45px
            width: 25px
            position: relative
            .jump-img
              width: 7px
              height: 13px
              position: absolute
              right: 0
              top: 0
              bottom: 0
              margin: auto
  .tab-wrapper
    display: flex
    width: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 11
    background: #FFF
    height: 48px
    line-height: 47px
    layout(row, block, nowrap)
    border-bottom: 1px solid rgba(0,0,0,.1)
    .tab
      flex: 1
      font-family: $font-family-regular
      font-size: $font-size-16
      color: #333
      letter-spacing: 0.6px
      text-align: center
      opacity: 0.8
      transition: all 0.3s
    .active
      font-family: $font-family-medium
      font-size: $font-size-16
      color: #333
      opacity: 1
    .line-wrap
      position: absolute
      left: 0
      bottom: 0
      right: 0
      width: 25%
      layout()
      align-items: center
      transition: all 0.3s
      &:after
        content: ''
        width: 42px
        height: 4px
        border-radius: 4px
        background: $color-linear-main
  .select-client
    position: relative

  .visitor-box
    padding: 0 0 15px 0
  .ai-box
    padding: 15px 0
  .six-box
    padding: 15px
    .six-model-box
      position: relative
      background: linear-gradient(rgba(255, 255, 255, .1) 0%, #fff 100%)
      height: 305px
      margin-bottom: 10px
      #six-model
        width: 100%
        height: 305px
        margin: 0 auto
        padding: 20px

  .six-title
    margin: 0 12px 20px
    border-1px(#E9F0FE, 4px)
    border-radius: 4px
    .six-top
      layout(row)
      justify-content: space-between
      height: 50px
      line-height: 50px
      padding: 0 15px
      background: #F7F7F7
      .left
        font-family: $font-family-medium
        font-size: $font-size-16
        color: #333
      .right
        font-size: 25px
        color: #333
        font-family: 'DINAlternate-Bold'
    .six-bottom
      layout(row)
      justify-content: space-between
      height: 45px
      line-height: 45px
      border-bottom: 0.5px dashed #E1E1E1
      margin: 0 15px
      .left
        font-size: $font-size-14
        color: #666
        font-family: $font-family-medium
      .right
        font-size: 20px
        color: #666
        font-family: ' DINAlternate-Bold'
      &:last-child
        border-bottom: 0
  .data-top
    position: relative
    .cliten-box
      position: relative
      padding: 20px 12px
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
            background: #FFF
          .tab:last-child
            border-right: 0
          .active
            background: $color-linear-main
            color: #FFF
        .data-list
          padding: 30px 20px 20px
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
              font-size: $font-size-13
              font-family: $font-family-regular
              color: #0E1249
              margin-top: 8px
              opacity: 0.6
            .num
              font-size: $font-size-25
              font-family: $font-family-din-bold

  .chart-box
  .chart-tab
    border-bottom-1px(#E1E1E1)
    .custom-tab
      height: 45px
      margin: 5px 15px 0
      layout(row, block, nowrap)
      align-items: center
      justify-content: space-between
      font-family: $font-family-medium
      font-size: $font-size-16
      color: #0E1249
      letter-spacing: 0.52px
      text-align: center
      line-height: 45px
      position: relative
      .tab-item
        flex: 1
        text-align: center
        opacity: 0.8
        transition: all 0.3s
      .active
        opacity: 1
        font-family: $font-family-medium
      .line-tab
        width: 33.333%
        height: 4px
        position: absolute
        left: 0
        bottom: 0
        display: flex
        justify-content: center
        transition: all 0.3s
        &:after
          content: ''
          height: 4px
          width: 42px
          border-radius: 4px
          background: $color-linear-main
    .panel
      margin: 12px 12px
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
        border-bottom-1px(#E1E1E1)
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

    .panel-card
      margin :15px
      background: #FFFFFF;
      box-shadow: 0 0 20px 0 rgba(141,151,158,0.20);
      border-radius: 8px;
      padding :0 15px
      .top-wrapper
        .title
          padding :14px 0
      .bottom-wrapper
        display :flex
        align-items :center
        justify-content :space-between
        .left
          margin-left :11.5px
        .item
          layout(column,block,nowrap)
          justify-content :center
          align-items :center
          .number
            font-family: $font-family-light
            font-size: 20px;
            color: #333333;
          .text
            margin-top :10px
            font-family: $font-family-regular
            font-size: 12px;
            color: #949494;
        .right
          width :100px
          height :61.5px
          padding :12px 0
</style>
