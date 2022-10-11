<template>
  <div class="pageSider">
    <div v-if="!$devTools.isNullorUndefined(title)" class="pageSider-header">
      <slot name="header">
        {{ title }}
      </slot>
    </div>

    <div class="pageSider-body">
      <slot></slot>
    </div>

    <div class="pageSider-footer">
      <slot name="footer">
        <el-link type="primary">查看更多 >></el-link>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.pageSider {
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 4px 20px;
  padding-bottom: 20px;
  background: white;

  &-header {
    font-size: 18px;
    font-weight: bold;
    color: #262626 100%;
    padding: 10px 0;
    border-bottom: 1px solid #d9d9d9;
  }

  &-body {
    padding: 10px 0;
  }

  &-footer {
    text-align: right;
  }
}
</style>
