<template>
  <div class="test-page">
    test-page
  </div>
</template>

<script type="text/ecmascript-6">
  const PAGE_NAME = 'TEST_PAGE'

  export default {
    name: PAGE_NAME,
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
    width: 100%
    height :200px
    background hotpink
</style>
