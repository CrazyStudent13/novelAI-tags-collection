<template>
  <div class="pageList">
    <div class="pageList-header">
      <slot name="header"></slot>
    </div>

    <div class="pageList-subHeader">
      <slot name="subHeader"> </slot>
    </div>

    <div v-if="!$devTools.isNullorUndefined(list)" class="pageList-body">
      <slot name="cardList"> </slot>
    </div>

    <div v-else class="pageList-body"></div>

    <div v-if="!$devTools.isNullorUndefined(list)" class="pageList-footer" :style="{ textAlign: footerAlign }">
      <el-pagination background layout="prev, pager, next" :page-size.sync="pageSize" :total="total" @current-change="pageChange"> </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageList',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    footerAlign: {
      type: String,
      default: () => {
        return 'center'
      },
    },
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    pageChange(page) {
      this.$emit('pageChange', page)
    },
  },
}
</script>

<style lang="less" scoped>
.pageList {
  margin: 0 auto;
  padding: 20px 0;
  background: white;

  &-header {
  }

  &-body {
    justify-content: center;
    padding: 24px;
  }

  &-footer {
    margin: 20px;
  }
}
</style>
