<template>
  <div class="test-page">
    test-page
    <div class="scroll-container">
      <scroll>
        <div style="height: 1500px; background: rosybrown;display: flex; flex-direction: column-reverse">123</div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '@components/scroll/scroll'
  const PAGE_NAME = 'TEST_PAGE'

  export default {
    name: PAGE_NAME,
    components: {
      Scroll
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .test-page
    fill-box(absolute)
    top:50px
    background hotpink

  .scroll-container
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .scroll-wrapper
      padding :0 15px
      .scroll-item
        margin-bottom :15px
</style>
