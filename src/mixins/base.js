export default {
  beforeDestroy() {
    if (!this.$loading.isShow) return
    this.$loading.hide()
  }
}
