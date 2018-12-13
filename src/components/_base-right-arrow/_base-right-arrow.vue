<template>
  <div class="base-right-arrow" :class="iconStyle"></div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_RIGHT_ARROW'

  export default {
    name: COMPONENT_NAME,
    props: {
      iconStyle: {
        type: String,
        default: 'light'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .base-right-arrow
    width :7px
    height :12px
    &.light
      icon-image(icon-pressed)
    &.dark
      icon-image(icon-dpressed)

</style>
