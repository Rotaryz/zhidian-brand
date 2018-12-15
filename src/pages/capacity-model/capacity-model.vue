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
                    <div class="full-name">{{clientData.position}}</div>
                  </div>
                </div>
              </div>
              <div class="detail-jump" @click="toBusinessCard">
                <img class="jump-img" src="./icon-pressed@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-wrapper select-client">
        <div class="line-wrap select-client" :style="'transform: translate3d('+ (menuIdx * 100) +'%, 0, 0)'"></div>
        <div v-for="(item,index) in tabList" :key="index" class="tab" @click="switchTab(index)">{{item}}</div>
      </div>
      <div v-if="menuIdx * 1 === 0" class="capacity">
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class="six-box">
          <div class="six-model-box">
            <div id="six-model"></div>
          </div>
        </div>
        <div class="six-title">
          <div class="six-top">
            <div class="left">销售力综合排名</div>
            <div class="right">{{dataRank.sales_force || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">获客能力排名</div>
            <div class="right">{{dataRank.customer_competence || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">销售能力排行</div>
            <div class="right">{{dataRank.order_force || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">客户互动力排名</div>
            <div class="right">{{dataRank.customer_interaction || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">产品推动力排名</div>
            <div class="right">{{dataRank.product_drive || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">客户跟进力排行</div>
            <div class="right">{{dataRank.customer_followup || 0}}</div>
          </div>
          <div class="six-bottom">
            <div class="left">活动推动力排行</div>
            <div class="right">{{dataRank.activity_drive || 0}}</div>
          </div>
        </div>
      </div>
      <div v-if="menuIdx * 1 === 1" class="ai-box">
        <div class="data-top">
          <div class="cliten-box">
            <div class="data-number-box">
              <img class="cliten-con-bg" src="./bg-customer_details@2x.png" alt="">
              <div class="data-tab">
                <div v-for="(item, index) in tabMoreList" :key="index" class="tab"
                     :class="tabNumber === index ? 'active' : '' " @click="getAllTab(item, index)"
                >{{item.text}}
                </div>
              </div>
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
            </div>
          </div>
        </div>
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
          <div id="myLine"></div>
          <div class="title-box">
            <div class="title">近7日客户活跃度</div>
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
      </div>
      <div v-if="menuIdx * 1 === 2" class="visitor-box">
        <div v-if="actionList.length * 1 !== 0" class="box-list">
          <div v-for="(item, index) in actionList" :key="index" class="msgs-item">
            <div v-if="item.is_showtime" class="item-time">{{item.created_at | timeFormat}}</div>
            <div class="msg-item-content">
              <img :src="item.image_url" class="msgs-left">
              <div class="msgs-right">
                <div class="msgs-container">
                  <p v-show="item.event_no * 1 === 10001" class="msgs-p">{{item.nickname}}通过扫描他人分享的小店海报<span class="green">访问</span>了<span class="green">你的小店</span></p>
                  <p v-show="item.event_no * 1 === 10002" class="msgs-p">{{item.nickname}}通过点击他人分享的小店链接<span class="green">访问</span>了<span class="green">你的小店</span></p>
                  <p v-show="item.event_no * 1 === 10003" class="msgs-p">{{item.nickname}}第{{item.count_sum | titleCut}}次<span class="green">查看</span>了<span class="green">你的小店</span></p>
                  <p v-show="item.event_no * 1 === 10004" class="msgs-p">{{item.nickname}}<span class="green">转发</span>了你的<span class="green">小店</span>，你的人脉圈正在裂变</p>
                  <p v-show="item.event_no * 1 === 10005" class="msgs-p">{{item.nickname}}<span class="green">保存</span>了你的<span class="green">小店海报</span></p>
                  <p v-show="item.event_no * 1 === 10006" class="msgs-p">{{item.nickname}}给你<span class="green">点了</span><span class="green">赞</span>，看来认可你</p>
                  <p v-show="item.event_no * 1 === 10007" class="msgs-p">{{item.nickname}}<span class="green">取消</span>给你点的<span class="green">赞</span></p>
                  <p v-show="item.event_no * 1 === 30001" class="msgs-p">{{item.nickname}}给拼团活动<span class="green">{{item.title | titleCut}}</span>点了<span class="green">赞</span></p>
                  <p v-show="item.event_no * 1 === 30002" class="msgs-p">{{item.nickname}}正在转发你的拼团活动<span class="green">{{item.title | titleCut}}</span>，您的活动正在裂变</p>
                  <p v-show="item.event_no * 1 === 30003" class="msgs-p">{{item.nickname}}<span class="green">保存</span>了你的拼团活动<span class="green">{{item.title | titleCut}}</span>海报</p>
                  <p v-show="item.event_no * 1 === 30004" class="msgs-p">{{item.nickname}}通过扫描他人分享的拼团海报<span class="green">访问</span>了你的拼团活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30005" class="msgs-p">{{item.nickname}}通过点击他人分享的拼团链接<span class="green">访问</span>了你的拼团活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30006" class="msgs-p">{{item.nickname}}正在<span class="green">查看</span>拼团活动<span class="green">{{item.title | titleCut}}</span>，可能对该活动感兴趣</p>
                  <p v-show="item.event_no * 1 === 30007" class="msgs-p">{{item.nickname}}正在<span class="green">发起</span>拼团活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30008" class="msgs-p">{{item.nickname}}正在<span class="green">参加</span>拼团活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30009" class="msgs-p">{{item.nickname}}提交了拼团活动<span class="green">{{item.title | titleCut}}</span>的订单，金额为<span class="green">{{item.total}}元</span></p>
                  <p v-show="item.event_no * 1 === 30010" class="msgs-p">{{item.nickname}}提交了拼团活动<span class="green">{{item.title | titleCut}}</span>的订单，金额为<span class="green">{{item.total}}元</span>，并完成了支付</p>
                  <p v-show="item.event_no * 1 === 30011" class="msgs-p">{{item.nickname}}正在<span class="green">邀请</span>好友来参加拼团活动<span class="green">{{item.title | titleCut}}</span>您的活动正在裂变</p>
                  <p v-show="item.event_no * 1 === 30012" class="msgs-p">{{item.nickname}}通过他人分享的拼团链接，正在参加拼团活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30013" class="msgs-p">{{item.nickname}}通过扫描他人分享的砍价海报<span class="green">访问</span>了你的砍价活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30014" class="msgs-p">{{item.nickname}}通过点击他人分享的砍价链接<span class="green">访问</span>了你的砍价活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30015" class="msgs-p">{{item.nickname}}正在<span class="green">查看</span>砍价活动<span class="green">{{item.title | titleCut}}</span>，可能对该活动感兴趣</p>
                  <p v-show="item.event_no * 1 === 30016" class="msgs-p">{{item.nickname}}正在<span class="green">转发</span>你的砍价活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30017" class="msgs-p">{{item.nickname}}<span class="green">保存</span>你的砍价活动海报</p>
                  <p v-show="item.event_no * 1 === 30018" class="msgs-p">{{item.nickname}}给砍价活动<span class="green">{{item.title | titleCut}}</span>点了<span class="green">赞</span></p>
                  <p v-show="item.event_no * 1 === 30019" class="msgs-p">{{item.nickname}}正在<span class="green">参与</span>砍价活动<span class="green">{{item.title | titleCut}}</span>，成功砍掉<span class="green">{{item.total}}元</span></p>
                  <p v-show="item.event_no * 1 === 30020" class="msgs-p">{{item.nickname}}<span class="green">邀请</span>好友来参加砍价活动<span class="green">{{item.title | titleCut}}</span>您的活动正在裂变</p>
                  <p v-show="item.event_no * 1 === 30021" class="msgs-p">{{item.nickname}}正在<span class="green">购买</span>砍价活动<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 30022" class="msgs-p">{{item.nickname}}提交了砍价活动<span class="green">{{item.title | titleCut}}</span>的订单，金额为<span class="green">{{item.total | titleCut}}元</span></p>
                  <p v-show="item.event_no * 1 === 30023" class="msgs-p">{{item.nickname}}提交了砍价活动<span class="green">{{item.title | titleCut}}</span>的订单，金额为<span class="green">{{item.total | titleCut}}元</span>，并完成了支付</p>
                  <p v-show="item.event_no * 1 === 40001" class="msgs-p">{{item.nickname}}通过扫描他人分享的服务海报<span class="green">查看</span>了<span class="green">你的服务</span></p>
                  <p v-show="item.event_no * 1 === 40002" class="msgs-p">{{item.nickname}}通过点击他人分享的服务链接<span class="green">查看</span>了<span class="green">你的服务</span></p>
                  <p v-show="item.event_no * 1 === 40003" class="msgs-p">{{item.nickname}}第{{item.count_sum}}次<span class="green">查看</span>了你的服务<span class="green">{{item.title | titleCut}}</span>，请把握商机</p>
                  <p v-show="item.event_no * 1 === 40004" class="msgs-p">{{item.nickname}}<span class="green">转发</span>了你的服务<span class="green">{{item.title | titleCut}}</span>，你的服务正在裂变</p>
                  <p v-show="item.event_no * 1 === 40005" class="msgs-p">{{item.nickname}}<span class="green">保存</span>了你的服务<span class="green">{{item.title | titleCut}}</span>海报</p>
                  <p v-show="item.event_no * 1 === 40006" class="msgs-p">{{item.nickname}}提交了服务<span class="green">{{item.title | titleCut}}</span>的订单，金额为<span class="green">{{item.total}}元</span>，并完成了支付</p>
                  <p v-show="item.event_no * 1 === 40007" class="msgs-p">{{item.nickname}}第{{item.count_sum}}次<span class="green">查看</span>了你的<span class="green">品牌故事</span>，请把握商机</p>
                  <p v-show="item.event_no * 1 === 50001" class="msgs-p">{{item.nickname}}第{{item.count_sum}}次<span class="green">查看</span>了你的<span class="green">动态</span></p>
                  <p v-show="item.event_no * 1 === 50002" class="msgs-p">{{item.nickname}}通过扫描他人分享的动态海报<span class="green">访问</span>了你的动态<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 50003" class="msgs-p">{{item.nickname}}通过点击他人分享的动态链接<span class="green">访问</span>了你的动态<span class="green">{{item.title | titleCut}}</span></p>
                  <p v-show="item.event_no * 1 === 50004" class="msgs-p">{{item.nickname}}<span class="green">评论</span>了你的<span class="green">动态</span></p>
                  <p v-show="item.event_no * 1 === 50005" class="msgs-p">{{item.nickname}}给你的动态<span class="green">{{item.title | titleCut}}</span>点了<span class="green">赞</span></p>
                  <p v-show="item.event_no * 1 === 60001" class="msgs-p">{{item.nickname}}<span class="green">拨打</span>了你的<span class="green">手机</span>，请记录跟进内容</p>
                  <p v-show="item.event_no * 1 === 60002" class="msgs-p">{{item.nickname}}正在对砍价活动<span class="green">{{item.title | titleCut}}</span>向你<span class="green">咨询</span>，请做好准备应答</p>
                  <p v-show="item.event_no * 1 === 60003" class="msgs-p">{{item.nickname}}正在对拼团活动<span class="green">{{item.title | titleCut}}</span>向你<span class="green">咨询</span>，请做好准备应答</p>
                  <p v-show="item.event_no * 1 === 60004" class="msgs-p">{{item.nickname}}正在对服务<span class="green">{{item.title | titleCut}}</span>向你<span class="green">咨询</span>，请做好准备应答</p>
                </div>
                <!--<img src="./icon-pressed@2x.png" class="msgs-rt">-->
              </div>
            </div>
          </div>
        </div>
        <section v-if="actionList.length * 1 === 0" class="exception-box">
          <exception errType="nodata"></exception>
        </section>
      </div>
    </scroll>
    <div v-if="showTab" class="tab-wrapper">
      <div class="line-wrap" :style="'transform: translate3d('+ (menuIdx * 100) +'%, 0, 0)'"></div>
      <div v-for="(item,index) in tabList" :key="index" class="tab" @click="switchTab(index)">{{item}}</div>
    </div>
    <!--<div class="select-tab" v-if="showTab">-->
    <!--<div class="tab" v-for="(item, index) in tabList" v-bind:key="index" @click="switchTab(index)">{{item}}</div>-->
    <!--<div class="line" :style="'transform:translate3d('+ (100 * menuIdx) + '%, 0, 0)'">-->
    <!--<div class="chilen-line"></div>-->
    <!--</div>-->
    <!--</div>-->
    <base-router-view></base-router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  import Scroll from '@components/scroll/scroll'
  import Exception from '@components/exception/exception'
  import {radarTimeFormat} from '@utils/common'

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
  const Echart = API.Echart
  const ClientDetail = API.Echart
  export default {
    name: 'CapacityModel',
    components: {
      Scroll,
      Exception
    },
    filters: {
      titleCut(val) {
        if (val && val.length > 8) {
          return val.slice(0, 8) + '···'
        } else {
          return val
        }
      },
      timeFormat(val) {
        if (val) {
          let res = radarTimeFormat(val)
          return res.time
        }
        return ''
      }
    },
    data() {
      return {
        listenScroll: true,
        probeType: 3,
        bcColor: '#F0F2F5',
        tabList: ['能力模型', '数据分析', '来访记录'],
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
        tabhighgt: 216,
        highgt: 216,
        labelList: [],
        pieData: [{value: 1, name: '对我感兴趣'}, {value: 1, name: '对产品感兴趣'}, {value: 1, name: '对公司感兴趣'}],
        ationLine: {
          x: [],
          y: []
        },
        barData: {
          x: [],
          y: []
        },
        sixData: {},
        showTab: false,
        allDatas: {},
        successData: [],
        dataRank: {},
        actionMore: false,
        pieHint: PIEHINT,
        successHint: SUCCESSHINT
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
      this.id = this.$route.query.id
      this.clientData = {
        name: this.$storage.get('user').name,
        avatar: this.$storage.get('user').avatar,
        position: this.$storage.get('user').position
      }
      this.getActionLineData() // 员工能力模型图
      this.getPieData()
      // this.getBarData() 废弃
      this.getSixData()
      this.getSuccessData()
      this.getAllDataObj('all') // 全部数据展示
      this.getNewActionList(this.id) // 行为事件列表
      this.getDataRank() // 员工各能力排行
    },
    mounted() {
      this.highgt = this.$refs.eleven.offsetHeight
      this.tabhighgt = this.$refs.eleven.offsetHeight
    },
    beforeDestroy() {
      // this.$emit('refresh')
      this.$storage.remove('user')
    },
    methods: {
      scroll(pos) {
        let hightPx = pos.y * -1
        if (hightPx >= this.highgt) {
          this.showTab = true
        } else {
          this.showTab = false
        }
      },
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
      drawSix() {
        let myChart = this.$echarts.init(document.getElementById('six-model'))
        // 绘制图表
        myChart.setOption({
          radar: [
            {
              indicator: this.sixData.data,
              name: {
                textStyle: {
                  color: '#888'
                }
              },
              center: ['50%', '50%'],
              radius: 80
            }
          ],
          graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            z: 2,
            zlevel: 100,
            style: {
              text: this.sixData.total,
              x: 100,
              y: 100,
              textAlign: 'center',
              fill: '#202020',
              width: 30,
              height: 30,
              fontSize: 18
            }
          },
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'default',
                    color: '#5394f5'
                  },
                  lineStyle: {
                    color: '#5394f5',
                    width: 1
                  }
                }
              },
              symbol: 'none',
              data: [
                {
                  value: this.sixData.value,
                  name: '某软件'
                }
              ]
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
      switchTab(index) {
        this.$refs.scroll.scrollTo(0, 0)
        this.scroll(0)
        this.menuIdx = index
        if (index * 1 === 1) {
          setTimeout(() => {
            this.drawPie()
            this.drawLine()
            // this.drawBar()
            this.drawSuccess()
          }, 200)
        }
        if (index * 1 === 0) {
          setTimeout(() => {
            this.drawSix()
          }, 200)
        }
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 20)
      },
      getAllDataObj(time) {
        Echart.getAllData(time, this.id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.allDatas = res.data
          } else {
            this.$toast.show(res.message)
          }
        })
      },
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
      toBusinessCard() {
        const id = this.id
        const url = `${this.$route.path}/business-card?id=${id}`
        this.$router.push(url)
      },
      onPullingUp() {
        if (this.menuIdx * 1 === 0) {
          this.$refs.scroll.forceUpdate()
        }
        if (this.menuIdx * 1 === 2) {
          this.getMoreActionList(this.id)
        }
        if (this.menuIdx * 1 === 1) {
          this.$refs.scroll.forceUpdate()
        }
        if (this.menuIdx * 1 === 2 && this.noActionMore) {
          this.$refs.scroll.forceUpdate()
        }
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      getPieData() {
        Echart.getPie(this.id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.pieData = res.data
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      getActionLineData() {
        Echart.getActionLine(this.id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.ationLine = res.data
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      // getBarData() {
      //   Echart.getBar(this.id).then((res) => {
      //     this.$loading.hide()
      //     if (res.error === this.$ERR_OK) {
      //       this.barData = res.data
      //     } else {
      //       this.$toast.show(res.message)
      //     }
      //   })
      // },
      getSixData() {
        Echart.getEmployee(this.id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.sixData = res.data
            this.drawSix()
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      getAllTab(item, index) {
        this.getAllDataObj(item.value)
        this.tabNumber = index
      },
      getSuccessData() {
        Echart.getSuccess(this.id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.successData = res.data
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      getDataRank() {
        Echart.getEmployeeRank(this.id).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.dataRank = res.data
          } else {
            this.$toast.show(res.message)
          }
        })
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
    .cliten-bg
      position: absolute
      z-index: 1
      height: 73px
      background: #20202E
      width: 100%
      top: 0
      left: 0
    .cliten-box
      position: relative
      padding: 20px 15px 0
      width: 100%
      z-index: 2
      .cliten-con
        background: #fff
        width: 100%
        padding: 15px
        position: relative
        .cliten-con-bg
          position: absolute
          display: block
          width: 100%
          height: 100%
          left: 0px
          top: 0px
          z-index: 0
        .cliten-img
          layout(row)
          justify-content: space-between
          align-items: center
          position: relative
          z-index: 1
          .detail-img-box
            layout(row)
            .img
              position: relative
              width: 60px
              height: 60px
              border-radius: 50%
              background: #ccc
              overflow: hidden
              img
                width: 60px
                height: 60px
                display: block
            .label-right
              margin-left: 10px
              .label-name
                font-size: $font-size-16
                color: #20202E
                font-family: $font-family-medium
                padding-top: 5px
                margin-bottom: 20px
              .label-box
                layout(row)
                .full-name
                  font-size: $font-size-12
                  color: #888888
                  font-family: $font-family-medium
          .detail-jump
            height: 45px
            width: 25px
            position: relative
            .jump-img
              width: 6px
              height: 12px
              position: absolute
              right: 0
              top: 0
              bottom: 0
              margin: auto
  .tab-wrapper
    display: flex
    position: fixed
    width: 100%
    top: 0
    left: 0
    z-index: 11
    background: #F0F2F5
    height: 48px
    line-height: 47px
    layout(row, block, nowrap)
    border-bottom: 1px solid rgba(0,0,0,.1)
    .tab
      flex: 1
      font-family: $font-family-regular
      font-size: $font-size-16
      color: #20202E
      letter-spacing: 0.6px
      text-align: center;
    .line-wrap
      position: absolute
      left: 0
      bottom: 0
      right: 0
      width: 33.333%
      layout()
      align-items: center
      transition: all 0.3s
      &:after
        content: ''
        width: 30px
        height: 3px
        background: #EF705D
  .select-client
    position: relative

  .visitor-box
    padding: 0 15px 15px
    .box-list
      .time
        font-size: $font-size-14
        color: #20202E
        font-family: $font-family-medium
      .item-list
        layout(row)
        margin-top: 15px
        background: #fff
        padding: 7.5px 40px 7.5px 10px
        align-items: center
        .left-img
          width: 40px
          height: 40px
          background: #333
          margin-right: 10px
          .img
            display: block
            width: 40px
            height: 40px
            background: #333
        .left-text
          flex: 1
          font-size: $font-size-14
          color: $color-text
          font-family: $font-family-medium
          span
            color: #56BA15

  .ai-box
    padding: 15px
    .pie-box
      position: relative
      background: $color-white
      height: 305px
      margin-bottom: 10px
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
        margin: 20px auto
        padding: 20px

  .msgs-item
    margin-top: 18px
    .item-time
      font-family: $font-family-medium
      font-size: $font-size-18
      color: #20202E
      padding: 10px 0 15px
    .msg-item-content
      width: 100%
      height: 70px
      background: $color-white
      border: 0.5px solid rgba(32, 32, 46, 0.10)
      box-shadow: 0 4px 12px 0 rgba(43, 43, 145, 0.04)
      border-radius: 5px
      display: flex
      justify-content: space-between
      align-items: center
    .msgs-left
      margin: 0 10px 0 15px
      width: 40px
      height: 40px
      border-radius: 50%
      border: 0.5px solid rgba(32, 32, 46, 0.10)
    .msgs-right
      flex: 1
      overflow: hidden
      margin-right: 13.5px
      height: 100%
      display: flex
      justify-content: space-between
      align-items: center
      .msgs-container
        flex: 1
        overflow: hidden
        height: 100%
        display: flex
        align-items: center
        .msgs-p
          line-height: 18px
          font-family: $font-family-medium
          font-size: $font-size-14
          .green
            color: #EF705D
      .msgs-rt
        width: 7.5px
        height: 11.5px
        margin-left: 33px

  .msgs-item:last-child
    margin-bottom: 0

  .six-title
    padding: 0 15px 20px 30px
    .six-top
      layout(row)
      justify-content: space-between
      height: 45px
      line-height: 45px
      border-bottom: 0.5px solid rgba(0, 0, 0, .1)
      padding-right: 5px
      .left
        font-size: $font-size-16
        color: #20202e
        font-family: $font-family-medium
      .right
        font-size: 25px
        color: #20202e
        font-family: 'DINCondensed-Bold'
    .six-bottom
      layout(row)
      justify-content: space-between
      height: 45px
      line-height: 45px
      border-bottom: 0.5px solid rgba(0, 0, 0, .1)
      padding-right: 5px
      .left
        font-size: $font-size-14
        color: #888888
        font-family: $font-family-medium
      .right
        font-size: 20px
        color: #888888
        font-family: 'DINCondensed-Bold'

  .data-top
    position: relative
    .cliten-bg
      position: absolute
      z-index: 1
      height: 73px
      background: #20202E
      width: 100%
      top: 0
      left: 0
    .cliten-box
      position: relative
      width: 100%
      z-index: 2
      margin-bottom: 10px
      .cliten-con-bg
        position: absolute
        display: block
        width: 100%
        height: 100%
        left: 0px
        top: 0px
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
          layout(row)
          padding: 0 0 24px
          .list-box
            width: 33.33%
            text-align: center
            padding: 18px 0 0
            .number
              font-size: 32px
              line-height: 32px
              color: #20202e
              font-family: 'DINCondensed-Bold'
            .text
              font-size: $font-size-12
              color: #20202e
              font-family: $font-family-medium
              margin-top: 5px

  .z
    width: 100%
</style>
