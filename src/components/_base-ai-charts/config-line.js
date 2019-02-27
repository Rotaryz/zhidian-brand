import APP_CONFIG from '@utils/_app-config'
/**
 * 默认X轴的值=>xAxisData
 * @type {string[]}
 */
const DEFAULT_X_DATA = new Array(12).fill(1).map((item, index) => {
  return `10/${(index + 1) * 2}`
})
/**
 * 默认y轴的值=>seriesData
 * @type {Array}
 */
let DEFAULT_SERIES_DATA_FN
if (APP_CONFIG.env === 'production') {
  DEFAULT_SERIES_DATA_FN = (number) => {
    return new Array(number).fill({
      data: new Array(12).fill(0)
    })
  }
} else {
  // 默认y轴的值=>seriesData.item
  let DEFAULT_SERIES_DATA_ITEM = (itemNumber) => {
    return new Array(12).fill(1).map((item, index) => {
      return ~~(Math.random() * (itemNumber)) // todo
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

/**
 * 订单数和交易金额
 * @param args
 * @returns {{yAxis: Array, xAxis: {axisLabel: {color: string, fontSize: number, align: string}, data, offset: number, axisLine: {lineStyle: {color: string, width: number}, show: boolean}, splitLine: {lineStyle: {color: string, width: number}, show: boolean}, axisTick: {lineStyle: {color: string, width: number}, show: boolean}, type: string, boundaryGap: boolean}, legend: {padding: number[], borderRadius: number, data: {name: *, icon: string}[], bottom: number, itemHeight: number, show: boolean, itemWidth: number}, grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: Array, tooltip: {padding: number[], axisPointer: {lineStyle: {color: string, width: number}}, trigger: string, textStyle: {align: string}}}}
 */
export function createOrderAmount(args = {}) {
  let {xAxisData, seriesData} = args
  const smooth = 0.5
  const colorObj = [
    {
      name: '订单数',
      color: '#59DF78',
      colorStops0: 'rgba(89,223,120,0.55)',
      colorStops1: 'rgba(89,223,120,0.05)'
    },
    {
      name: '交易金额',
      color: '#7495FF',
      colorStops0: 'rgba(116,149,255,0.55)',
      colorStops1: 'rgba(116,149,255,0.05)'
    }
  ]
  const legendData = colorObj.map((item) => {
    return {
      name: item.name,
      icon: 'rect'
    }
  })
  if (!xAxisData || !xAxisData.length) {
    xAxisData = DEFAULT_X_DATA
  }
  if (!seriesData || !seriesData.length) {
    seriesData = DEFAULT_SERIES_DATA_FN(2, [100, 9999])
  }
  let series = []
  let yAxis = []
  seriesData.forEach((item, index) => {
    series.push({
      name: colorObj[index].name,
      data: item.data,
      type: 'line',
      smooth,
      symbol: 'circle',
      symbolSize: 3,
      showSymbol: false,
      yAxisIndex: index,
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
          borderColor: '#fff',
          opacity: 0.9,
          lineStyle: {
            color: colorObj[index].color,
            width: 2
          }
        }
      }
    })
    yAxis.push({
      minInterval: 1,
      type: 'value',
      name: '',
      splitLine: {
        show: true,
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
        color: '#666',
        show: true
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#c4c4c4',
          width: 0.5
        }
      }
    })
  })
  return {
    legend: {
      show: true,
      itemWidth: 8,
      itemHeight: 8,
      borderRadius: 0,
      bottom: 12,
      itemGap: 30,
      padding: [0, 25, 0, 25],
      data: legendData
    },
    grid: {
      top: '8.149779735682818%',
      left: '4.415954415954416%',
      right: '4%',
      bottom: '18.828193832599119%',
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
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: {
        align: 'left'
      },
      axisPointer: {
        lineStyle: {
          color: '#ccc',
          width: 0.5
        }
      },
      padding: 5
    },
    yAxis,
    series
  }
}
/**
 * 创建PNES
 * @param args
 * @returns {{yAxis: {axisLabel: {formatter: string, color: string}, minInterval: number, axisLine: {lineStyle: {color: string, width: number}, show: boolean}, splitLine: {lineStyle: {color: string, width: number, type: string}, show: boolean}, axisTick: {lineStyle: {color: string, width: number}, show: boolean}, type: string}, xAxis: {axisLabel: {color: string, fontSize: number, align: string}, data: *, offset: number, axisLine: {lineStyle: {color: string, width: number}, show: boolean}, splitLine: {lineStyle: {color: string, width: number}, show: boolean}, axisTick: {lineStyle: {color: string, width: number}, show: boolean}, type: string, boundaryGap: boolean}, legend: {padding: number[], borderRadius: number, data: {name: *, icon: string}[], bottom: number, itemHeight: number, show: boolean, itemWidth: number}, grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: *, tooltip: {padding: number[], axisPointer: {lineStyle: {color: string, width: number}}, trigger: string, textStyle: {align: string}}}}
 */
export function createPNES(args = {}) {
  let {xAxisData, seriesData} = args
  const smooth = 0.5
  const colorObj = [
    {
      name: '新增率',
      color: '#59DF78',
      colorStops0: 'rgba(89,223,120,0.55)',
      colorStops1: 'rgba(89,223,120,0.05)'
    },
    {
      name: '转化率',
      color: '#73D4FF',
      colorStops0: 'rgba(115,212,255,0.55)',
      colorStops1: 'rgba(115,212,255,0.05)'
    },
    {
      name: '流失率',
      color: '#7495FF',
      colorStops0: 'rgba(116,149,255,0.55)',
      colorStops1: 'rgba(116,149,255,0.05)'
    },
    {
      name: '唤醒率',
      color: '#BA86FC',
      colorStops0: 'rgba(186,134,252,0.55)',
      colorStops1: 'rgba(186,134,252,0.05)'
    }
  ]
  const legendData = colorObj.map((item) => {
    return {
      name: item.name,
      icon: 'rect'
    }
  })
  if (!xAxisData || !xAxisData.length) {
    xAxisData = DEFAULT_X_DATA
  }
  if (!seriesData || !seriesData.length) {
    seriesData = DEFAULT_SERIES_DATA_FN(4)
  }
  let series = seriesData.map((item, index) => {
    return {
      name: colorObj[index].name,
      data: item.data,
      type: 'line',
      smooth,
      symbol: 'circle',
      symbolSize: 3,
      showSymbol: false,
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
          borderColor: '#fff',
          opacity: 0.9,
          lineStyle: {
            color: colorObj[index].color,
            width: 2
          }
        }
      }
    }
  })
  return {
    legend: {
      show: true,
      itemWidth: 8,
      itemHeight: 8,
      borderRadius: 0,
      bottom: 12,
      padding: [0, 25, 0, 25],
      data: legendData
    },
    grid: {
      top: '8.149779735682818%',
      // top: '0',
      left: '4.415954415954416%',
      right: '20px',
      bottom: '18.828193832599119%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      offset: 4.5,
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
    tooltip: {
      trigger: 'axis',
      textStyle: {
        align: 'left'
      },
      axisPointer: {
        type: 'none',
        lineStyle: {
          color: '#ccc',
          width: 0.5
        }
      },
      padding: 5
    },
    yAxis: {
      minInterval: 1,
      type: 'value',
      splitLine: {
        show: true,
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
        lineStyle: {
          color: '#c4c4c4',
          width: 0.5
        }
      }
    },
    series
  }
}

