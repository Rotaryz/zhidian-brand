let DEFAULT_SERIES_DATA_FN
DEFAULT_SERIES_DATA_FN = function (number) {
  return new Array(number).fill(1).map((item, index) => {
    return {
      value: ~~(Math.random() * 300),
      name: `项目${index + 1}`
    }
  })
}
const hostUrl = `${window.location.protocol}//${window.location.host}/chart-icon`
/**
 * 兴趣的商品占比
 * @param args
 * @returns {{color: *, legend: {padding: number[], borderRadius: number, data: *, bottom: number, itemHeight: number, itemWidth: number}, series: {data, center: string[], name: string, avoidLabelOverlap: boolean, label: {normal: {show: boolean, position: string}, emphasis: {show: boolean, textStyle: {fontSize: string, fontWeight: string}}}, labelLine: {normal: {show: boolean}}, type: string, radius: string[]}[], tooltip: {formatter: string, trigger: string}}}
 */
export function createShop(args = {}) {
  let {seriesData} = args
  if (!seriesData || !seriesData.length) {
    seriesData = DEFAULT_SERIES_DATA_FN(4)
  }
  const legendData = seriesData.map((item) => {
    return {
      name: item.name,
      icon: 'rect'
    }
  })
  const colorObj = [
    {
      color: '#58e276'
    },
    {
      color: '#bb86fc'
    },
    {
      color: '#7495ff'
    },
    {
      color: '#6dd2ff'
    }
  ]
  let colorArr = seriesData.map((item, index) => {
    return colorObj[index].color
  })
  return {
    legend: {
      itemWidth: 8,
      itemHeight: 8,
      borderRadius: 0,
      bottom: 12,
      itemGap: 25,
      padding: [0, 25, 0, 25],
      textStyle: {color: '#858585',
        fontSize: '12',
        fontFamily: 'PingFangSC-Regular'
      },
      data: legendData
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    color: colorArr,
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        data: seriesData,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'normal'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 3,
            borderColor: '#ffffff'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '15',
              fontWeight: 'normal'
            }
          }
        }
      }
    ]
  }
}

/**
 * 客户性别占比
 * @param args
 * @returns {{color: *, legend: {padding: number[], borderRadius: number, data: *, bottom: number, itemHeight: number, itemWidth: number}, series: {data, center: string[], name: string, avoidLabelOverlap: boolean, label: {normal: {show: boolean, position: string}, emphasis: {show: boolean, textStyle: {fontSize: string, fontWeight: string}}}, labelLine: {normal: {show: boolean}}, type: string, radius: string[]}[], tooltip: {formatter: string, trigger: string}}}
 */
export function createGender(args = {}) {
  let {seriesData} = args
  if (!seriesData || !seriesData.length) {
    // seriesData = DEFAULT_SERIES_DATA_FN(3)
    seriesData = [
      {name: '男', value: 100},
      {name: '女', value: 100},
      {name: '未知', value: 100}
    ]
  }
  const colorObj = [
    {
      color: '#7e9cfe',
      icon: 'icon-male@2x.png'
    },
    {
      color: '#aa8bf8',
      icon: 'icon-female@2x.png'
    },
    {
      color: '#59e576',
      icon: 'icon-nome@2x.png'
    }
  ]
  let colorArr = []
  let legendData = []
  seriesData.map((item, index) => {
    colorArr.push(colorObj[index].color)
    legendData.push({
      name: item.name,
      icon: `image://${hostUrl}/${colorObj[index].icon}`
    })
  })
  return {
    legend: {
      itemWidth: 15,
      itemHeight: 15,
      borderRadius: 0,
      orient: 'vertical',
      itemGap: 25,
      textStyle: {color: '#858585', fontSize: '12', fontFamily: 'PingFangSC-Regular'},
      x: '60%',
      y: '-5%',
      padding: [50, 25, 50, 50],
      data: legendData
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    color: colorArr,
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['42%', '80%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        data: seriesData,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'normal'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 3,
            borderColor: '#ffffff'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '15',
              fontWeight: 'normal'
            }
          }
        }
      }
    ]
  }
}

/**
 * 用户分组
 * @param args
 * @returns {{color: *, legend: {padding: number[], borderRadius: number, orient: string, data: *, itemHeight: number, x: string, itemWidth: number, y: string}, series: {data, center: string[], name: string, avoidLabelOverlap: boolean, label: {normal: {show: boolean, position: string}, emphasis: {show: boolean, textStyle: {fontSize: string, fontWeight: string}}}, labelLine: {normal: {show: boolean}}, type: string, radius: string[]}[], tooltip: {formatter: string, trigger: string}}}
 */
export function createUser(args = {}) {
  let {seriesData} = args
  if (!seriesData || !seriesData.length) {
    seriesData = DEFAULT_SERIES_DATA_FN(4)
  }
  const colorObj = [
    {
      color: '#59E576',
      icon: 'icon-qzkh@2x.png'
    },
    {
      color: '#6FD3FF',
      icon: 'icon-xkh@2x.png'
    },
    {
      color: '#7495FF',
      icon: 'icon-zlkh@2x.png'
    },
    {
      color: '#BC86FD',
      icon: 'icon-cskh@2x.png'
    }
  ]
  let colorArr = []
  let legendData = []
  seriesData.map((item, index) => {
    colorArr.push(colorObj[index].color)
    legendData.push({
      name: item.name,
      icon: `image://${hostUrl}/${colorObj[index].icon}`
    })
  })
  return {
    legend: {
      itemWidth: 14,
      itemHeight: 14,
      borderRadius: 0,
      itemGap: 20,
      textStyle: {color: '#858585', fontSize: '12', fontFamily: 'PingFangSC-Regular'},
      orient: 'vertical',
      x: '60%',
      y: '-10%',
      padding: [50, 25, 10, 50],
      data: legendData
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    color: colorArr,
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '80%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        data: seriesData,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'normal'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 3,
            borderColor: '#ffffff'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '15',
              fontWeight: 'normal'
            }
          }
        }
      }
    ]
  }
}
