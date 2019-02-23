import echarts from 'echarts'
const itemNumber = 6
/**
 * 默认X轴的值=>xAxisData
 * @type {string[]}
 */
const DEFAULT_X_DATA = new Array(itemNumber).fill(1).map((item, index) => {
  return `城市${(index + 1)}`
})
/**
 * 默认y轴的值=>seriesData
 * @type {Array}
 */
let DEFAULT_SERIES_DATA = new Array(itemNumber).fill(1).map(() => {
  return ~~(Math.random() * 1000) // todo
  // return 0
})
let dataShadow = new Array(itemNumber).fill(1000)
export function createCityTop(args = {}) {
  let {xAxisData, seriesData} = args
  if (!xAxisData || !xAxisData.length) {
    xAxisData = DEFAULT_X_DATA
  }
  if (!seriesData || !seriesData.length) {
    seriesData = DEFAULT_SERIES_DATA
  }
  return {
    grid: {
      top: '8.149779735682818%',
      left: '6.415954415954416%',
      right: '10%',
      bottom: '8.828193832599119%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      offset: 5.5,
      splitLine: {
        show: false,
        lineStyle: {
          color: '#E6E6E6',
          width: 0.5
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: 12,
        align: 'center'
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#ccc',
          width: 0.5
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#ccc',
          width: 0.5
        }
      }
    },
    yAxis: {
      minInterval: 1,
      type: 'value',
      offset: 10.5,
      splitLine: {
        show: false,
        lineStyle: {
          color: '#EFEFEF',
          width: 0.5,
          type: 'dotted'
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
        color: '#666'
      },
      axisLine: {
        show: false,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter(prams) {
        return `${prams[1].name}：${prams[1].value}`
      }
    },
    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: '#F5F6F9'
          }
        },
        barGap: '-100%',
        // barCategoryGap: '80%',
        barWidth: '12px',
        data: dataShadow,
        animation: false,
        zlevel: 9
      },
      {
        type: 'bar',
        data: seriesData,
        barWidth: '12px',
        zlevel: 11,
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 1, color: '#BE85FD'},
                {offset: 0, color: '#A08FF6'}
              ]
            )
          }
        }
      }
    ]
  }
}
