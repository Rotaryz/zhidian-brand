<template>
  <div class="s-item" @click="chooseHandle">
    <div class="wrapper">
      <img class="logo" :src="itemInfo.logoUrl" alt="">
      <ul class="middle">
        <li class="m-top title">{{itemInfo.merchantName}}</li>
        <li class="m-bottom">
          <p>{{itemInfo.eName}}</p>
          <p>{{itemInfo.eMobile}}</p>
        </li>
      </ul>
      <router-link v-if="useType === 'invitation'" class="right" tag="section" to="invitation" append>
        <p>邀请开店</p>
        <base-right-arrow></base-right-arrow>
      </router-link>
      <section v-else-if="useType === 'check'" class="right">
        <div class="icon-wrapper">
          <div class="icon" :class="{active: isChecked}"></div>
        </div>
      </section>
      <section v-else></section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {DEFAULT_LOGO} from '@utils/constant'

  const COMPONENT_NAME = 'S_ITEM'

  export default {
    name: COMPONENT_NAME,
    props: {
      itemInfo: {
        type: Object,
        default: () => {}
      },
      useType: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        logoUrl: DEFAULT_LOGO,
        isChecked: false
      }
    },
    methods: {
      chooseHandle() {
        this.isChecked = !this.isChecked
        if (this.useType === 'invitation') {
          const name = this.itemInfo.eName
          const mobile = this.itemInfo.eMobile
          const storeId = this.itemInfo.storeId
          const url = `${this.$route.path}/shop-detail?name=${name}&mobile=${mobile}&storeId=${storeId}`
          this.$router.push(url)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .s-item
    height :0
    padding-top :23.18840579710145%
    background: #FFFFFF;
    box-shadow: 0 8px 20px 0 rgba(39,39,39,0.06);
    border-radius: 3px;
    position :relative
    .wrapper
      fill-box(absolute)
      padding :12.5px 10px
      layout(row,block,nowrap)
      .logo
        width :14.666666666666666vw
        height :@width
        border-radius :2px
      .middle
        flex: 1
        overflow :hidden
        padding :0 8px
        font-family: PingFangSC-Regular;
        line-height: 1.3
        font-size :3.2vw
        color: #9B9B9B;
        layout(column,block,nowrap)
        justify-content :space-around
        .m-top
          font-size: 3.733333333333334vw
          color: #27273E;
          no-wrap()
        .m-bottom
          & > p
            no-wrap()

      .right
        layout(row,block,nowrap)
        align-items :center
        height :100%
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9B9B9B;
        & > p
          margin-right :5px
        .icon-wrapper
          width :20px
          height :@width
          border-radius :100%
          border: 1px solid #9B9B9B;
          position :relative
          box-sizing :border-box
          .icon
            position :absolute
            left :-1px
            top:-1px
            z-index :2
            width :20px
            height :@width
            border-radius :100%
            transition :all 0.2s
            icon-image(icon-pitchup)
            opacity :0
            &.active
              opacity :1
</style>
