<template>
  <form class="shop-detail">
    <dl class="top">
      <dd class="t-item border-bottom-1px">
        <div class="left">品牌</div>
        <div class="right">{{merchantInfo.merchantName}}</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">类型</div>
        <div class="right">{{merchantInfo.merchantTypeName}}</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left">行业</div>
        <div class="right">{{merchantInfo.industryName}}</div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left"><span class="red-start">*</span>姓名</div>
        <label v-if="disable" class="right">
          <input v-model="name" class="input" type="text" placeholder="请输入名称" maxlength="20">
        </label>
        <div v-else class="right">
          <div class="input color-9b">{{name}}</div>
        </div>
      </dd>
      <dd class="t-item border-bottom-1px">
        <div class="left"><span class="red-start">*</span>手机号</div>
        <label v-if="disable" class="right">
          <input v-model="mobile" class="input" type="tel" placeholder="请输入手机号" maxlength="11">
        </label>
        <div v-else class="right">
          <div class="input color-9b">{{mobile}}</div>
        </div>
      </dd>
    </dl>
    <section v-if="disable" class="button-wrapper">
      <div class="btn" :class="{active: allowSubmit}" @click="submitHandle">保存</div>
    </section>
  </form>
</template>

<script type="text/ecmascript-6">
  import {infoComputed} from '@state/helpers'
  import {checkIsPhoneNumber} from '@utils/common'
  import API from '@api'
  const PAGE_NAME = 'SHOP_DETAIL'

  export default {
    name: PAGE_NAME,
    page() {
      return {
        title: this.pageTitle
      }
    },
    data() {
      return {
        name: '',
        mobile: '',
        storeId: 0,
        disable: true,
        pageTitle: '新建店铺'
      }
    },
    computed: {
      ...infoComputed,
      useReplace() {
        return this.$route.path === '/home/shop-detail'
      },
      nameReg() {
        return this.name.trim()
      },
      mobileReg() {
        return checkIsPhoneNumber(this.mobile)
      },
      allowSubmit() {
        return this.nameReg && this.mobileReg
      }
    },
    created() {
      this._initDetailInfo()
    },
    methods: {
      // 初始化数据
      _initDetailInfo() {
        Object.assign(this.$data, this.$route.query)
        if (this.$route.query.name) {
          this.pageTitle = '编辑店铺'
        }
      },
      // 提交
      submitHandle() {
        this.storeId ? this._editor() : this._create()
      },
      _create() {
        API.ShopManager.create(this.$data).then((res) => {
          this.$toast.show('新建成功')
          this._routerBack()
        })
      },
      _editor() {
        API.ShopManager.editor(this.$data).then((res) => {
          this.$toast.show('编辑成功')
          this._routerBack()
        })
      },
      // 路由回退
      _routerBack() {
        this.$emit('refresh')
        let url = `/home/shop-list`
        this.useReplace ? this.$router.replace(url) : this.$router.back()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .color-9b
    color: #9B9B9B !important

  .red-start
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: $color-main
    line-height: 2
    margin-right :1px

  input
    height :18px
    &::-webkit-input-placeholder
      color: #DAD9E2
    &::-ms-input-placeholder
      color: #DAD9E2
    &::-moz-placeholder
      color: #DAD9E2

  .shop-detail
    z-index: 50
    fill-box(fixed)
    background :$color-background
    .top
      position :relative
      background :#fff
      padding-left :15px
      .t-item
        layout(row,block,nowrap)
        padding-right :15px
        height :55px
        font-family: PingFangSC-Regular
        font-size: 14px
        line-height: 1
        &.header
          height :70px
        .left
          color: #777799
          layout(row,block,nowrap)
          justify-content :center
          align-items :center
        .right
          position :relative
          flex: 1
          height :100%
          layout(row,block,nowrap)
          justify-content :flex-end
          align-items :center
          color: #9B9B9B
          .input
            color: #363547
            height :18px
            outline :none
            text-align :right
    .button-wrapper
      margin :30px 15px
      .btn
        height :44px
        line-height :@height
        background: $color-main
        border-radius: 44px
        font-family: PingFangSC-Regular
        font-size: 16px
        color: #FFFFFF
        letter-spacing: 1px
        text-align: center
        opacity :0.5
        &.active
          opacity :1
</style>
