<template>
  <!-- eslint-disable -->
  <div class="scroll-movement">
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" @scroll="scroll"
            :listenScroll="listenScroll" :probeType="probeType" class="list" ref="list">
      <div style="background: yellow">
      </div>
      <!--<div v-show="!songs.length" class="loading-container">-->
        <!--<loading></loading>-->
      <!--</div>-->
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '@components/scroll/scroll'
  // import {prefixStyle} from '@utils/dom'
  const COMPONENT_NAME = 'SCROLL_MOVEMENT'
  const RESERVED_HEIGHT = 40
  // const transform = prefixStyle('transform')
  const transform = 'transform'
  export default {
    name: COMPONENT_NAME,
    components: {
      Scroll
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default() {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    watch: {
      scrollY(newVal) {
        let translateY = Math.max(this.minTransalteY, newVal)
        // let scale = 1
        // let zIndex = 0
        // let blur = 0
        // const percent = Math.abs(newVal / this.imageHeight)
        if (newVal > 0) {
        // scale = 1 + percent
        // zIndex = 10
        } else {
        // blur = Math.min(20, percent * 20)
        }
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        // this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if (newVal < this.minTransalteY) {
        // zIndex = 10
        // this.$refs.bgImage.style.paddingTop = 0
        // this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        // this.$refs.playBtn.style.display = 'none'
        } else {
        // this.$refs.bgImage.style.paddingTop = '70%'
        // this.$refs.bgImage.style.height = 0
        // this.$refs.playBtn.style.display = ''
        }
      // this.$refs.bgImage.style[transform] = `scale(${scale})`
      // this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .scroll-movement
    width: 100%
</style>
