<template>
  <article class="user-card">
    <!--ai分析 员工列表-->
    <div v-if="useType === 'ai'" class="card-box">
      <div v-if="idx===0" class="rank one"></div>
      <div v-else-if="idx===1" class="rank two"></div>
      <div v-else-if="idx===2" class="rank three"></div>
      <div v-else class="rank">{{idx+1}}</div>
      <div class="user-logo" :style="{'background-image': `url(${cardInfo.avatar? cardInfo.avatar : require('./pic-default_people@2x.png')})`}"></div>
      <!--<div class="user-logo" v-else :style="'background-image:url(pic-default_people)'"></div>-->
      <section class="user-info">
        <div class="info-box">
          <div class="name">{{cardInfo.name}}</div>
          <div class="sale-power">{{cardInfo.number}}</div>
        </div>
        <div class="info-box">
          <div class="number">{{cardInfo.position}}</div>
          <div class="number">销售力</div>
        </div>
      </section>
    </div>
    <!--overview总览 客户列表-->
    <div v-if="useType === 'overview'" class="card-box">
      <div class="user-logo" :style="{'background-image': `url(${cardInfo.avatar? cardInfo.avatar : require('./pic-default_people@2x.png')})`}"></div>
      <section class="user-info">
        <div class="info-box">
          <div class="name">{{cardInfo.name}}</div>
          <div class="number">AI预计成交率{{cardInfo.conversion_rate}}%</div>
        </div>
        <div class="info-box">
          <div class="green">{{cardInfo.name}}</div>
          <div class="number">跟进阶段{{96}}%</div>
        </div>
      </section>
    </div>
    <!--rank-list 排行客户工列表-->
    <div v-if="useType === 'rank-customer-list'" class="card-box">
      <div class="user-logo" :style="{'background-image': `url(${cardInfo.avatar? cardInfo.avatar : require('./pic-default_people@2x.png')})`}"></div>
      <section class="user-info">
        <div class="info-box">
          <div class="name">{{cardInfo.name}}</div>
          <div class="number">AI预计成交率{{cardInfo.conversion_rate}}%</div>
        </div>
        <div class="info-box">
          <div class="number">{{cardInfo.name}}</div>
          <div class="number"></div>
        </div>
      </section>
    </div>
    <!--ranking 排行榜员工列表-->
    <div v-if="useType === 'ranking'" class="card-box">
      <div v-if="idx===0" class="rank one"></div>
      <div v-else-if="idx===1" class="rank two"></div>
      <div v-else-if="idx===2" class="rank three"></div>
      <div v-else class="rank">{{idx+1}}</div>
      <div class="user-logo" :style="{'background-image': `url(${cardInfo.avatar? cardInfo.avatar : require('./pic-default_people@2x.png')})`}"></div>
      <section class="user-info-ranking">
        <div class="info-box-ranking">
          <div class="name">{{cardInfo.name}}</div>
          <div class="txt">{{cardInfo.position}}</div>
        </div>
        <div class="rank-number">{{cardInfo.number}}</div>
      </section>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      cardInfo: {
        type: Object,
        default: () => {}
      },
      useType: {
        type: String,
        default: ''
      },
      idx: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .user-card
    height: 100%
    .card-box
      height: 100%
      box-sizing: border-box
      padding: 15px 0
      border-bottom: 0.5px solid $color-line
      layout(row, block, nowrap)
      .rank
        background-size: 24px 24px
        background-position: center center
        background-repeat: no-repeat
        height: 100%
        width: 30px
        layout()
        justify-content: center
        align-items: center
        font-family: DINCondensed-Bold
        font-size: $font-size-20
        color: #CCCCCC
        &.one
          background-image: url("./icon-goldmedal@3x.png")
        &.two
          background-image: url("./icon-silvermedal@3x.png")
        &.three
          background-image: url("./icon-coppermedal@3x.png")
      .user-logo
        width: 45px
        height: 45px
        background-repeat: no-repeat
        background-position: center content
        background-size: cover
        margin-left: 3px
        margin-right: 15px
      .user-info
        layout()
        height: 100%
        justify-content: space-around
        padding-right: 15px
        flex: 1
        .info-box
          font-family: $font-family-regular
          font-size: $font-size-16
          color: #20202E
          layout(row, block, nowrap)
          justify-content: space-between
          .name
            font-size: $font-size-16
            color: #20202E
            font-family: $font-family-regular
          .sale-power
            font-size: $font-size-20
            font-family: $font-family-bold
          .number
            font-size: $font-size-12
            color: #888888
          .green
            font-size: $font-size-12
            color: #56BA15
      .user-info-ranking
        layout(row, block, nowrap)
        height: 100%
        justify-content: space-between
        padding-right: 15px
        flex: 1
        .info-box-ranking
          flex: 1
          height: 100%
          layout()
          justify-content: space-around
          font-family: $font-family-regular
          font-size: $font-size-16
          color: #20202E
          .name
            max-width: 175px
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
          .txt
            font-size: $font-size-12
            color: #888888

        .rank-number
          height: 100%
          layout()
          justify-content: center
          align-items: center
          font-family: DINCondensed-Bold
          font-size: 30px
          color: #20202E
          padding-top: 5px
</style>
