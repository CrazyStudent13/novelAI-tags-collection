<template>
  <div class="painPoint">
    <div class="painPoint-title">{{ entity.title }}</div>
    <div class="painPoint-subTitle">{{ entity.subTitle }}</div>
    <div v-if="entity.iconInfo" class="painPoint-iconInfo">
      <div v-for="item in entity.iconInfo" :key="item" class="painPoint-iconInfo-item" :style="`width:${itemWidth1}`">
        <img class="painPoint-iconInfo-item-img" :src="item.imgUrl" alt="" />
        <div class="painPoint-iconInfo-item-text">{{ item.imgTitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    entity: {
      type: Object,
      default: () => {
        return {
          title: '',
          subTitle: '',
          iconInfo: [
            {
              imgUrl: '',
              imgTitle: '',
            },
          ],
        }
      },
    },

    itemWidth1: {
      type: String,
      default: () => {
        return ''
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
.painPoint {
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
  &-iconInfo {
    margin-top: 120px;
    display: flex;
    justify-content: space-between;
    &-item {
      display: flex;
      text-align: center;
      align-items: center;
      flex-direction: column;
      &-img {
        display: block;
        margin: 0 auto;
        margin-bottom: 28px;
      }
      &-text {
        font-size: 20px;
        font-weight: bold;
        color: #111;
        width: 140px;
        text-align: center;
      }
    }
  }
}
</style>
