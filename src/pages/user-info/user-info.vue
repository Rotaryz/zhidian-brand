<template>
  <div class="user-info">
    user-info
    <label style="display: block">
      image input button
      <base-wx-input></base-wx-input>
    </label>
    <hr>
    <hr>
    <h1 @click="logout">推出登陆</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  const PAGE_NAME = 'USER_INFO'

  export default {
    name: PAGE_NAME,
    data() {
      return {

      }
    },
    methods: {
      logout() {
        this.$storage.remove('token')
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .user-info
    z-index :20px
    fill-box(fixed)
    background :#fff
</style>
