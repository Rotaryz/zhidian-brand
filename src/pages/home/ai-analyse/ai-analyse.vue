<template>
  <article class="ai-analyse">
    <div class="ai-analyse-box">
      <div v-for="(item,index) in dataArray" :key="index" class="user-card-box" @click="toCapacityModel(item)">
        <user-card :cardInfo="item" :idx="index" useType="ai"></user-card>
      </div>
      <div class="empty"></div>
    </div>
    <section v-if="isEmpty" class="exception-box">
      <exception errType="nodata"></exception>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  import UserCard from '@components/user-card/user-card'
  import API from '@api'
  import Exception from '@components/exception/exception'

  const LIMIT = 10
  const Analyse = API.Rank
  export default {
    name: 'AI',
    components: {
      UserCard,
      Exception
    },
    data() {
      return {
        dataArray: [],
        isEmpty: false,
        page: 1,
        limit: LIMIT,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        isAll: false
      }
    },
    computed: {
      pullUpLoadObj: function() {
        return this.pullUpLoad
          ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
          }
          : false
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          if (!this.pullUpLoad) return
          this.rebuildScroll()
        },
        deep: true
      }
    },
    created() {
      this._rqGetStaffSellList()
    },
    methods: {
      refresh() {
        this.resetReqParams()
        this._rqGetStaffSellList()
      },
      resetReqParams() {
        this.page = 1
        this.limit = LIMIT
        this.isAll = false
      },
      toCapacityModel(item) {
        const id = item.store_id
        const pageUrl = `/home/capacity-model`
        let url = `${pageUrl}?id=${id}&pageUrl=${pageUrl}`
        this.$storage.set('user', item)
        this.$router.push(url)
      },
      _rqGetStaffSellList() {
        const data = {page: 1, limit: LIMIT}
        Analyse.getStaffSellList(data).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            this.dataArray = res.data
            this.isEmpty = !this.dataArray.length
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      onPullingUp() {
        // 更新数据 todo
        if (this.isAll) return
        console.info('pulling up and load data')
        let page = ++this.page
        let limit = this.limit
        const data = {page, limit}
        Analyse.getStaffSellList(data, false).then((res) => {
          this.$loading.hide()
          if (res.error === this.$ERR_OK) {
            if (res.data && res.data.length) {
              let newArr = this.dataArray.concat(res.data)
              this.dataArray = newArr
            } else {
              this.isAll = true
            }
          } else {
            this.$toast.show(res.message)
          }
          this.$emit('loadEnd',this.dataArray)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $tab-top = (32 + 40)px
  @import "~@design"
  .empty
    height :0px

  .exception-box
    position :relative
    padding-top: (50)px

  .ai-analyse
    position: relative
    .ai-analyse-box
      background-color: #fff
    .user-card-box
      height: 75px
      padding-left: 15px
</style>
