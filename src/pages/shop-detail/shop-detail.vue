<template>
  <div class="shop-detail">
    shop-detail
    123
  </div>
</template>

<script type="text/ecmascript-6">
  const PAGE_NAME = 'SHOP_DETAIL'

  export default {
    name: PAGE_NAME,
    data() {
      return {}
    }
  // beforeRouteLeave(to, from, next) {
  //   next({path: '/home/shop-list', replace: true})
  //   return next()
  // }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .shop-detail
    z-index :50px
    fill-box(fixed)
    background :#fff
</style>
