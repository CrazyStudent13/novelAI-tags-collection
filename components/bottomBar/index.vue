<template>
  <div :style="{ position: fixed ? 'fixed' : '', bottom: '0', height }" class="bottomBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      default: () => {
        return ''
      },
    },
    height: {
      type: String,
      default: () => {
        return ' 64px'
      },
    },
    fixed: {
      type: Boolean,
      default: () => {
        return true
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.bottomBar {
  width: 100%;
  background: white;
  z-index: 999;
}
</style>