/**
 * 创建最近7天活跃值/笔单价
 * @param args
 * @returns {{yAxis: {axisLabel: {formatter: string, color: string}, minInterval: number, axisLine: {lineStyle: {color: string, width: number}, show: boolean}, splitLine: {lineStyle: {color: string, width: number, type: string}, show: boolean}, axisTick: {lineStyle: {color: string, width: number}, show: boolean}, type: string}, xAxis: {axisLabel: {color: string, fontSize: number, align: string}, data, offset: number, axisLine: {lineStyle: {color: string, width: number}, show: boolean}, splitLine: {lineStyle: {color: string, width: number}, show: boolean}, axisTick: {lineStyle: {color: string, width: number}, show: boolean}, type: string, boundaryGap: boolean}, grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: *, tooltip: {padding: number[], axisPointer: {lineStyle: {color: string, width: number}}, trigger: string, textStyle: {align: string}}}}
 * @private
 */
export function createVitality(args = {}) {
  let {xAxisData, seriesData, name} = args
  const smooth = 0.5
  const colorObj = [
    {
      name: name || '活跃度',
      color: '#8867F2',
      colorStops0: 'rgba(136,103,242,0.55)',
      colorStops1: 'rgba(136,103,242,0.05)'
    }
  ]
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
      symbol: 'circle',
      symbolSize: 3,
      showSymbol: false,
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
          borderColor: '#fff',
          opacity: 0.9,
          lineStyle: {
            color: colorObj[index].color,
            width: 2
          }
        }
      }
    }
  })
  return {
    grid: {
      top: '8.149779735682818%',
      left: '4.415954415954416%',
      right: '20px',
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
    tooltip: {
      trigger: 'axis',
      textStyle: {
        align: 'left'
      },
      axisPointer: {
        type: 'none',
        lineStyle: {
          color: '#ccc',
          width: 0.5
        }
      },
      padding: 5
    },
    yAxis: {
      minInterval: 1,
      type: 'value',
      splitLine: {
        show: true,
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
        lineStyle: {
          color: '#c4c4c4',
          width: 0.5
        }
      }
    },
    series
  }
}
