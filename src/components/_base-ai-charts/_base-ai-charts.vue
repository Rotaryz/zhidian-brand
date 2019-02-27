<template>
  <div class="ai-charts" :style="chartsHeight">
    <section class="chart-item-wrapper">
      <div ref="chartItem" class="chart-item"></div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {CHARTS_TYPE, CHARTS_CONFIG, BASE_CHARTS_HEIGHT} from '@utils/constants-charts'
  const COMPONENT_NAME = 'CHARTS_LINE'
  export default {
    name: COMPONENT_NAME,
    props: {
      chartsType: {
        type: String,
        default: CHARTS_TYPE.PNES
      }
    },
    data() {
      return {
        myChart: null
      }
    },
    computed: {
      CHARTS_CONFIG() {
        return CHARTS_CONFIG[this.chartsType]
      },
      chartsHeight() {
        let styles = CHARTS_CONFIG[this.chartsType].styles
        if (!styles) {
          styles = `padding-top:${CHARTS_CONFIG[this.chartsType].height || BASE_CHARTS_HEIGHT}%`
        }
        return styles
      }
    },
    beforeDestroy() {
      this.myChart = null
    },
    methods: {
      async action(data) {
        this.myChart = this.$echarts.init(this.$refs.chartItem)
        if (this.myChart == null) return
        let config = await this.CHARTS_CONFIG.createOption(data)
        this.myChart.setOption(config)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .ai-charts
    width: 100%
    height :0
    padding-top :64.67236467236467%
    position :relative
    .chart-item-wrapper
      fill-box(absolute)
      .chart-item
        height :100%

</style>
