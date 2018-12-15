<template>
  <article class="overview">
    <section class="select-wrapper">
      <div class="s-container" @click="navToSelectHandle">
        <p class="s-text">{{merchantName}}</p>
        <base-right-arrow iconStyle="dark"></base-right-arrow>
      </div>
    </section>
    <div class="data-top">
      <div class="cliten-box">
        <section class="data-number-box" style="padding-top: 0">
          <article class="data-tab-container border-bottom-1px">
            <nav class="data-tab-wrapper">
              <div v-for="(item, index) in tabList" :key="index" class="tab"
                   :class="tabNumber === index ? 'active' : '' " @click="getAllTab(item, index)"
              >{{item.text}}
              </div>
              <ul class="line-wrapper" :style="{transform:'translate3d(' + tabNumber*100 + '%,0,0)'}">
                <li class="line"></li>
              </ul>
            </nav>
          </article>
          <div class="data-list">
            <div class="list-box">
              <div class="number">{{allDatas.customer_total || 0}}</div>
              <div class="text">客户总数</div>
            </div>
            <div class="list-box">
              <div class="number">{{allDatas.order_total || 0}}</div>
              <div class="text">订单总数</div>
            </div>
            <div class="list-box">
              <div class="number">{{allDatas.success_order_total || 0}}</div>
              <div class="text">成交总数</div>
            </div>
            <div class="list-box">
              <div class="number">{{allDatas.goods_visits_total || 0}}</div>
              <div class="text">产品访问数</div>
            </div>
            <div class="list-box">
              <div class="number">{{allDatas.activity_visits_total || 0}}</div>
              <div class="text">活动访问数</div>
            </div>
            <div class="list-box">
              <div class="number">{{allDatas.live_logs_total || 0}}</div>
              <div class="text">动态访问数</div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="ai-box">
      <div class="pie-box">
        <div id="mySuccess"></div>
        <div class="title-box">
          <div class="title">成交率漏斗</div>
          <div class="sub-title">(每小时更新)</div>
        </div>
        <div class="bottom-des">
          <div v-for="(item, index) in successHint" :key="index" class="tab">
            <div class="icon" :class="item.icon"></div>
            <div class="text">{{item.text}}</div>
          </div>
        </div>
      </div>
      <div class="pie-box">
        <div id="myLine"></div>
        <div class="title-box">
          <div class="title">近7日客户活跃度</div>
          <div class="sub-title">(每小时更新)</div>
        </div>
      </div>
      <div class="pie-box">
        <div id="myPie"></div>
        <div class="title-box">
          <div class="title">客户兴趣占比</div>
          <div class="sub-title">(每小时更新)</div>
        </div>
        <div class="pie-list">
          <div v-for="(item, index) in pieHint" :key="index" class="list">
            <div class="icon" :class="item.icon"></div>
            <div class="text">{{item.text}}</div>
          </div>
        </div>
      </div>
      <div class="pie-box">
        <div id="myAddLine"></div>
        <div class="title-box">
          <div class="title">近7日新增客户数</div>
          <div class="sub-title">(每小时更新)</div>
        </div>
      </div>
      <div v-if="false" class="pie-box">
        <div id="myBar"></div>
        <div class="title-box">
          <div class="title">客户与我的互动</div>
          <div class="sub-title">(每天0点更新)</div>
        </div>
      </div>
      <div class="empty"></div>
    </div>
    <toast ref="toast"></toast>
  </article>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  import {ERR_OK} from '@utils/config'
  import Toast from '@components/_global-toast/_global-toast'
  const Echart = API.Echart
  const PIEHINT = [
    {text: '个人', icon: 'one'},
    {text: '商品', icon: 'two'},
    {text: '拼团', icon: 'thr'},
    {text: '砍价', icon: 'four'}
  ]
  const SUCCESSHINT = [
    {text: '0-50%', icon: ''},
    {text: '51-80%', icon: 'two'},
    {text: '81-99%', icon: 'thr'},
    {text: '100%', icon: 'four'}
  ]
  const PAGE_NAME = 'MY_DATA'
  export default {
    name: PAGE_NAME,
    components: {
      Toast
    },
    data() {
      return {
        pieData: new Array(4).fill({text:'', value: 0}),
        ationLine: {
          x: new Array(7).fill(0),
          y: new Array(7).fill(0)
        },
        addationLine: {
          x: new Array(7).fill(0),
          y: new Array(7).fill(0)
        },
        barData: {
          x: [],
          y: []
        },
        successData: [
          {name: 0, text:0, value: 80},
          {name: 0, text:0, value: 60},
          {name: 0, text:0, value: 40},
          {name: 0, text:0, value: 20}
        ],
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
        tabNumber: 0,
        pieHint: PIEHINT,
        successHint: SUCCESSHINT,
        merchantName: '请选择您要查看的店铺'
      }
    },
    watch: {
      $route(to, from) {
        let flag = from.path.includes('/home/shop-select')
        if (!flag) return
        this._initStoreData()
        if (!this.$storage.get('selectStore', {}).storeId) {
          this._initDraw()
          return
        }
        this.getActionLineData()
        this.getPieData()
        this.getAddActionLineData()
        this.getSuccessData()
        this.getAllDataObj('all')
      }
    },
    created() {
      if (!this.$storage.get('selectStore', {}).storeId) {
        return
      }
      this._initStoreData()
      this.getActionLineData()
      this.getPieData()
      this.getAddActionLineData()
      this.getSuccessData()
      this.getAllDataObj('all')
    // this.getBarData() // 暂时去掉最后一个图表
    },
    mounted() {
      this._initDraw()
    },
    methods: {
      // 初始化页面数据
      _initDraw() {
        if (this.$storage.get('selectStore', {}).storeId) {
          return
        }
        this.drawPie()
        this.drawLine()
        this.drawAddLine()
        this.drawSuccess()
      },
      _initStoreData() {
        this.merchantName = this.$storage.get('selectStore', {}).merchantName || '请选择您要查看的店铺'
      },
      // 选择店铺
      navToSelectHandle() {
        let url = `/home/shop-select`
        this.$router.push(url)
      },
      // 画图
      drawPie() {
        let myChart = this.$echarts.init(document.getElementById('myPie'))
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{d}%'
          },
          color: ['#F9543C', '#23799D', '#8E3C68', '#F9B43C'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['50%', '54%'],
              data: this.pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('myLine'))
        myChart.setOption({
          grid: {
            top: 45,
            left: '2%',
            right: '5%',
            bottom: 15,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.ationLine.x,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6',
                width: 0.5
              }
            },
            axisLabel: {
              color: '#343439',
              align: 'center'
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '活跃度：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          yAxis: {
            minInterval: 1,
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6',
                width: 0.5
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            },
            axisLabel: {
              formatter: '{value}',
              color: '#343439'
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            }
          },
          series: [
            {
              data: this.ationLine.y,
              type: 'line',
              smooth: true,
              showSymbol: false,
              smoothMonotone: 'x',
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  x2: 0,
                  y: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(249,80,60,0.55)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(249,80,60,0.05)'
                    }
                  ],
                  globalCoord: false
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(249,80,60,0.85)',
                  borderWidth: 2,
                  lineStyle: {
                    color: 'rgba(249,80,60,0.75)',
                    width: 3
                  }
                }
              }
            }
          ]
        })
      },
      drawAddLine() {
        let myChart = this.$echarts.init(document.getElementById('myAddLine'))
        myChart.setOption({
          grid: {
            top: 45,
            left: '2%',
            right: '5%',
            bottom: 15,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.addationLine.x,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6',
                width: 0.5
              }
            },
            axisLabel: {
              color: '#343439',
              align: 'center'
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '新用户数：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          yAxis: {
            minInterval: 1,
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6',
                width: 0.5
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            },
            axisLabel: {
              formatter: '{value}',
              color: '#343439'
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            }
          },
          series: [
            {
              data: this.addationLine.y,
              type: 'line',
              smooth: true,
              showSymbol: false,
              smoothMonotone: 'x',
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  x2: 0,
                  y: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(249,80,60,0.55)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(249,80,60,0.05)'
                    }
                  ],
                  globalCoord: false
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(249,80,60,0.85)',
                  borderWidth: 2,
                  lineStyle: {
                    color: 'rgba(249,80,60,0.75)',
                    width: 3
                  }
                }
              }
            }
          ]
        })
      },
      drawBar() {
        let myChart = this.$echarts.init(document.getElementById('myBar'))
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            formatter: '{b}数：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          grid: {
            top: 45,
            left: '0',
            right: '5%',
            bottom: 15,
            containLabel: true
          },
          xAxis: {
            minInterval: 1,
            type: 'value',
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: '#20202E',
              fontSize: 12,
              formatter: function(value) {
                return value
              },
              align: 'center'
            },
            axisTick: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            }
          },
          yAxis: {
            type: 'category',
            data: this.barData.y,
            axisLabel: {
              interval: 0,
              color: '#20202E',
              fontSize: 12
            },
            axisTick: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            }
          },
          series: [
            {
              data: this.barData.x,
              type: 'bar',
              showSymbol: false,
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: '#F9543C',
                  borderWidth: 2,
                  lineStyle: {
                    color: '#F9543C',
                    width: 3
                  }
                }
              }
            }
          ]
        })
      },
      drawSuccess() {
        let myChart = this.$echarts.init(document.getElementById('mySuccess'))
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          series: [
            {
              name: '漏斗图',
              type: 'funnel',
              left: '15%',
              top: 45,
              bottom: 40,
              width: '70%',
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              color: ['#F9B43C', '#F9543C', '#8E3C68', '#23799D'],
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                },
                emphasis: {
                  textStyle: {
                    fontSize: 20
                  }
                }
              },
              labelLine: {
                normal: {
                  length: 10,
                  lineStyle: {
                    width: 1,
                    type: 'solid'
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: 1
                }
              },
              data: this.successData
            }
          ]
        })
      },
      getPieData() {
        Echart.getPie().then((res) => {
          this.$loading.hide()
          if (res.error === ERR_OK) {
            this.pieData = res.data
            this.drawPie()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getActionLineData() {
        Echart.getActionLine().then((res) => {
          this.$loading.hide()
          if (res.error === ERR_OK) {
            this.ationLine = res.data
            this.drawLine()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getAddActionLineData() {
        Echart.getAddLine().then((res) => {
          this.$loading.hide()
          if (res.error === ERR_OK) {
            this.addationLine = res.data
            this.drawAddLine()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getBarData() {
        Echart.getBar().then((res) => {
          this.$loading.hide()
          if (res.error === ERR_OK) {
            this.barData = res.data
            this.drawBar()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getSuccessData() {
        Echart.getSuccess().then((res) => {
          this.$loading.hide()
          if (res.error === ERR_OK) {
            this.successData = res.data
            this.drawSuccess()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      eConsole(param) {
      // if (param.data.text >= 0) {
      //   const progress = param.value // id为80则分组0-50,60则分组51-80,40则分组81-99,20则分组100
      //   const useType = 'overview'
      //   const pageUrl = `/overview/customer-list`
      //   this.$router.push({path: pageUrl, query: {pageUrl, useType, progress}})
      // }
      },
      getAllDataObj(time) {
        Echart.getAllData(time).then((res) => {
          this.$loading.hide()
          if (res.error === ERR_OK) {
            this.allDatas = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getAllTab(item, index) {
        if (!this.$storage.get('selectStore', {}).storeId) {
          this.$toast.show('请选择店铺')
          return
        }
        this.getAllDataObj(item.value)
        this.tabNumber = index
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $tab-top = (32 + 40)px
  @import "~@design"
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .overview
    position: relative

  .empty
    height :36px

  .data-tab-container
    height :45px
    background :#fff
    padding :0 63px
    .data-tab-wrapper
      height :45px
      background :#fff
      layout(row,block,nowrap)
      position:relative
      .tab
        flex:1
        layout()
        justify-content :center
        align-items : center
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color:#363547
        letter-spacing: 0.3px;
        line-height: 1
        &.active
          color: $color-main
      .line-wrapper
        position :absolute
        bottom :0
        width :25%
        height :3px
        transform :translate3d(0,0,0)
        transition :all 0.3s
        .line
          row-center()
          width :30px
          height :3px
          background :$color-main

  .select-wrapper
    height :40px
    background :#fff
    layout()
    align-items :center
    .s-container
      background :rgba(218,217,226,0.3)
      height :26px
      border-radius: 26px
      padding :0 12px
      layout(row,block,nowrap)
      justify-content :center
      align-items :center
      font-family: PingFangSC-Regular
      font-size: 14px
      color: #27273E
      letter-spacing: 0.3px
      line-height: 1
      .s-text
        margin-right :7px

  .data-all
    fill-box()
    z-index: 11

  .data-top
    position: relative
    .cliten-bg
      position: absolute
      z-index: 1
      height: 73px
      background: #363547
      width: 100%
      top: 0
      left: 0
    .cliten-box
      position: relative
      padding-top :5px
      width: 100%
      z-index: 2
      .cliten-con-bg
        position: absolute
        display: block
        width: 100%
        height: 100%
        left: 0
        top: 0
        z-index: 0
      .data-number-box
        padding-top: 20px
        position: relative
        background: #fff
        z-index: 11
        .data-tab
          position: relative
          z-index: 11
          layout(row)
          margin: 0 auto
          width: 240px
          border: 0.5px solid rgba(32, 32, 46, 0.1)
          .tab
            border-right: 0.5px solid rgba(32, 32, 46, 0.1)
            height: 30px
            font-size: $font-size-14
            color: #20202E
            font-family: $font-family-medium
            line-height: 30px
            width: 25%
            text-align: center
          .tab:last-child
            border-right: 0
          .active
            background: #363547
            color: #fff
        .data-list
          position: relative
          z-index: 11
          layout(row,block)
          padding: 35px 18.75px
          .list-box
            width: 33.33%
            text-align: center
            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3)
              padding-bottom : 42.5px
            .number
              font-size: 24px
              line-height: 1
              color: #20202e
              font-family: 'DINCondensed-Bold'
            .text
              font-size: $font-size-12
              color: #20202e
              font-family: $font-family-medium
              margin-top: 5px
  .ai-box
    padding-top :5px
    .pie-box
      position: relative
      background: #fff
      height: 305px
      margin-bottom: 5px
      #myPie
        width: 100%
        height: 305px
        margin: 0 auto
        padding: 20px
      #mySuccess
        width: 100%
        height: 305px
        margin: 0 auto
        padding: 35px 0 0
      #myLine
        width: 100%
        height: 305px
        margin: 0 auto
        padding: 35px 10px 0
      #myAddLine
        width: 100%
        height: 305px
        margin: 0 auto
        padding: 35px 10px 0
      #myBar
        width: 100%
        height: 305px
        margin: 0 auto
        padding: 35px 10px 0
      #myChartfour
        width: 100%
        height: 305px
        margin: 0 auto
        padding: 35px 0 0
      .title-box
        position: absolute
        width: 100%
        text-align: center
        top: 20px
        left: 0
        .title
          font-size: $font-size-16
          color: #202020
          font-family: $font-family-regular
        .sub-title
          margin-top: 5px
          font-size: $font-size-12
          color: #888888
          font-family: $font-family-regular
      .bottom-des
        position: absolute
        bottom: 15px
        layout(row)
        width: 100%
        .tab
          layout(row)
          justify-content: center
          align-items: center
          width: 25%
          .icon
            background: #F9B43C
            width: 6px
            height: 6px
            border-radius: 50%
            margin-right: 3px
          .two
            background: #F9543C
          .thr
            background: #8E3C68
          .four
            background: #23799D
          .text
            font-size: $font-size-12
            font-family: $font-family-regular
            color: #20202E
      .pie-list
        layout(row)
        position: absolute
        width: 100%
        bottom: 15px
        left: 0
        .list
          flex: 1
          layout(row)
          align-items: center
          justify-content: center
          .icon
            background: #F9543C
            width: 7px
            height: 7px
            margin-right: 4px
            border-radius: 50%
          .two
            background: #23799D
          .thr
            background: #8E3C68
          .four
            background: #F9B43C
          .text
            line-height: 1
            font-size: $font-size-12
            color: #202020
            font-family: $font-family-regular

</style>
