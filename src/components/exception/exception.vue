<template>
  <article class="exception">
    <section class="e-content">
      <div :class="['err-img',imgStyle] "></div>
      <div class="err-msg">{{errMsg[errType][1]}}</div>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  const imgJson = {
    '404': ['pic-404', '网络异常，请刷新重试'],
    customer: ['pic-customer', '暂无客户'],
    delcard: ['pic-delcard', '名片被删除，请联系公司管理员'],
    disablecard: ['pic-disablecard', '名片被禁用，请联系公司管理员'],
    nodata: ['pic-empty_order', '暂无数据'],
    nogroup: ['pic-nogroup', '暂无分组'],
    noProduct: ['pic-nogroup', '开始创建你的第一个商品'],
    nonews: ['pic-nonews', '暂无消息'],
    noresult: ['pic-noresult', '找不到您所要的结果']
  }
  export default {
    props: {
      errType: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        errMsg: imgJson
      }
    },
    computed: {
      imgStyle() {
        return imgJson[this.errType][0]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .exception
    .e-content
      layout()
      align-items :center
      padding-top: 40px
      .err-img
        width: 100px
        height: 80px
        margin-bottom: 5px
        &.pic-nogroup
          icon-image("pic-nogroup")
        &.pic-404
          icon-image("pic-404")
        &.pic-customer
          icon-image("pic-customer")
        &.pic-delcard
          icon-image("pic-delcard")
        &.pic-disablecard
          icon-image("pic-disablecard")
        &.pic-nodata
          icon-image("pic-nodata")
        &.pic-nonews
          icon-image("pic-nonews")
        &.pic-noresult
          icon-image("pic-noresult")
        &.pic-empty_order
          icon-image("pic-empty_order")
      .err-msg
        margin-top :10px
        font-size: $font-size-12
        color: #CCCCCC
        font-family: $font-family-regular
</style>
