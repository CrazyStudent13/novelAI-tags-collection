<template>
  <div class="commonContent" :style="`height:${height};background:${background}`" :class="extendClass">
    <div class="usefulRow" :style="`height:${height}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    extendClass: {
      type: Array,
      default: () => {
        return ['']
      },
    },
    height: {
      type: String,
      default: () => {
        return '624px'
      },
    },
    background: {
      type: String,
    },
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.commonContent {
  background: #fff;
  width: 100%;
  .usefulRow {
    width: 1170px;
    // height: 1744px;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>
