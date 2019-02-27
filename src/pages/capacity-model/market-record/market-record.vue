<template>
  <div class="follow-box">
    <div v-for="(item, index) in flowList" :key="index" class="follow-list border-left-1px">
      <div class="time">{{item.created_at}}</div>
      <div class="text">{{item.content}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'market-msg',
    props: {
      flowList: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  div
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box
  .follow-box
    padding: 0 30px
    position: relative
    overflow: hidden
    font-family: $font-family-regular
    .follow-list
      padding-top: 24px
      border-left-1px(#e3eefc)
      padding-left: 15px
      &:after
        content: ''
        width: 4px
        height: 4px
        border: 1.5px solid #4B92F2
        border-radius: 50%
        position: absolute
        left: -3px
        top: 27px
        background: #FFF
      .time
        font-size: $font-size-12
        color: #949494
        padding-bottom: 10px
        font-family: $font-family-regular
        position: relative
      .text
        line-height: 18px
        color: #151515
        font-size: $font-size-14
        font-family: $font-family-medium
    .follow-list:last-child
      margin-bottom: 0

</style>
