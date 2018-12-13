<template>
  <form class="shop-detail">
    <dl class="top">
      <dd class="t-item border-bottom-1px">
        <div class="left">品牌</div>
        <div class="right">品牌店</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">类型</div>
        <div class="right">品牌店</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">行业</div>
        <div class="right">品牌店</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">姓名</div>
        <label class="right">
          <input v-model="name" class="input" type="text" placeholder="请输入名称" maxlength="20">
        </label>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">手机号</div>
        <label class="right">
          <input v-model="mobile" class="input" type="tel" placeholder="请输入手机号" maxlength="11">
        </label>
      </dd>
    </dl>
    <section class="button-wrapper">
      <div class="btn">保存</div>
    </section>
  </form>
</template>

<script type="text/ecmascript-6">
  const PAGE_NAME = 'SHOP_DETAIL'

  export default {
    name: PAGE_NAME,
    data() {
      return {
        name: '',
        mobile: ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  input
    height :14px
    &::-webkit-input-placeholder
      color: #DAD9E2
    &::-ms-input-placeholder
      color: #DAD9E2
    &::-moz-placeholder
      color: #DAD9E2

  .shop-detail
    z-index :50px
    fill-box(fixed)
    background :$color-background
    .top
      position :relative
      background :#fff
      padding-left :15px
      .t-item
        layout(row,block,nowrap)
        padding-right :15px
        height :55px
        font-family: PingFangSC-Regular
        font-size: 14px
        line-height: 1
        &.header
          height :70px
        .left
          color: #777799
          layout()
          justify-content :center
        .right
          position :relative
          flex: 1
          height :100%
          layout(row,block,nowrap)
          justify-content :flex-end
          align-items :center
          color: #9B9B9B
          .input
            color: #363547
            height :14px
            line-height :1
            outline :none
            text-align :right
    .button-wrapper
      margin :30px 15px
      .btn
        height :44px
        line-height :@height
        background: $color-main
        border-radius: 44px
        font-family: PingFangSC-Regular
        font-size: 16px
        color: #FFFFFF
        letter-spacing: 1px
        text-align: center
</style>
