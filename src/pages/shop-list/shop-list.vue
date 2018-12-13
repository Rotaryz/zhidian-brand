<template>
  <div class="shop-list">
    shop-list
    <router-link tag="h1" to="shop-detail" append>详情</router-link>
    <base-router-view></base-router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  const PAGE_NAME = 'SHOP_LIST'

  export default {
    name: PAGE_NAME,
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .shop-list
    z-index :20px
    fill-box(fixed)
    background :#fff
</style>
