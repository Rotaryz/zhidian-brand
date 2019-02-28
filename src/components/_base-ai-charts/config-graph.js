const hostUrl = `${window.location.protocol}//${window.location.host}/chart-icon`
const wx = {
  customer_id: 0,
  share_person_count: 99
}

// 定义抠图方法
function getImgData(imgSrc) {
  return new Promise((resolve) => {
    if (!imgSrc) {
      resolve('')
      return
    }
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    try {
      img.onload = function () {
        let radius = img.width / 2
        let diameter = 2 * radius
        canvas.width = diameter
        canvas.height = diameter
        ctx.clearRect(0, 0, diameter, diameter)
        ctx.save()
        ctx.beginPath()
        ctx.arc(radius, radius, radius, 0, 2 * Math.PI) // 画出圆
        ctx.clip() // 裁剪上面的圆形
        ctx.drawImage(img, 0, 0, diameter, diameter, 0, 0, diameter, diameter) // 在刚刚裁剪的园上画图
        ctx.restore() // 还原状态
        resolve(canvas.toDataURL('image/png', 1))
      }
    } catch (e) {
      resolve('')
    }
    img.src = imgSrc
  })
}

const toDataURL = url => fetch(url)
  .then(response => response.blob()).catch(e => console.error(e))
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (/image/.test(reader.result)) {
        resolve(reader.result)
      } else {
        resolve('')
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })).catch(e => console.error(e))

// 批量处理图片
function getImgArrayData(arr) {
  return Promise.all(arr.map(async (item, index, arr) => {
    let image = ''
    try {
      image = await toDataURL(item.image_url)
    } catch (e) {
      image = ''
    }
    // image = image.replace('text/html', 'image/jpeg')
    return getImgData(image)
  }))
}

export async function createUserTop6(data) {
  const arr = await getImgArrayData(data.elements)
  data.elements = data.elements.map((item, index) => {
    item.image_url = arr[index]
    return item
  })
  data.elements.unshift(wx)
  const jjj = {
    nodes: data.elements.map((item, index) => {
      return {
        name: item.customer_id + '',
        symbol: `image://${index === 0 ? hostUrl + '/pic-xcx@1x.png' : item.image_url || hostUrl + '/pic-default@1x.png'}`,
        symbolSize: index === 0 ? 40 : item.share_person_count > 1 ? 25 : 20,
        symbolKeepAspect: true,
        // fixed: index === 0,
        // fixed: true,
        // x: index === 0 ? '50%' : null,
        // y: index === 0 ? '50%' : null,
        itemStyle: {
          borderColor: '#8867F2',
          borderWidth: 4,
          shadowBlur: 1,
          shadowColor: '#8867F2',
          color: '#8867F2'
        },
        label: {
          show: false
        }
      }
    }),
    links: data.relation.map((item, index, arr) => {
      return {
        source: item.customer_id + '',
        target: item.from_customer_id + '',
        value: 10,
        lineStyle: {
          normal: {
            opacity: 1,
            color: '#8867F2',
            width: 2,
            curveness: 0.2
          }
        }
        // lineStyle: {
        //   normal: {
        //     color: 'red'
        //   }
        // }
      }
    })
  }
  const gap = 10
  return {
    // animation: false,
    // animationDurationUpdate: 500,
    // animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          // repulsion: Math.max(jjj.links.length * 9, jjj.nodes.length * 6, 6 * 12),
          repulsion: Math.max(jjj.links.length * gap, jjj.nodes.length * gap, gap * 50),
          // repulsion: 400,
          gravity: 0.4,
          edgeLength: [1, 10],
          layoutAnimation: false
        },
        data: jjj.nodes,
        links: jjj.links,
        focusNodeAdjacency: true,
        roam: false,
        label: {
          normal: {
            show: true
          }
        }
      }
    ]
  }
}

/* ------------------------------------------------------ */
const number2 = 48
const json = {
  nodes: new Array(number2).fill(1).map((item, index) => {
    return {
      name: `元素${index + 1}`,
      symbol: `image://${hostUrl}/${'pic-default@1x.png'}`,
      symbolSize: Math.random() * 2 >= 1 ? 30 : 20,
      symbolKeepAspect: true,
      itemStyle: {
        borderColor: '#8867F2',
        borderWidth: 1,
        shadowBlur: 1,
        shadowColor: '#8867F2'
      },
      label: {
        show: false
      }
      // category: index
    }
  }),
  categories: new Array(number2).fill(1).map((item, index) => {
    return {
      name: `元素${index + 1}`
    }
  }),
  links: new Array(number2 * 1).fill(1).map((item, index) => {
    // new Array(number2).fill(1).map((child, idx) => {
    //
    // })
    return {
      source: `元素${index % number2 + 1}`,
      target: `元素${~~(Math.random() * number2) + 1}`
      // lineStyle: {
      //   normal: {
      //     color: 'red'
      //   }
      // }
    }
  })
}

export function createUserTop6Detail() {
  return {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: Math.min(json.links.length, json.nodes.length, 30),
          // repulsion: 2000,
          gravity: 0.1,
          edgeLength: 30
        },
        // symbolSize: 30,
        data: json.nodes,
        links: json.links,
        categories: json.categories,
        focusNodeAdjacency: true,
        roam: true,
        label: {
          normal: {
            show: true
            // position: 'inside'

          }
        },
        lineStyle: {
          normal: {
            opacity: 1,
            color: '#8867F2',
            width: 2,
            curveness: 0.1
          }
        }
      }
    ]
  }
}
