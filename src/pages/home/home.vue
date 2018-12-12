<template>
  <div class="home" @touchmove.prevent>
    <scroll-movement v-if="false"></scroll-movement>
    <header class="header">
      <router-link tag="h1" to="/home/sample">h1</router-link>
      <router-link tag="h1" to="/home/user-info">账号信息</router-link>
      <router-link tag="h1" to="/home/shop-list">列表</router-link>
      <router-link tag="h1" to="/home/shop-detail">详情</router-link>
    </header>
    <tab></tab>
    <footer class="footer">
      <router-view v-if="$route.meta.defaultRouter"></router-view>
      <base-router-view v-else></base-router-view>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from './tab-boss/tab-boss'
  import ScrollMovement from '@components/scroll-movement/scroll-movement'
  import {infoMethods} from '@state/helpers'

  const PAGE_NAME = 'HOME'

  export default {
    name: PAGE_NAME,
    page: {
      title: 'Home',
      meta: [{name: 'description', content: 'description'}]
    },
    components: {
      ScrollMovement,
      Tab
    },
    created() {
      console.log(123)
      this.updateMerchant()
    },
    methods: {
      ...infoMethods
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .header
    height :200px
    background darkgray
  .footer
    position :relative
</style>
