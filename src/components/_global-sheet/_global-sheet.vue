<template>
  <transition name="fade">
    <article v-if="isShow" class="action-sheet" @click="hidden">
      <div class="mask"></div>
      <transition name="slide">
        <section v-if="isShow" class="sheet-box" @click.stop>
          <ul class="content-box">
            <template v-for="(item,index) in dataArray">
              <li v-if="dataArray && dataArray.length"
                  :key="index"
                  class="content-item"
                  @click="change(index)"
              >
                <div class="item-box">
                  <div class="left">{{item}}</div>
                  <div v-if="key === index" class="right"></div>
                </div>
              </li>
            </template>
          </ul>
          <div class="place-holder"></div>
          <div class="btn" @click="hidden">取消</div>
        </section>
      </transition>
    </article>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isShow: false,
        key: -1,
        dataArray: [],
        callback: null
      }
    },
    methods: {
      show(arr, key, callback) {
        this.dataArray = arr
        this.key = key
        this.isShow = true
        this.callback = callback
      },
      hidden() {
        this.isShow = false
      },
      change(index) {
        this.key = index
        this.isShow = false
        // this.$emit('change', this)
        typeof this.callback === 'function' && this.callback(this)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $color-white = #fff
  @import "~@design"

  .action-sheet
    fill-box(fixed)
    position :fixed !important
    height :100vh
    z-index: 200
    .mask
      fill-box(fixed)
      height :100%
      background-color: #20202E
      opacity: 0.8
    .sheet-box
      position: absolute
      bottom: 0
      left: 0
      right: 0
      background-color: $color-white
      layout()
      .content-box
        flex: 1
        .content-item
          height: 45px
          border-bottom: 0.5px solid $color-line
          &:last-child
            border: none
          .item-box
            height: 100%
            layout(row)
            align-items: center
            justify-content: space-between
            padding: 0 15px
            .left
              font-family: $font-family-medium
              font-size: $font-size-14
              color: #20202E
            .right
              width: 20px
              height: 20px
              border-radius: 50%
              icon-image('icon-selected')
      .place-holder
        height: 10px
        background-color: #F0F2F5
      .btn
        height: 45px
        line-height: 45px
        text-align: center
</style>
