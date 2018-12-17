<template>
  <div class="page404">
    <div class="icon"></div>
    <div class="text">网络请求失败,请稍后重试</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const PAGE_NAME = 'PAGE_404'

  export default {
    name: PAGE_NAME,
    page: {
      title: '404',
      meta: [{name: 'description', content: '404'}]
    },
    props: {
      resource: {
        type: String,
        default: ''
      }
    },
    created() {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .page404
    layout()
    align-items :center
    margin-top :30%
    .icon
      width :197px
      height :143px
      icon-image(pic-404)
    .text
      font-family :$font-family-light
      margin-top :15px
      font-size :16px
      color:$color-text-assist
      text-align :center
</style>
