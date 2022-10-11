<template>
  <commonRow height="96px" background="#fff" style="border-bottom: 1px solid #eee; z-index: 9999">
    <div class="middleNav">
      <div
        v-for="(item, index) in config"
        :key="index"
        class="middleNav-item"
        @click="handleClick(index)"
        :style="changeClickColor ? `${clickItem == index ? 'background:#fff;color: #086fe7;' : ''}` : ''"
      >
        <svg class="icon" aria-hidden="true" :style="changeClickColor ? (clickItem == index ? { color: '#086fe7' } : '') : ''">
          <use :xlink:href="`#${item.icon}`"></use>
        </svg>

        <div class="text">{{ item.title }}</div>
      </div>
    </div>
  </commonRow>
</template>

<script>
import commonRow from '@/components/commonRow'
import middleTitle from '@/components/middleTitle'
export default {
  components: { commonRow, middleTitle },
  props: {
    config: {
      type: Array,
      default: () => {
        return [
          {
            icon: '',
            title: '',
          },
        ]
      },
    },
    changeClickColor: {
      type: Boolean,
      default: () => {
        return true
      },
    },
  },
  data() {
    return {
      clickItem: 0,
    }
  },
  computed: {},
  mounted() {
    this.clickItem = 0
  },
  methods: {
    handleClick(index) {
      this.clickItem = index
      // console.log(index)
      this.$emit('activedIndex', index)
    },
  },
}
</script>
<style lang="less" scoped>
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.middleNav {
  display: flex;
  .icon {
    color: #fff;
    font-size: 26px;
    margin-right: 13px;
  }
  &-item {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    height: 96px;
    background: #086fe7;
    color: #fff;
    font-size: 16px;
    user-select: none;
    position: relative;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    &:hover {
      background: #fff;
      color: #086fe7;
      cursor: pointer;
      .icon {
        color: #086fe7;
      }
    }
    &::after {
      content: '';
      display: block;
      width: 1px;
      height: 30px;
      background-color: #fff;
      position: absolute;
      right: 0px;
    }
    &:last-child::after {
      content: '';
      display: block;
      width: 0;
      height: 0;
    }
  }
}
</style>
