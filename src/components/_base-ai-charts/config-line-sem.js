import APP_CONFIG from '@utils/_app-config'
/**
 * 默认X轴的值=>xAxisData
 * @type {string[]}
 */
const DEFAULT_X_DATA = new Array(7).fill(1).map((item, index) => {
  return `${(index + 1) * 2}:00`
})
/**
 * 默认y轴的值=>seriesData
 * @type {Array}
 */
let DEFAULT_SERIES_DATA_FN
if (APP_CONFIG.env === 'production') {
  DEFAULT_SERIES_DATA_FN = (number) => {
    return new Array(number).fill({
      data: new Array(7).fill(0)
    })
  }
} else {
  // 默认y轴的值=>seriesData.item
  let DEFAULT_SERIES_DATA_ITEM = (itemNumber) => {
    return new Array(7).fill(1).map((item, index) => {
      return ~~(Math.random() * (itemNumber)) * 0 // todo
    })
  }
  DEFAULT_SERIES_DATA_FN = (number, itemNumberArr = []) => {
    return new Array(number).fill(1).map((item, index) => {
      return {
        data: DEFAULT_SERIES_DATA_ITEM(itemNumberArr[index] || 100)
      }
    })
  }
}
export function createSEM(args = {}) {
  let {xAxisData, seriesData, isClosed} = args
  const smooth = 0.5
  let colorObj = [
    {
      name: '活跃度',
      color: '#8867F2',
      colorStops0: 'rgba(136,103,242,0.55)',
      colorStops1: 'rgba(136,103,242,0.05)'
    }
  ]
  if (!isClosed) {
    colorObj = [
      {
        name: '活跃度',
        color: '#CDCDCD',
        colorStops0: 'rgba(205,205,205, 0.55)',
        colorStops1: 'rgba(205,205,205, 0.05)'
      }
    ]
  }
  if (!xAxisData || !xAxisData.length) {
    xAxisData = DEFAULT_X_DATA
  }
  if (!seriesData || !seriesData.length) {
    seriesData = DEFAULT_SERIES_DATA_FN(1)
  }
  let series = seriesData.map((item, index) => {
    return {
      name: colorObj[index].name,
      data: item.data,
      type: 'line',
      smooth,
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
              color: colorObj[index].colorStops0
            },
            {
              offset: 1,
              color: colorObj[index].colorStops1
            }
          ],
          globalCoord: false
        }
      },
      itemStyle: {
        normal: {
          color: colorObj[index].color,
          borderWidth: 1,
          opacity: 0,
          lineStyle: {
            color: colorObj[index].color,
            width: 3
          }
        }
      }
    }
  })
  return {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    xAxis: {
      show: false,
      type: 'category',
      boundaryGap: false,
      data: xAxisData
    },
    // tooltip: {
    //   trigger: 'axis',
    //   textStyle: {
    //     align: 'left'
    //   },
    //   axisPointer: {
    //     lineStyle: {
    //       color: '#ccc',
    //       width: 0.5
    //     }
    //   },
    //   padding: 5
    // },
    yAxis: {
      minInterval: 1,
      type: 'value',
      show: false
    },
    series
  }
}
