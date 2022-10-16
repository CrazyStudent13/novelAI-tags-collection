<!--
 * @Author: 远川
 * @Date: 2022-02-21 11:17:41
 * @LastEditTime: 2022-02-21 14:45:31
 * @desc: 顶部模板页
-->

<template>
  <div class="navBar" :style="scroll != 0 ? 'background: rgba(255, 255, 255);' : ''">
    <div class="navBar-body">
      <el-row>
        <el-col :span="4">
          <div class="navBar-body-left">
            <slot name="nav-l"></slot>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="navBar-body-right">
            <slot name="nav-r"></slot>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navHeight: {
      type: [String, Number],
      default: () => {
        return '60px'
      },
    },
    navLeftSpan: {
      type: [String, Number],
      default: 4,
    },
    navRightSpan: {
      type: [String, Number],
      default: 20,
    },
  },

  data() {
    return {
      scroll: 0,
      tabList: [],
      activeIndex: '2',
    }
  },
  mounted() {
    window.addEventListener('scroll', this.getScrollOffset, true) // 监听（绑定）滚轮滚动事件
  },
  methods: {
    getScrollOffset() {
      if (window.pageXOffset) {
        this.scroll = window.pageYOffset
      } else {
        this.scroll = document.body.scrollTop + document.documentElement.scrollTop
      }
    },

    handelTabChange(index, i) {
      let path = ''
      this.active = i
      if (i == null) {
        path = this.tabList[index].path
      } else {
        path = this.tabList[index].childList[i].path
      }
      this.$router.push({
        path,
      })
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
  },
}
</script>

<style lang="less" scoped>
.navBar {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  z-index: 900;
  &::after {
    clear: both;
  }
  &-body {
    width: 1170px;
    margin: 0 auto;

    &-left {
      float: left;
    }

    &-right {
      float: right;
    }
  }
}
</style>
