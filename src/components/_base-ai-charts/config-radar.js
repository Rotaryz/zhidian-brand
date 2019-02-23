// const itemNumber = 6
// /**
//  * 默认X轴的值=>xAxisData
//  * @type {string[]}
//  */
// const DEFAULT_X_DATA = new Array(itemNumber).fill(1).map((item, index) => {
//   return `城市${(index + 1)}`
// })
// /**
//  * 默认y轴的值=>seriesData
//  * @type {Array}
//  */
// let DEFAULT_SERIES_DATA = new Array(itemNumber).fill(1).map(() => {
//   return ~~(Math.random() * 1000) // todo
//   // return 0
// })
// let dataShadow = new Array(itemNumber).fill(1000)
// console.log(dataShadow)

export function createPower(args = {}) {
  let {xAxisData, seriesData} = args
  console.log(xAxisData, seriesData)
  // if (!xAxisData || !xAxisData.length) {
  //   xAxisData = DEFAULT_X_DATA
  // }
  // if (!seriesData || !seriesData.length) {
  //   seriesData = DEFAULT_SERIES_DATA
  // }
  return {
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      z: 2,
      zlevel: 100,
      style: {
        text: 98, // 后台数据-中间值
        x: 100,
        y: 100,
        textAlign: 'center',
        fill: '#202020',
        width: 30,
        height: 30,
        fontSize: 25
      }
    },
    radar: {
      radius: '66%',
      splitNumber: 4,
      splitArea: {
        areaStyle: {
          color: ['#eae3fb', '#eae3fb', '#f4f0fd', '#faf8fe'],
          shadowBlur: 0
        }
      },
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      indicator: [ // 后台数据 - 每个角最大值
        {name: '获客能力', max: 6500},
        {name: 'KOL分享力', max: 25000},
        {name: '业绩能力', max: 52000},
        {name: '订单能力', max: 38000},
        {name: '营销能力', max: 30000},
        {name: '推广能力', max: 16000}
      ]
    },
    series: [
      {
        type: 'radar',
        symbolKeepAspect: true,
        data: [
          {
            value: [4300, 20000, 5200, 30000, 25000, 16000], // 后台数据 - 每个角的当前值
            areaStyle: {
              color: '#baa4f0'
            },
            lineStyle: {
              opacity: 0
            },
            itemStyle: {
              opacity: 0
            }
          }
        ]
      }
    ]
  }
}
