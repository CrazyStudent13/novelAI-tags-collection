<!--
 * @Author: 远川
 * @Date: 2022-02-21 11:17:41
 * @LastEditTime: 2022-03-03 10:19:59
 * @desc: 模板页的菜单
-->

<template>
  <div class="headerMenu">
    <el-menu
      class="unSelect"
      :default-active="activeIndex"
      mode="horizontal"
      :background-color="'rgba(255, 255, 255, 0)'"
      :text-color="'#666'"
      :active-text-color="'#0568E4'"
      size="mini"
      style="float: right; height: 50px"
    >
      <el-menu-item v-for="(item, index) in subMenuList" :index="item.label" :key="index" @click="handleSelect(item)">
        {{ item.label }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '首页',
      subMenuList: [
        { label: '首页', path: '/' },
        { label: '说明', path: '/about' },
        { label: '源码', url: 'https://github.com/CrazyStudent13/novelAI-tags-collection.git' },
      ],
    }
  },
  methods: {
    handleSelect(subMenu) {
      if (!this.$devTools.isNullorUndefined(subMenu.path)) {
        this.$router.push({
          path: subMenu.path,
        })
      } else {
        window.open(subMenu.url)
      }
    },
  },
  created() {
    this.handleSelect(this.subMenuList[0])
  },
}
</script>

<style lang="less" scoped>
.headerMenu {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: white;
}

.businessContact {
  background: linear-gradient(270deg, #fff2e1 0%, #f1d9b9 100%);
  border-radius: 16px;
  float: right;
  margin-top: 16px;
  margin-left: 10px;
  padding: 4px 12px;
  font-size: 14px;
  color: #814418;
  &:hover {
    cursor: pointer;
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
