<template>
  <div class="middleTitle">
    <div class="middleTitle-title">{{ middleTitle.title }}</div>
    <div class="middleTitle-subTitle">{{ middleTitle.subTitle }}</div>
  </div>
</template>

<script>
export default {
  props: {
    middleTitle: {
      type: Object,
      default: () => {
        return {
          title: '',
          subTitle: '',
        }
      },
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
.middleTitle {
  margin: 0 auto;
  &-title {
    text-align: center;
    margin-top: 78px;
    font-size: 28px;
    font-weight: bold;
  }
  &-subTitle {
    text-align: center;
    margin-top: 6px;
    color: #bbb;
  }
}
</style>
