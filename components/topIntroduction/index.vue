<template>
  <!-- 解决方案、落地案例、关于我们等头部介绍，只有标题和副标题 -->
  <commonRow :extend-class="extendClass">
    <div class="introduction">
      <div class="introduction-title">{{ content.title }}</div>
      <div class="introduction-subTitle">
        {{ content.subTitle }}
      </div>
    </div>
  </commonRow>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          title: '',
          subTitle: '',
        }
      },
    },
    extendClass: {
      type: Array,
      default: () => {
        return []
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
.introduction {
  margin-top: 220px;
  margin-left: 78px;
  &-title {
    font-size: 46px;
    color: #132b46;
    margin-top: 220px;
    margin-bottom: 24px;
    font-weight: bold;
  }
  &-subTitle {
    width: 406px;
    margin-bottom: 34px;
    line-height: 26px;
    font-size: 18px;
  }
}
</style>
