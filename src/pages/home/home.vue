<template>
  <div class="home" @touchmove.prevent>
    <h-header></h-header>
    <tab></tab>
    <footer v-if="$route.meta.defaultRouter" class="footer-default">
      <router-view style="z-index: 10"></router-view>
    </footer>
    <footer v-if="!$route.meta.defaultRouter">
      <base-router-view @refresh="refresh" style="z-index: 20"></base-router-view>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from './tab-boss/tab-boss'
  import {infoMethods} from '@state/helpers'
  import HHeader from './h-header/h-header'

  const PAGE_NAME = 'HOME'

  export default {
    name: PAGE_NAME,
    page: {
      title: '品牌管理',
      meta: [{name: 'description', content: 'description'}]
    },
    components: {
      Tab,
      HHeader,
    },
    data() {
      return {
      }
    },
    computed:{
    },
    watch: {
    },
    created() {
      this.updateMerchant('')
    },
    methods: {
      ...infoMethods,
      refresh() {
        this.updateMerchant('', false)
      },
      scroll(pos) {
        console.log(pos)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $tab-top = 42.13333333333333vw
  @import "~@design"
  .home
    height :100vh
    background hotpink
  .header
    background darkgray
  .footer-default
    fill-box(absolute)
    top: $tab-top
    bottom :0
</style>
